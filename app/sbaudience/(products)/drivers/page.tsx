import Link from "next/link";
import PageLoader from "@/components/pageLoader";
import { LazyImageClickable } from "@/components/lazyImageclickable";
import { LazyImageClickableSBAudience } from "../../components/lazyImageclickable";

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
    "url": `${baseUrl}/sbaudience/drivers/all`,
    "name": "SB Audience",
    "description": `All Drivers Provided by SB Audience`,
    "itemListElement": [{
      "@type": "ListItem",
      "position": 1,
      "item": {
        "@type": "Product",
        "url": `${baseUrl}/sbaudience/drivers/all`,
        "name": "All Drivers",
        "description": "Discover All Drivers by SB Audience",
        "image": `${baseUrl}/images/sbaudience/drivercover/compressioncover.webp`,
        "sku": "all-drivers",
        "brand": {
          "@type": "Brand",
          "name": "SB Audience"
        }
      }
    },
    {
      "@type": "ListItem",
      "position": 2,
      "item": {
        "@type": "Product",
        "url": `${baseUrl}/sbaudience/drivers/compression-drivers`,
        "name": "Compression Drivers",
        "description": "Discover All Compression Drivers by SB Audience",
        "image": `${baseUrl}/images/sbaudience/drivercover/compressioncover.webp`,
        "sku": "compression-drivers",
        "brand": {
          "@type": "Brand",
          "name": "SB Audience"
        }
      }
    },
    {
      "@type": "ListItem",
      "position": 3,
      "item": {
        "@type": "Product",
        "url": `${baseUrl}/sbaudience/drivers/woofers`,
        "name": "Woofers",
        "description": "Discover All Woofers by SB Audience",
        "image": `${baseUrl}/images/sbaudience/drivercover/woofercover.webp`,
        "sku": "woofers",
        "brand": {
          "@type": "Brand",
          "name": "SB Audience"
        }
      }
    },
    {
      "@type": "ListItem",
      "position": 4,
      "item": {
        "@type": "Product",
        "url": `${baseUrl}/sbaudience/drivers/subwoofers`,
        "name": "Subwoofers",
        "description": "Discover All Subwoofers by SB Audience",
        "image": `${baseUrl}/images/sbaudience/drivercover/subwoofercover.webp`,
        "sku": "subwoofers",
        "brand": {
          "@type": "Brand",
          "name": "SB Audience"
        }
      }
    },
    {
      "@type": "ListItem",
      "position": 5,
      "item": {
        "@type": "Product",
        "url": `${baseUrl}/sbaudience/drivers/open-baffle-drivers`,
        "name": "Open Baffle Drivers",
        "description": "Discover All Open Baffle Drivers by SB Audience",
        "image": `${baseUrl}/images/sbaudience/drivercover/openbafflecover.webp`,
        "sku": "open-baffle-drivers",
        "brand": {
          "@type": "Brand",
          "name": "SB Audience"
        }
      }
    },
    {
      "@type": "ListItem",
      "position": 6,
      "item": {
        "@type": "Product",
        "url": `${baseUrl}/sbaudience/drivers/coaxials`,
        "name": "Coaxials",
        "description": "Discover All Coaxials by SB Audience",
        "image": `${baseUrl}/images/sbaudience/drivercover/coaxialscover.webp`,
        "sku": "coaxials",
        "brand": {
          "@type": "Brand",
          "name": "SB Audience"
        }
      }
    },
    {
      "@type": "ListItem",
      "position": 7,
      "item": {
        "@type": "Product",
        "url": `${baseUrl}/sbaudience/drivers/horn`,
        "name": "Horn",
        "description": "Discover All Horns by SB Audience",
        "image": `${baseUrl}/images/sbaudience/drivercover/horncover.webp`,
        "sku": "horns",
        "brand": {
          "@type": "Brand",
          "name": "SB Audience"
        }
      }
    }]
  };

  const rows = [
    createData('All Drivers', "/images/sbaudience/drivercover/compressioncover.webp", '/sbaudience/drivers/all'),
    createData('Compression Drivers', "/images/sbaudience/drivercover/compressioncover.webp", '/sbaudience/drivers/compression-drivers'),
    createData('Woofers', "/images/sbaudience/drivercover/woofercover.webp", '/sbaudience/drivers/woofers'),
    createData('Subwoofers', "/images/sbaudience/drivercover/subwoofercover.webp", '/sbaudience/drivers/subwoofers'),
    createData('Open Baffle Drivers', "/images/sbaudience/drivercover/openbafflecover.webp", '/sbaudience/drivers/open-baffle-drivers'),
    createData('Coaxials', "/images/sbaudience/drivercover/coaxialscover.webp", '/sbaudience/drivers/coaxials'),
    createData('Horn', "/images/sbaudience/drivercover/horncover.webp", '/sbaudience/drivers/horn'),
  ];
  return(
      <div className="2xl:px-60 xl:px-40 xl:py-8 lg:py-6 lg:px-12 px-8 py-4"> 
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        /> 
        <PageLoader duration={500}/>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <h1 className="sr-only">All Drivers | SB Audience</h1>
          {rows.map((item, i) => (
            <div key={i}>
              <Link 
                href={`${item.link}`} 
                className=" group cursor-pointer space-y-4 block"
              >
                <div className="relative aspect-square">
                  <LazyImageClickableSBAudience
                    src={item.url.startsWith('/uploads/') ? `${process.env.NEXT_PUBLIC_ROOT_URL}${item.url}` : item.url} 
                    alt={`${item.value} by SB Audience`}
                    width={500}
                    height={500}
                    classname={'w-fit h-full object-contain'}
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
