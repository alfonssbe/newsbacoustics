import getSubCatNameBySlug from '@/app/actions/get-SubCat_Name';
import getAllProductsBySubCategoryJsonLd from '@/app/actions/jsonLd/get-all-products-by-sub-category-jsonld';
import KitsByCategoryPageClient from './pageClient';
import { allKitsCatForGenerateStaticParams } from '@/lib/navbar-content';

type Props = {
  params: Promise<{ kitsSubCategory?: string }>
}

export const revalidate = 86400

// export async function generateStaticParams(){
//   return allKitsCatForGenerateStaticParams.map((kitsSubCategory) => ({ kitsSubCategory }))
// }

export default async function KitsbySubCategoryJsonLd(props: Props) {
  const { kitsSubCategory = '' } = await props.params;
  const baseUrl = process.env.NEXT_PUBLIC_ROOT_URL ?? 'http://localhost:3000';
  const [subCatNameResult] = await Promise.allSettled([
    getSubCatNameBySlug("", kitsSubCategory),
  ]);

  const subCatName = subCatNameResult.status === 'fulfilled' ? subCatNameResult.value : { name: '' };
  const allprodserver = await getAllProductsBySubCategoryJsonLd("", kitsSubCategory); // SSR fetch

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "url": `${baseUrl}/kits/${kitsSubCategory}`, 
    "name": `${subCatName} | SB Acoustics`,
    "description": `Found out more about ${subCatName} from SB Acoustics!`,
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
      <KitsByCategoryPageClient params={props.params} />
    </>
  );
}

