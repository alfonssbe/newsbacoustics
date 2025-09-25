import Link from "next/link";
import PageLoader from "@/components/pageLoader";
import Image from "next/image";
import { LazyImage } from "@/components/lazyImage";

export default function Catalogues() {
  const baseUrl = process.env.NEXT_PUBLIC_ROOT_URL ?? 'http://localhost:3000';

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": `Catalogues | SB Acoustics`,
    "url": `${baseUrl}/catalogues`,
    "logo": `${baseUrl}/images/sbacoustics/logo_sbacoustics_white_clean.webp`,
  };
  return (
    <>
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
    <PageLoader duration={500}/>
      <div className="2xl:px-80 xl:px-60 lg:px-12 px-8 py-16">
        <h1 className="sr-only">Catalogues | SB Acoustics</h1>
        <div className='text-3xl font-bold mb-6 text-center'>
          Catalogues
        </div>
        <div className="md:grid md:grid-cols-2 block gap-4 pt-8">
          <div>
            <LazyImage
              src="/images/sbacoustics/kits_catalogue_cover.webp"
              alt="SB Acoustics Kits Catalogues"
              width={500}
              height={500}
            />
          </div>
          <div className="flex md:justify-start justify-center md:pl-20 pl-0">
            <Link href={'/images/sbacoustics/SB_Acoustics_Kits_Catalogue.pdf'} target="_blank" className={`font-bold flex items-center hover:text-primary`}>
              <div className="pr-2">
                <Image src={'/images/sbacoustics/PDF-download.webp'} alt="3D Files Download" className="max-h-8 w-fit" width={100} height={100}/>
                {/* <Download strokeWidth={3} size={15} className="text-white"/> */}
              </div>
              <h2 className="pl-2">
                Speaker Kits Catalogue PDF
              </h2>
            </Link>
          </div>
        </div>

        <div className="md:grid md:grid-cols-2 block gap-4 pt-14">
          <div>
            <LazyImage
              src="/images/sbacoustics/drivers_catalogue_cover.webp"
              alt="SB Acoustics Drivers Catalogues"
              width={500}
              height={500}
            />
          </div>
          <div className="flex md:justify-start justify-center md:pl-20 pl-0">
            <Link href={'/images/sbacoustics/SB_Acoustics_Drivers_Catalogue.pdf'} target="_blank" className={`font-bold flex items-center hover:text-primary`}>
              <div className="pr-2">
                <Image src={'/images/sbacoustics/PDF-download.webp'} alt="3D Files Download" className="max-h-8 w-fit" width={100} height={100}/>
                {/* <Download strokeWidth={3} size={15} className="text-white"/> */}
              </div>
              <h2 className="pl-2">
                Speaker Drivers Catalogue PDF
              </h2>
            </Link>
          </div>
        </div>
        
      </div>
    </>
  );
}
