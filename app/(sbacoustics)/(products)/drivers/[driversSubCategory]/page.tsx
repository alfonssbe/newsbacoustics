import getSubCatNameBySlug from "@/app/(sbacoustics)/actions/get-SubCat_Name";
import getAllProductsBySubCategoryJsonLd from "@/app/(sbacoustics)/actions/jsonLd/get-all-products-by-sub-category-jsonld";
import DriversBySubCategoryPageClient from "./pageClient";
import { allDriverCatForGenerateStaticParams } from "@/lib/navbar-content";

type Props = {
  params: Promise<{ driversSubCategory?: string }>
}

export const revalidate = 86400

// export async function generateStaticParams(){
//   return allDriverCatForGenerateStaticParams.map((driversSubCategory) => ({ driversSubCategory }))
// }

export default async function DriversbySubCategoryJsonLd(props: Props) {
  const { driversSubCategory = '' } = await props.params;
  const baseUrl = process.env.NEXT_PUBLIC_ROOT_URL ?? 'http://localhost:3000';
  const [subCatNameResult] = await Promise.allSettled([
    getSubCatNameBySlug(driversSubCategory),
  ]);

  const subCatName = subCatNameResult.status === 'fulfilled' ? subCatNameResult.value : { name: '' };
  const allprodserver = await getAllProductsBySubCategoryJsonLd(driversSubCategory); // SSR fetch

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "url": `${baseUrl}/drivers/${driversSubCategory}`, 
    "name": `${subCatName} | SB Acoustics`,
    "description": `Found out more about ${subCatName} Products from SB Acoustics!`,
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
      <h1 className='sr-only'>{subCatName.toString()} | SB Acoustics</h1>
      <DriversBySubCategoryPageClient params={props.params} />
    </>
  );
}
