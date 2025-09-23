import Link from "next/link";
import PageLoader from "@/components/pageLoader";
import { LazyImageClickable } from "@/components/lazyImageclickable";

function createData(
  value: string,
  url: string,
  link: string,
) {
  return { url, value, link };
}

export default function Kits () {
  const baseUrl = process.env.NEXT_PUBLIC_ROOT_URL ?? 'http://localhost:3000';

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "url": `${baseUrl}/kits`,
    "name": "SB Acoustics",
    "description": `All Kits Products Provided by SB Acoustics`,
    "itemListElement": [{
      "@type": "ListItem",
      "position": 1,
      "item": {
        "@type": "Product",
        "url": `${baseUrl}/kits/sb-acoustics-kits`,
        "name": "SB Acoustics Kits",
        "description": "Discover All SB Acoustics Kits by SB Acoustics",
        "image": `${baseUrl}/images/sbacoustics/kitscover/sbacousticskitscover.jpg`,
        "sku": "sb-acoustics-kits",
        "brand": {
          "@type": "Brand",
          "name": "SB Acoustics"
        }
      }
    },
    {
      "@type": "ListItem",
      "position": 2,
      "item": {
        "@type": "Product",
        "url": `${baseUrl}/kits/open-source-kits`,
        "name": "Open Source Kits",
        "description": "Discover Open Source Kits by SB Acoustics",
        "image": `${baseUrl}/images/sbacoustics/kitscover/opensourcekitscover.jpg`,
        "sku": "open-source-kits",
        "brand": {
          "@type": "Brand",
          "name": "SB Acoustics"
        }
      }
    },
    {
      "@type": "ListItem",
      "position": 3,
      "item": {
        "@type": "Product",
        "url": `${baseUrl}/kits/accessories`,
        "name": "Accessories",
        "description": "Discover Accessories by SB Acoustics",
        "image": `${baseUrl}/images/sbacoustics/kitscover/accessoriescover.jpg`,
        "sku": "accessories",
        "brand": {
          "@type": "Brand",
          "name": "SB Acoustics"
        }
      }
    }]
  };

  const rows = [
    createData('SB Acoustics Kits', "/images/sbacoustics/kitscover/sbacousticskitscover.jpg", '/kits/sb-acoustics-kits'),
    createData('Open Source Kits', "/images/sbacoustics/kitscover/opensourcekitscover.jpg", '/kits/open-source-kits'),
    createData('Accessories', "/images/sbacoustics/kitscover/accessoriescover.jpg", '/kits/accessories'),
    // createData('Discontinued', "/images/sbacoustics/kitscover/discontinuedcover.jpg", '/kits/discontinued'),
  ];
  return(
    <div className="2xl:px-60 xl:px-40 xl:py-8 lg:py-6 lg:px-12 px-8 py-4">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PageLoader duration={500}/>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
        <h1 className="sr-only">All Kits | SB Acoustics</h1>
        {rows.map((item, i) => (
          <div key={i}>
            <Link 
              href={`${item.link}`} 
              className="group cursor-pointer space-y-4 block"
            >
              <div className="relative aspect-square">
                <LazyImageClickable
                  src={item.url.startsWith('/uploads/') ? `${process.env.NEXT_PUBLIC_ROOT_URL}${item.url}` : item.url} 
                  alt={`${item.value} by SB Acoustics`}
                  width={1000}
                  height={1000}
                />
              </div>
              <h2 className="font-bold text-xl text-center">{item.value}</h2>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
