import getProduct from "@/app/(sbacoustics)/actions/get-one-product";
import SingleProductClient from "./pageClient";

type Props = {
  params: Promise<{ productSlug?: string }>
}

export const revalidate = 86400

// export async function generateStaticParams(){
//   const brandId = process.env.NEXT_PUBLIC_SB_ACOUSTICS_ID
//   const API = `${process.env.NEXT_PUBLIC_ROOT_URL}/${process.env.NEXT_PUBLIC_FETCH_ALL_PRODUCTS}`
//   const API_EDITED_BRANDID = API.replace('{brandId}', brandId ?? '680c5eee-7ed7-41bc-b14b-4185f8a1c379'); //SBAcoustics ID as default
//   const res = await fetch(API_EDITED_BRANDID,
//     { next: { revalidate: 86400 } } // ISR for individual product data
//   );
//   const products = await res.json();
//   return products.map((product: { slug: string }) => ({
//     productSlug: product.slug
//   }));
// }

export default async function SingleProductJsonLd(props: Props) {
    const { productSlug = '' } = await props.params;
    const baseUrl = process.env.NEXT_PUBLIC_ROOT_URL ?? 'http://localhost:3000';
    const data = await getProduct("", productSlug); // SSR fetch

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Product",
        "name": data?.name,
        "description": `Found out more about ${data?.name} from SB Acoustics!`,
        "image": data?.coverUrl ? `${baseUrl}${data.coverUrl}` : '',
        "sku": data?.slug || data?.id,
        "brand": {
          "@type": "Brand",
          "name": "SB Acoustics"
        },
        "url": data?.slug ? `${baseUrl}/products/${data.slug}` : `${baseUrl}`,
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": `${baseUrl}`
        }
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <SingleProductClient params={props.params}/>
        </>
    );
}