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

export default function Drivers () {
  const baseUrl = process.env.NEXT_PUBLIC_ROOT_URL ?? 'http://localhost:3000';

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "url": `${baseUrl}/drivers`,
    "name": "SB Acoustics",
    "description": `All Drivers Provided by SB Acoustics`,
    "itemListElement": [{
      "@type": "ListItem",
      "position": 1,
      "item": {
        "@type": "Product",
        "url": `${baseUrl}/drivers/all`,
        "name": "All Drivers",
        "description": "Discover All Drivers by SB Acoustics",
        "image": `${baseUrl}/images/sbacoustics/drivercover/tweeterscover.webp`,
        "sku": "all-drivers",
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
        "url": `${baseUrl}/drivers/tweeters`,
        "name": "Tweeters",
        "description": "Discover All Tweeters by SB Acoustics",
        "image": `${baseUrl}/images/sbacoustics/drivercover/tweeterscover.webp`,
        "sku": "tweeters",
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
        "url": `${baseUrl}/drivers/widebanders`,
        "name": "Widebanders",
        "description": "Discover All Widebanders by SB Acoustics",
        "image": `${baseUrl}/images/sbacoustics/drivercover/widebanderscover.webp`,
        "sku": "widebanders",
        "brand": {
          "@type": "Brand",
          "name": "SB Acoustics"
        }
      }
    },
    {
      "@type": "ListItem",
      "position": 4,
      "item": {
        "@type": "Product",
        "url": `${baseUrl}/drivers/midranges`,
        "name": "Midranges",
        "description": "Discover All Midranges by SB Acoustics",
        "image": `${baseUrl}/images/sbacoustics/drivercover/midrangescover.webp`,
        "sku": "midranges",
        "brand": {
          "@type": "Brand",
          "name": "SB Acoustics"
        }
      }
    },
    {
      "@type": "ListItem",
      "position": 5,
      "item": {
        "@type": "Product",
        "url": `${baseUrl}/drivers/midwoofers`,
        "name": "Midwoofers",
        "description": "Discover All Midwoofers by SB Acoustics",
        "image": `${baseUrl}/images/sbacoustics/drivercover/midwooferscover.webp`,
        "sku": "midwoofers",
        "brand": {
          "@type": "Brand",
          "name": "SB Acoustics"
        }
      }
    },
    {
      "@type": "ListItem",
      "position": 6,
      "item": {
        "@type": "Product",
        "url": `${baseUrl}/drivers/woofers`,
        "name": "Woofers",
        "description": "Discover All Woofers by SB Acoustics",
        "image": `${baseUrl}/images/sbacoustics/drivercover/wooferscover.webp`,
        "sku": "woofers",
        "brand": {
          "@type": "Brand",
          "name": "SB Acoustics"
        }
      }
    },
    {
      "@type": "ListItem",
      "position": 7,
      "item": {
        "@type": "Product",
        "url": `${baseUrl}/drivers/full-ranges`,
        "name": "Full Ranges",
        "description": "Discover All Full Ranges by SB Acoustics",
        "image": `${baseUrl}/images/sbacoustics/drivercover/fullrangecover.webp`,
        "sku": "full-ranges",
        "brand": {
          "@type": "Brand",
          "name": "SB Acoustics"
        }
      }
    },
    {
      "@type": "ListItem",
      "position": 8,
      "item": {
        "@type": "Product",
        "url": `${baseUrl}/drivers/subwoofers`,
        "name": "Subwoofers",
        "description": "Discover All Subwoofers by SB Acoustics",
        "image": `${baseUrl}/images/sbacoustics/drivercover/subwooferscover.webp`,
        "sku": "subwoofers",
        "brand": {
          "@type": "Brand",
          "name": "SB Acoustics"
        }
      }
    },
    {
      "@type": "ListItem",
      "position": 9,
      "item": {
        "@type": "Product",
        "url": `${baseUrl}/drivers/shallow-subwoofers`,
        "name": "Shallow Subwoofers",
        "description": "Discover All Shallow Subwoofers by SB Acoustics",
        "image": `${baseUrl}/images/sbacoustics/drivercover/shallowsubwooferscover.webp`,
        "sku": "shallow-subwoofers",
        "brand": {
          "@type": "Brand",
          "name": "SB Acoustics"
        }
      }
    },
    {
      "@type": "ListItem",
      "position": 10,
      "item": {
        "@type": "Product",
        "url": `${baseUrl}/drivers/passive-radiators`,
        "name": "Passive Radiators",
        "description": "Discover All Passive Radiators by SB Acoustics",
        "image": `${baseUrl}/images/sbacoustics/drivercover/passiveradiatorscover.webp`,
        "sku": "passive-radiators",
        "brand": {
          "@type": "Brand",
          "name": "SB Acoustics"
        }
      }
    },
    {
      "@type": "ListItem",
      "position": 11,
      "item": {
        "@type": "Product",
        "url": `${baseUrl}/drivers/coaxials`,
        "name": "Coaxial",
        "description": "Discover All Coaxials by SB Acoustics",
        "image": `${baseUrl}/images/sbacoustics/drivercover/coaxialscover.webp`,
        "sku": "coaxials",
        "brand": {
          "@type": "Brand",
          "name": "SB Acoustics"
        }
      }
    },
    {
      "@type": "ListItem",
      "position": 12,
      "item": {
        "@type": "Product",
        "url": `${baseUrl}/drivers/oem`,
        "name": "OEM",
        "description": "Discover All OEM by SB Acoustics",
        "image": `${baseUrl}/images/sbacoustics/drivercover/oemcover.webp`,
        "sku": "oem",
        "brand": {
          "@type": "Brand",
          "name": "SB Acoustics"
        }
      }
    }]
  };

  const rows = [
    createData('All Drivers', "/images/sbacoustics/drivercover/tweeterscover.webp", '/drivers/all'),
    createData('Tweeters', "/images/sbacoustics/drivercover/tweeterscover.webp", '/drivers/tweeters'),
    // createData('Filler Drivers', "/images/sbacoustics/drivercover/fillerdriverscover.webp", '/drivers/filler-drivers'),
    createData('Widebanders', "/images/sbacoustics/drivercover/widebanderscover.webp", '/drivers/widebanders'),
    createData('Midranges', "/images/sbacoustics/drivercover/midrangescover.webp", '/drivers/midranges'),
    createData('Midwoofers', "/images/sbacoustics/drivercover/midwooferscover.webp", '/drivers/midwoofers'),
    createData('Woofers', "/images/sbacoustics/drivercover/wooferscover.webp", '/drivers/woofers'),
    createData('Full Ranges', "/images/sbacoustics/drivercover/fullrangecover.webp", '/drivers/full-ranges'),
    createData('Subwoofers', "/images/sbacoustics/drivercover/subwooferscover.webp", '/drivers/subwoofers'),
    createData('Shallow Subwoofers', "/images/sbacoustics/drivercover/shallowsubwooferscover.webp", '/drivers/shallow-subwoofers'),
    createData('Passive Radiators', "/images/sbacoustics/drivercover/passiveradiatorscover.webp", '/drivers/passive-radiators'),
    createData('Coaxials', "/images/sbacoustics/drivercover/coaxialscover.webp", '/drivers/coaxials'),
    createData('OEM', "/images/sbacoustics/drivercover/oemcover.webp", '/drivers/oem'),
  ];
  return(
      <div className="2xl:px-60 xl:px-40 xl:py-8 lg:py-6 lg:px-12 px-8 py-4"> 
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        /> 
        <PageLoader duration={500}/>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <h1 className="sr-only">All Drivers | SB Acoustics</h1>
          {rows.map((item, i) => (
            <div key={i}>
              <Link 
                href={`${item.link}`} 
                className=" group cursor-pointer space-y-4 block"
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
