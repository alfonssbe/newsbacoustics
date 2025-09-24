import NewProductsPageClient from './pageClient';


export default async function ProductByCategoryPageJsonLd() {
  const baseUrl = process.env.NEXT_PUBLIC_ROOT_URL ?? 'http://localhost:3000';
  // const allprodserversplit = await getAllNewProducts(); // SSR fetc
  // const allprodserver = [...allprodserversplit[0], ...allprodserversplit[1]]; // all new products and kits
  // const jsonLd = {
  //   "@context": "https://schema.org",
  //   "@type": "ItemList",
  //   "url": `${baseUrl}/new-products`,
  //   "name": "SB Acoustics | New Products",
  //   "description": `All New Products by SB Acoustics`,
  //   "itemListElement": allprodserver?.map((driver: any, index: number) => ({
  //     "@type": "ListItem",
  //     "position": index + 1,
  //     "item": {
  //       "@type": "Product",
  //       "url": `${baseUrl}${driver.href}`,
  //       "name": driver.name,
  //       "description": driver.name,
  //       "image": `${baseUrl}${driver.coverUrl}`,
  //       "sku": driver.name,
  //       "brand": {
  //         "@type": "Brand",
  //         "name": "SB Acoustics",
  //       }
  //     }
  //   }))

  
  // };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": `New Products | SB Acoustics`,
    "url": `${baseUrl}/new-products`,
    "logo": `${baseUrl}/images/sbacoustics/logo_sbacoustics_white_clean.webp`,
  };

  return(
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <NewProductsPageClient />
    </>
  );
}
