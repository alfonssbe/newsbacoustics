import getSubCatNameBySlug from "@/app/actions/get-SubCat_Name";
import getAllProductsBySubSubCategoryJsonLd from "@/app/actions/jsonLd/get-all-products-by-sub-sub-category-jsonld";
import DriversBySubSubCategoryPageClient from "./pageClient";
import getSubSubCatNameBySlug from "@/app/actions/get-SubSubCat_Name";
import { allDriverSubCatForGenerateStaticParams } from "@/lib/navbar-content";

type Props = {
  params: Promise<{ driversSubCategory?: string , driversSubSubCategory?: string }>
}

export const revalidate = 86400

// export async function generateStaticParams() {
//   return allDriverSubCatForGenerateStaticParams.map(([driversSubCategory, driversSubSubCategory]) => ({
//     driversSubCategory,
//     driversSubSubCategory,
//   }))
// }

export default async function DriversbySubSubCategoryJsonLd(props: Props) {
  const { driversSubCategory = '', driversSubSubCategory = '' } = await props.params;
  const baseUrl = process.env.NEXT_PUBLIC_ROOT_URL ?? 'http://localhost:3000';
  const [subCatNameResult, subsubCatNameResult] = await Promise.allSettled([
    getSubCatNameBySlug("", driversSubCategory),
    getSubSubCatNameBySlug("", driversSubSubCategory),
  ]);

  const subCatName = subCatNameResult.status === 'fulfilled' ? subCatNameResult.value : { name: '' };
  const subSubCatName = subsubCatNameResult.status === 'fulfilled' ? subsubCatNameResult.value : { name: '' };
  const allprodserver = await getAllProductsBySubSubCategoryJsonLd("", driversSubCategory, driversSubSubCategory); // SSR fetch 

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "url": `${baseUrl}/drivers/${driversSubCategory}/${driversSubSubCategory}`, 
    "name": `${subSubCatName} | SB Acoustics`,
    "description": `Found out more about ${subSubCatName} Drivers from SB Acoustics!`,
    "itemListElement": allprodserver?.map((driver: any, index: number) => ({
     "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "Product",
        "url": `${baseUrl}/products/${driver.slug}`,
        "name": driver.name,
        "description": driver.name,
        "image": `${baseUrl}${driver.coverUrl}`,
        "sku": driver.slug || driver.id,
        "brand": {
          "@type": "Brand",
          "name": "SB Acoustics"
        }
      }
    }))
  };

  return(
    <>
      <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <h1 className='sr-only'>{subSubCatName.toString()} | SB Acoustics</h1>
      <DriversBySubSubCategoryPageClient params={props.params} />
    </>
  );
}
