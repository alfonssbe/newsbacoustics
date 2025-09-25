import Link from 'next/link';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordiontechnicals';
import PageLoader from '@/components/pageLoader';
import Image from 'next/image';

const all_desc_style = "text-left xl:text-base sm:text-sm text-xs text-black p-0 py-1"

const Technical = () => {  
  const baseUrl = process.env.NEXT_PUBLIC_ROOT_URL ?? 'http://localhost:3000';

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": `Technical | SB Acoustics`,
    "url": `${baseUrl}/technical`,
    "logo": `${baseUrl}/images/sbacoustics/logo_sbacoustics_white_clean.webp`,
  };
  return (
    <>
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
    <PageLoader/>
    <div className='md:grid md:grid-cols-3 md:px-0 md:py-0 px-8 py-4 '>
      <h1 className='sr-only'>Technical | SB Acoustics</h1>
    <div></div>
    <div className='py-16'>
      <h2 className='sr-only'>All SB Acoustics Technicals</h2>
         <div className="justify-center flex text-3xl font-bold">
            Technical
        </div>
        <div className='py-10'>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem className='pb-5' value="item-1">
            <AccordionTrigger className='bg-zinc-700 px-10 text-white text-left'>Capacitor Tuning</AccordionTrigger>
            <AccordionContent className='bg-zinc-100 text-black px-10 py-6'>
              Use this well known series capacitor trick to obtain nice flat frequency response from very small sealed box enclosures.
              <div className="flex justify-start pt-6">
                <Link href={'/images/sbacoustics/technical_pdf/Capacitor-Tuning.pdf'} target="_blank" className={`${all_desc_style} font-bold flex items-center hover:text-primary`}>
                <div className="pr-2">
                        <Image src={'/images/sbacoustics/PDF-download.webp'} alt="3D Files Download" className="max-h-8 w-fit" width={100} height={100}/>
                        {/* <Download strokeWidth={3} size={15} className="text-white"/> */}
                    </div>
                    <div className="pl-2">
                      Capacitor Tuning PDF
                    </div>
                </Link>
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem className='pb-5' value="item-2">
            <AccordionTrigger className='bg-zinc-700 px-10 text-white text-left'>Measuring Thiele/Small Parameters</AccordionTrigger>
            <AccordionContent className='bg-zinc-100 text-black px-10 py-6'>
              This technical note describes how to obtain Thiele/Small parameters and also contains advice on driver break in.
              <div className="flex justify-start pt-6">
                <Link href={'/images/sbacoustics/technical_pdf/Measuring-Thiele-Small-parameters.pdf'} target="_blank" className={`${all_desc_style} font-bold flex items-center hover:text-primary`}>
                <div className="pr-2">
                    <Image src={'/images/sbacoustics/PDF-download.webp'} alt="3D Files Download" className="max-h-8 w-fit" width={100} height={100}/>
                    {/* <Download strokeWidth={3} size={15} className="text-white"/> */}
                    </div>
                    <div className="pl-2">
                      Measuring Thiele/Small parameters PDF
                    </div>
                </Link>
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem className='pb-5' value="item-3">
            <AccordionTrigger className='bg-zinc-700 px-10 text-white text-left'>Adding Mass to a Passive Radiator</AccordionTrigger>
            <AccordionContent className='bg-zinc-100 text-black px-10 py-6'>
              Passive radiator tuning calculations using added mass.
              <div className="flex justify-start pt-6">
                <Link href={'/images/sbacoustics/technical_pdf/Adding-mass-to-passive-radiator.pdf'} target="_blank" className={`${all_desc_style} font-bold flex items-center hover:text-primary`}>
                <div className="pr-2">
                    <Image src={'/images/sbacoustics/PDF-download.webp'} alt="3D Files Download" className="max-h-8 w-fit" width={100} height={100}/>
                    {/* <Download strokeWidth={3} size={15} className="text-white"/> */}
                    </div>
                    <div className="pl-2">
                      Adding Mass to a Passive Radiator PDF
                    </div>
                </Link>
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem className='pb-5' value="item-4">
            <AccordionTrigger className='bg-zinc-700 px-10 text-white text-left'>Time Alignment</AccordionTrigger>
            <AccordionContent className='bg-zinc-100 text-black px-10 py-6'>
              Tech note on physical offset of transducers for time alignment and some table values for some popular combinations of SB Acoustics drivers.
              <div className="flex justify-start pt-6">
                <Link href={'/images/sbacoustics/technical_pdf/Time-Alignment.pdf'} target="_blank" className={`${all_desc_style} font-bold flex items-center hover:text-primary`}>
                <div className="pr-2">
                    <Image src={'/images/sbacoustics/PDF-download.webp'} alt="3D Files Download" className="max-h-8 w-fit" width={100} height={100}/>
                    {/* <Download strokeWidth={3} size={15} className="text-white"/> */}
                    </div>
                    <div className="pl-2">
                      Time Alignment PDF
                    </div>
                </Link>
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem className='pb-5' value="item-5">
            <AccordionTrigger className='bg-zinc-700 px-10 text-white text-left'>Crossover for SATORI MT19CP-8</AccordionTrigger>
            <AccordionContent className='bg-zinc-100 text-black px-10 py-6'>
              Examples of crossover designs to pair with our SATORI MT19CP-8 coaxial drivers.
              <div className="flex justify-start pt-6">
                <Link href={'/images/sbacoustics/technical_pdf/Satori-Coax-Crossover.pdf'} target="_blank" className={`${all_desc_style} font-bold flex items-center hover:text-primary`}>
                <div className="pr-2">
                    <Image src={'/images/sbacoustics/PDF-download.webp'} alt="3D Files Download" className="max-h-8 w-fit" width={100} height={100}/>
                    {/* <Download strokeWidth={3} size={15} className="text-white"/> */}
                    </div>
                    <div className="pl-2">
                      Crossovers for SATORI MT19CP-8 PDF
                    </div>
                </Link>
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem className='pb-5' value="item-6">
            <AccordionTrigger className='bg-zinc-700 px-10 text-white text-left'>Crossovers for PFC/PAC Coaxial Drivers</AccordionTrigger>
            <AccordionContent className='bg-zinc-100 text-black px-10 py-6'>
              Examples of crossover designs to pair with our SB Acoustics PFC/PAC coaxial drivers.
              <div className="flex justify-start pt-6">
                <Link href={'/images/sbacoustics/technical_pdf/Crossover-for-PFC-or-PAC-Coaxial-Drivers.pdf'} target="_blank" className={`${all_desc_style} font-bold flex items-center hover:text-primary`}>
                <div className="pr-2">
                    <Image src={'/images/sbacoustics/PDF-download.webp'} alt="3D Files Download" className="max-h-8 w-fit" width={100} height={100}/>
                    {/* <Download strokeWidth={3} size={15} className="text-white"/> */}
                    </div>
                    <div className="pl-2">
                      Crossovers for PFC/PAC Coaxial Drivers PDF
                    </div>
                </Link>
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem className='pb-5' value="item-7">
            <AccordionTrigger className='bg-zinc-700 px-10 text-white text-left'>Beryllium Important Information</AccordionTrigger>
            <AccordionContent className='bg-zinc-100 text-black px-10 py-6'>
              This information outlines precautions necessary when handling beryllium.
              <div className="flex justify-start pt-6">
                <Link href={'/images/sbacoustics/technical_pdf/BERYLLIUM-IMPORTANT-INFORMATION2.pdf'} target="_blank" className={`${all_desc_style} font-bold flex items-center hover:text-primary`}>
                <div className="pr-2">
                    <Image src={'/images/sbacoustics/PDF-download.webp'} alt="3D Files Download" className="max-h-8 w-fit" width={100} height={100}/>
                    {/* <Download strokeWidth={3} size={15} className="text-white"/> */}
                    </div>
                    <div className="pl-2">
                      Beryllium Important Information PDF
                    </div>
                </Link>
              </div>
            </AccordionContent>
          </AccordionItem>
          {/* <AccordionItem className='pb-5' value="item-7">
            <AccordionTrigger className='bg-zinc-700 px-10 text-white text-left'>Online Box Calculator</AccordionTrigger>
            <AccordionContent className='bg-zinc-100 text-primary px-10 py-6'>
              SpeakerBuilder Pro (Online Box Calculator)
            </AccordionContent>
          </AccordionItem> */}
        </Accordion>
        </div>
        <h2 className='text-base'>For referencing, replicating, or copying any information in the technical notes, please use the <Link href={'/contact'} className='text-primary hover:cursor-pointer hover:underline'>contact form</Link> to ask the permission of SB Acoustics</h2>
    </div>
    <div></div>
    </div>
    </>
  );
};

export default Technical;