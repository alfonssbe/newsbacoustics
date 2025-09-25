"use client"

import Image from "next/image";
import React, { useEffect, useState, use } from "react";
import SingleProductTable from "@/components/single-product-page/single-product-table";
import Link from "next/link";
import SwiperCarouselOneProduct from "@/components/single-product-page/swipercarouseloneproduct";
import { Custom_Specifications, Kits_Finishing, SimilarProdTypes, SingleProducts } from "@/app/types";
import CustomProductTable from "@/components/single-product-page/custom-product-table";
import SwiperCarouselCoverandCatalogues from "@/components/single-product-page/swipercarouselcoverandcatalogues";
import getSimilar from "@/app/actions/get-similar-products";
import { redirect, usePathname } from "next/navigation";
import DrawingSection from "@/components/single-product-page/drawingSection";
import FrequencyResponseSection from "@/components/single-product-page/freqResSection";
import getProduct from "@/app/actions/get-one-product";
import getMultipleDatasheetProduct from "@/app/actions/get-one-multiple-datasheet";
import getCustomProduct from "@/app/actions/get-one-custom-props";
import getKitsFinishingProduct from "@/app/actions/get-one-kits-finishing-props";
import { Loader } from "@/components/ui/loader";
import "./styles.scss";
import DOMPurify from 'dompurify'; 
 

import Lightbox from 'yet-another-react-lightbox'
import Zoom from 'yet-another-react-lightbox/plugins/zoom'
import Captions from "yet-another-react-lightbox/plugins/captions";
import 'yet-another-react-lightbox/styles.css'
import 'yet-another-react-lightbox/plugins/thumbnails.css'
import "yet-another-react-lightbox/plugins/captions.css";
import SwiperCarouselSimilarProduct from "@/components/single-product-page/swipercarouselsimilarproduct";
import getMultiplemodels3DProduct from "@/app/actions/get-one-multiple-3d-models";
import getMultipleFRDZMA from "@/app/actions/get-one-multiple-frd-zma-files";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const all_desc_style = "text-left xl:text-base sm:text-sm text-xs text-black p-0 py-1"
const all_sub_title_style = "text-left font-bold xl:text-2xl lg:text-xl md:text-lg sm:text-md text-black"

type Props = {
  params: Promise<{ productSlug?: string }>
}

export default function SingleProductClient(props: Props) { 
    const [data, setData] = useState<SingleProducts>();
    const [desc, setDesc] = useState<string[]>([]);
    const [datasheetCatalogues, setdatasheetCatalogues] = useState<Kits_Finishing[]>([]); // same properties as datasheet
    const [models3D, setmodels3D] = useState<Kits_Finishing[]>([]);
    const [frdZmaFiles, setfrdZmaFiles] = useState<Kits_Finishing[]>([]);
    const [similarprod, setsimilarprod] = useState<SimilarProdTypes[]>([]);
    const [customProps, setcustomProps] = useState<Custom_Specifications | null>(null);
    const [kitsFinishing, setkitsFinishing] = useState<Kits_Finishing[] | null>(null);

    const [loading, setLoading] = useState<boolean>(true);
    const [slideUp, setSlideUp] = useState(false);    // Track slide-up state
    const pathname = usePathname();
    useEffect(() => {
    
        const fetchData = async () => {
            try {
                const { productSlug = '' } = await props.params;
                document.body.style.overflow = 'hidden';
                let tempdata = await getProduct("", productSlug)
                if(tempdata.id === '' && tempdata.slug === ''){
                    redirect('/notfound')
                }
                const tempdesc: string[] = tempdata.desc.split('\n');
                let tempdatasheetCatalogues = await getMultipleDatasheetProduct(pathname, productSlug) ?? []
                let temp3dmodels = await getMultiplemodels3DProduct(pathname, productSlug) ?? []
                let tempfrdzmafiles = await getMultipleFRDZMA(pathname, productSlug) ?? []
                let tempsimilarprod = await getSimilar(pathname, productSlug)
                let tempcustomProps: Custom_Specifications | null = null;
                let tempkitsFinishing: Kits_Finishing[] | null = null;
                // let datasheetCatalogues: Kits_Finishing[] | null = null;
                if (tempdata.isCustom) {
                    tempcustomProps = await getCustomProduct(pathname, productSlug);
                    const tempValue = process.env.NEXT_PUBLIC_ROOT_URL || '';
                    tempcustomProps!.customDesc = tempcustomProps!.customDesc.replace(/{temp}/g, `${tempValue}/`);
                    if(tempdata.isKits){
                        tempkitsFinishing = await getKitsFinishingProduct(pathname, productSlug)
                    }
                    // datasheetCatalogues = await getMultipleDatasheet(params.productSlug)
                }
                setData(tempdata)
                setDesc(tempdesc)
                setdatasheetCatalogues(tempdatasheetCatalogues)
                setmodels3D(temp3dmodels)
                setfrdZmaFiles(tempfrdzmafiles)
                setsimilarprod(tempsimilarprod)
                setcustomProps(tempcustomProps)
                setkitsFinishing(tempkitsFinishing)

                setTimeout(() => {
                    requestAnimationFrame(() => {
                      setSlideUp(true);
                      document.body.style.overflow = '';
                      setTimeout(() => {
                        setLoading(false); // Hide loading after slide-up completes
                      }, 700); // Matches CSS transition duration
                    });
                  }, 1000); // Small delay to allow initial DOM painting

            } catch (error) {
                console.error('Error fetching data:', error);
                document.body.style.overflow = '';
            }
      };
  
      setLoading(true)
      setSlideUp(false)
      fetchData();
    }, [props.params]);


    const [lightboxOpenDrawing, setLightboxOpenDrawing] = useState(false)
    const [lightboxIndexDrawing, setLightboxIndexDrawing] = useState(0)

    const [lightboxOpenFrequencyResponse, setLightboxOpenFrequencyResponse] = useState(false)
    const [lightboxIndexFrequencyResponse, setLightboxIndexFrequencyResponse] = useState(0)


    const openLightboxDrawing = (index: number) => {
      setLightboxIndexDrawing(index)
      setLightboxOpenDrawing(true)
    }

    const openLightboxFrequencyResponse = (index: number) => {
      setLightboxIndexFrequencyResponse(index)
      setLightboxOpenFrequencyResponse(true)
    }
    return (
        (<div className="2xl:px-60 xl:px-40 xl:py-8 lg:py-6 lg:px-12 px-8 py-4">
            {loading && (
                <div
                    className={`fixed top-0 left-0 w-full h-full z-[1000] flex items-center justify-center bg-black transition-transform duration-700 ${
                    slideUp ? '-translate-y-full' : 'translate-y-0'
                    }`}
                >
                    <Loader />
                </div>
            )}
            {/* <div className="hidden md:flex"> */}
            {data && <div className="block md:flex">
                {/* Left Column for Images */}
                <div className="md:flex md:w-1/2 justify-center md:h-1/2 block w-full h-full">
                    <div className="flex-col w-full md:flex hidden pr-10">
                        <div className="w-full h-full pb-4">
                            <SwiperCarouselCoverandCatalogues cover={data.coverUrl} alt={data.name} catalogues={data.images_Catalogues_Url} catalogues_alt={data.images_Catalogues_Alt}/>
                        </div>
                          {data.drawing_Url.length!=0?data.drawing_Url.map((item, index) => (
                            <div key={data.name.concat(" - Drawing - ", index.toString())} className="justify-center pt-8" onClick={() => openLightboxDrawing(index)}>
                                    <div className="justify-center cursor-zoom-in p-0">
                                        <DrawingSection cover={item} alt={data.name} />
                                    </div>
                                    <Lightbox
                                        open={lightboxOpenDrawing}
                                        close={() => setLightboxOpenDrawing(false)}
                                        index={lightboxIndexDrawing}
                                        slides={data.drawing_Url.map((item) => ({src: item.startsWith('/uploads/') ? `${process.env.NEXT_PUBLIC_ROOT_URL}${item}` : item, title: data.name.concat(" - Drawing")}))}
                                        plugins={[Zoom, Captions]}
                                    />
                            </div>
                        )):<></>}
                        {data.graph_Url.length!=0?data.graph_Url.map((item, index) => (
                            <div key={data.name.concat(" - Frequency Response")} className="justify-center pt-8" onClick={() => openLightboxFrequencyResponse(index)}>
                                    <div className="justify-center cursor-zoom-in">
                                        <FrequencyResponseSection cover={item} alt={data.name}/>
                                    </div>
                                    <Lightbox
                                        open={lightboxOpenFrequencyResponse}
                                        close={() => setLightboxOpenFrequencyResponse(false)}
                                        index={lightboxIndexFrequencyResponse}
                                        slides={data.graph_Url.map((item) => ({src: item.startsWith('/uploads/') ? `${process.env.NEXT_PUBLIC_ROOT_URL}${item}` : item, title: data.name.concat(" - Frequency Response")}))}
                                        plugins={[Zoom, Captions]}
                                    />
                            </div>
                        )):<></>}                       
                    </div>
                    <div className="w-full h-full md:hidden pb-4">
                        <SwiperCarouselOneProduct cover={data.coverUrl} alt={data.name} catalogues={data.images_Catalogues_Url} drawing={data.drawing_Url} graph={data.graph_Url}/>
                    </div>
                </div>

                {/* Right Column for Typography */}
                <div className="md:flex md:w-1/2 justify-center md:h-1/2 block w-full h-full">
                    <div className="flex flex-col w-full">
                        <h1 className={all_sub_title_style}>
                            {(
                                data.categories.some((c) => c.name.toLowerCase().includes("satori")) ||
                                data.sub_categories.some((s) => s.name.toLowerCase().includes("satori")) ||
                                data.sub_sub_categories.some((ss) => ss.name.toLowerCase().includes("satori"))
                            ) && "SATORI "}
                            {data.name}
                        </h1>
                        <div className={all_desc_style}>
                            {/* <div className={`${data.categories.length!=0 ? '' : 'hidden'}`}>Categories: 
                                {data.categories.map((category, index) => (
                                    <React.Fragment key={index}>
                                        <Link href={`/${category.name.toLowerCase().replace(/\s+/g, '-')}`} className="hover:text-primary"> <u>{category.name}</u></Link>
                                        {index !== data.categories.length - 1 && ','}
                                    </React.Fragment>
                                ))}
                            </div> */}
                            {(data.sub_categories.length !== 0 || data.sub_sub_categories.length !== 0) &&
                                <div className="flex flex-wrap gap-2">
                                    <h2>Categories:</h2> 
                                    {data.sub_categories.length !== 0 &&
                                        data.sub_categories.map((subcategory, index) => (
                                        <React.Fragment key={index}>
                                            <Link
                                            href={`/${data.categories[0].name.toLowerCase().replace(/\s+/g, '-')}/${subcategory.name.toLowerCase().replace(/\s+/g, '-')}`}
                                            className="hover:text-primary"
                                            >
                                            <u>{subcategory.name}</u>
                                            </Link>
                                        </React.Fragment>
                                        ))
                                    }
                                    {data.sub_sub_categories.length !== 0 &&
                                        data.sub_sub_categories.map((subsubcategory, index) => (
                                        <React.Fragment key={index}>
                                            <Link
                                            href={`/${data.categories[0].name.toLowerCase().replace(/\s+/g, '-')}/${data.sub_categories[0].name.toLowerCase().replace(/\s+/g, '-')}/${subsubcategory.name.toLowerCase().replace(/\s+/g, '-')}`}
                                            className="hover:text-primary"
                                            >
                                            <u><h3>{subsubcategory.name}</h3></u>
                                            </Link>
                                        </React.Fragment>
                                        ))
                                    }
                                </div>
                            }
                        </div>


                        {/* OEM QUANTITY */}
                        {data.oemQuantity!='' && 
                        <div className={`${all_desc_style} font-bold flex items-center text-primary pt-8`}>
                            To be discontinued from standard product range, available to OEM minimum order quantity {data.oemQuantity} pcs.    
                        </div>}

                        {data.isCustom?
                            data.isKits? 
                            <>           
                                {customProps && customProps.customDesc!='' &&       
                                <>              
                                    <div className={`${all_sub_title_style} pt-8`}>
                                        <h2>Descriptions:</h2>
                                    </div>
                                    <h3 className={`${all_desc_style} desc-content`} dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(customProps.customDesc, {
                                        ALLOWED_TAGS: [
                                            'a', 'b', 'i', 'u', 'em', 'strong', 'p', 'div', 'span', 'ul', 'ol', 'li', 'br'
                                        ],
                                        ALLOWED_ATTR: [
                                            'href', 'target', 'rel', 'class', 'id', 'style'
                                        ],
                                    }) }}>
                                    </h3>
                                </>
                                }


                                <h2 className="sr-only">Datasheet:</h2>
                                {datasheetCatalogues && datasheetCatalogues.length===1 && datasheetCatalogues[0].url!=''?
                                    <div className="flex justify-start pt-8">
                                        <Link href={datasheetCatalogues[0].url} target="_blank" className={`${all_desc_style} font-bold flex items-center hover:text-primary`}>
                                        <div className="pr-2">
                                            {/* <Download strokeWidth={3} size={15} className="text-white"/> */}
                                            <Image src={'/images/sbacoustics/PDF-download.webp'} alt="PDF Download" className="max-h-8 w-fit" width={100} height={100}/>
                                            </div>
                                            <h3 className="pl-2">
                                                {datasheetCatalogues[0].name}
                                            </h3>
                                        </Link>
                                    </div>
                                :
                                datasheetCatalogues[0].url!='' &&
                                <div className="justify-start pt-8">
                                        {datasheetCatalogues && datasheetCatalogues.map((value, index) => (
                                            value.url!='' &&
                                                <div key={index}  className={`${index !== 0 && 'pt-4'}`}>
                                                    <Link href={value.url} target="_blank" className={`${all_desc_style} font-bold flex items-center hover:text-primary`}> 
                                                            <div className="pr-2">
                                                            {/* <Download strokeWidth={3} size={15} className="text-white"/> */}
                                                            <Image src={'/images/sbacoustics/PDF-download.webp'} alt="PDF Download" className="max-h-8 w-fit" width={100} height={100}/>
                                                        </div>
                                                        <h3 className="pl-2">
                                                            {datasheetCatalogues[index].name}
                                                        </h3>
                                                    </Link>
                                                </div>
                                        ))}
                                </div>                
                                }


                                <h2 className="sr-only">FRD & ZMA Files:</h2>
                                {frdZmaFiles && frdZmaFiles.length===1 && frdZmaFiles[0].url!=''?
                                    <div className="flex justify-start pt-4">
                                        <Link href={frdZmaFiles[0].url} target="_blank" className={`${all_desc_style} font-bold flex items-center hover:text-primary`}>
                                        <div className="pr-2">
                                            {/* <Download strokeWidth={3} size={15} className="text-white"/> */}
                                            <Image src={'/images/sbacoustics/FRD-ZMA-download.webp'} alt="FRD ZMA Files Download" className="max-h-8 w-fit" width={100} height={100}/>
                                            </div>
                                            <h3 className="pl-2">
                                                {frdZmaFiles[0].name}
                                            </h3>
                                        </Link>
                                    </div>
                                :
                                frdZmaFiles[0].url!='' &&
                                <div className="justify-start pt-4">
                                        {frdZmaFiles && frdZmaFiles.map((value, index) => (
                                            value.url!='' &&
                                                <div key={index}  className={`${index !== 0 && 'pt-4'}`}>
                                                    <Link href={value.url} target="_blank" className={`${all_desc_style} font-bold flex items-center hover:text-primary`}> 
                                                            <div className="pr-2">
                                                            {/* <Download strokeWidth={3} size={15} className="text-white"/> */}
                                                            <Image src={'/images/sbacoustics/FRD-ZMA-download.webp'} alt="FRD ZMA Files Download" className="max-h-8 w-fit" width={100} height={100}/>
                                                        </div>
                                                        <h3 className="pl-2">
                                                            {frdZmaFiles[index].name}
                                                        </h3>
                                                    </Link>
                                                </div>
                                        ))}
                                </div>                
                                }


                                <h2 className="sr-only">3D Models Files:</h2>
                                {models3D && models3D.length===1 && models3D[0].url!=''?
                                    <div className="flex justify-start pt-4">
                                        <Link href={models3D[0].url} target="_blank" className={`${all_desc_style} font-bold flex items-center hover:text-primary`}>
                                        <div className="pr-2">
                                            {/* <Download strokeWidth={3} size={15} className="text-white"/> */}
                                            <Image src={'/images/sbacoustics/3D-download.webp'} alt="3D Models Download" className="max-h-8 w-fit" width={100} height={100}/>
                                            </div>
                                            <h3 className="pl-2">
                                                {models3D[0].name}
                                            </h3>
                                        </Link>
                                    </div>
                                :
                                models3D[0].url!='' &&
                                <div className="justify-start pt-4">
                                        {models3D && models3D.map((value, index) => (
                                            value.url!='' &&
                                                <div key={index}  className={`${index !== 0 && 'pt-4'}`}>
                                                    <Link href={value.url} target="_blank" className={`${all_desc_style} font-bold flex items-center hover:text-primary`}> 
                                                            <div className="pr-2">
                                                            {/* <Download strokeWidth={3} size={15} className="text-white"/> */}
                                                            <Image src={'/images/sbacoustics/3D-download.webp'} alt="3D Models Download" className="max-h-8 w-fit" width={100} height={100}/>
                                                        </div>
                                                        <h3 className="pl-2">
                                                            {models3D[index].name}
                                                        </h3>
                                                    </Link>
                                                </div>
                                        ))}
                                </div>                
                                }





                                {/* <div className="flex justify-start pt-4">
                                    <Link href={datasheetCatalogues[0].url} target="_blank" className={`${all_desc_style} font-bold flex items-center hover:text-primary`}>
                                        <div className="pr-2">
                                            <Image src={'/images/sbacoustics/FRD-ZMA-download.webp'} alt="FRD ZMA Download" className="max-h-8 w-fit" width={100} height={100}/>
                                        </div>
                                        <h3 className="pl-2">
                                            FRD & ZMA Files
                                        </h3>
                                    </Link>
                                </div>
                               <div className="flex justify-start pt-4">
                                    <Link href={datasheetCatalogues[0].url} target="_blank" className={`${all_desc_style} font-bold flex items-center hover:text-primary`}>
                                        <div className="pr-2">
                                            <Image src={'/images/sbacoustics/3D-download.webp'} alt="3D Download" className="max-h-8 w-fit" width={100} height={100}/>
                                        </div>
                                        <h3 className="pl-2">
                                            3D Files
                                        </h3>
                                    </Link>
                                </div> */}


                                
                                
                                {!data.isAccessories && customProps && 
                                    (customProps.air_gap_height != '' ||
                                    customProps.cabinet_material != '' ||
                                    customProps.crossover_frequency != '' ||
                                    customProps.customDesc != '' ||
                                    customProps.custom_note_for_spec != '' ||
                                    customProps.dc_resistance_re != '' ||
                                    customProps.dome_material != '' ||
                                    customProps.driver_units != '' ||
                                    customProps.enclosure_type != '' ||
                                    customProps.free_air_resonance_fs != '' ||
                                    customProps.frequency_range != '' ||
                                    customProps.magnet_weight != '' ||
                                    customProps.magnetic_flux_density != '' ||
                                    customProps.max_spl != '' ||
                                    customProps.net_weight != '' ||
                                    customProps.nominal_impedance != '' ||
                                    customProps.port_tuning_frequency != '' ||
                                    customProps.rated_power_handling != '' ||
                                    customProps.recommended_amplifier != '' ||
                                    customProps.sensitivity != '' ||
                                    customProps.speaker_dimension != '' ||
                                    customProps.voice_coil_diameter != '' ||
                                    customProps.voice_coil_height != '') &&
                                        <>
                                            <h2 className={`${all_sub_title_style} pt-8`}>
                                                Specs:
                                            </h2>
                                            <div className="md:w-3/4 w-full">
                                                {CustomProductTable(customProps!, all_desc_style)}
                                            </div>
                                        </>
                                }

                                {kitsFinishing?
                                    kitsFinishing[0].name!=""?
                                    <div className="flex justify-center pt-8">
                                    <Accordion type="single" collapsible className="w-full">
                                        <AccordionItem value="item-1">
                                            <AccordionTrigger className="w-full">
                                                <h2 className={all_sub_title_style}>
                                                    Finishing
                                                </h2>
                                            </AccordionTrigger>
                                            <div className="grid grid-cols-3">
                                            {kitsFinishing!.map((value, index) => (
                                                <AccordionContent key={index} className={`pr-4`}>
                                                    <Image src={value.url.startsWith('/uploads/') ? `${process.env.NEXT_PUBLIC_ROOT_URL}${value.url}` : value.url} alt={value.name} width={250} height={250}/>
                                                    <h3 className={`${all_desc_style} text-center font-bold`}>
                                                        {value.name}
                                                    </h3>
                                                </AccordionContent>
                                            ))}
                                            </div>
                                        </AccordionItem>
                                    </Accordion>
                                </div>
                                : 
                                <></>                                
                                : 
                                <></>
                                }
                                
                            </>
                            :
                            <>
                                {desc[0] !== '-' &&
                                    <>
                                        <h2 className={`${all_sub_title_style} pt-8`}>
                                            Features:
                                        </h2>
                                        <div className={all_desc_style.concat(" pl-4")}>
                                            <ul style={{ listStyleType: 'disc' }}>
                                                {desc.map((value) => (
                                                    <li key={value}><h3>{value}</h3></li>
                                                ))}
                                            </ul>
                                        </div>
                                    </>
                                }
                                    
                                <h2 className="sr-only">Datasheet:</h2>
                                {datasheetCatalogues && datasheetCatalogues[0].url!=''?
                                    <div className="flex justify-start pt-8">
                                        <Link key={data.id} href={datasheetCatalogues[0].url} target="_blank" className={`${all_desc_style} font-bold flex items-center hover:text-primary`}>
                                        <div className="pr-2">
                                                {/* <Download strokeWidth={3} size={15} className="text-white"/> */}
                                                <Image src={'/images/sbacoustics/PDF-download.webp'} alt="PDF Download" className="max-h-8 w-fit" width={100} height={100}/>
                                            </div>
                                            <h3 className="pl-2">
                                                {datasheetCatalogues[0].name}
                                            </h3>
                                        </Link>
                                    </div>
                                :<></>}


                                <h2 className="sr-only">FRD & ZMA Files:</h2>
                                {frdZmaFiles && frdZmaFiles[0].url!=''?
                                    <div className="flex justify-start pt-4">
                                        <Link key={data.id} href={frdZmaFiles[0].url} target="_blank" className={`${all_desc_style} font-bold flex items-center hover:text-primary`}>
                                        <div className="pr-2">
                                                {/* <Download strokeWidth={3} size={15} className="text-white"/> */}
                                                <Image src={'/images/sbacoustics/FRD-ZMA-download.webp'} alt="FRD ZMA Files Download" className="max-h-8 w-fit" width={100} height={100}/>
                                            </div>
                                            <h3 className="pl-2">
                                                {frdZmaFiles[0].name}
                                            </h3>
                                        </Link>
                                    </div>
                                :<></>}


                                <h2 className="sr-only">3D Models Files:</h2>
                                {models3D && models3D[0].url!=''?
                                    <div className="flex justify-start pt-4">
                                        <Link key={data.id} href={models3D[0].url} target="_blank" className={`${all_desc_style} font-bold flex items-center hover:text-primary`}>
                                        <div className="pr-2">
                                                {/* <Download strokeWidth={3} size={15} className="text-white"/> */}
                                                <Image src={'/images/sbacoustics/3D-download.webp'} alt="3D Files Download" className="max-h-8 w-fit" width={100} height={100}/>
                                            </div>
                                            <h3 className="pl-2">
                                                {models3D[0].name}
                                            </h3>
                                        </Link>
                                    </div>
                                :<></>}





                                {/* <div className="flex justify-start pt-4">
                                    <Link href={datasheetCatalogues[0].url} target="_blank" className={`${all_desc_style} font-bold flex items-center hover:text-primary`}>
                                        <div className="pr-2">
                                            <Image src={'/images/sbacoustics/FRD-ZMA-download.webp'} alt="FRD ZMA Download" className="max-h-8 w-fit" width={100} height={100}/>
                                        </div>
                                        <h3 className="pl-2">
                                            FRD & ZMA Files
                                        </h3>
                                    </Link>
                                </div>
                               <div className="flex justify-start pt-4">
                                    <Link href={datasheetCatalogues[0].url} target="_blank" className={`${all_desc_style} font-bold flex items-center hover:text-primary`}>
                                        <div className="pr-2">
                                            <Image src={'/images/sbacoustics/3D-download.webp'} alt="3D Download" className="max-h-8 w-fit" width={100} height={100}/>
                                        </div>
                                        <h3 className="pl-2">
                                            3D Files
                                        </h3>
                                    </Link>
                                </div> */}
                                
                                <div className="col-span-2 lg:flex md:hidden flex">
                                    {data.specification &&
                                        (data.specification.air_gap_height != '' ||
                                        data.specification.coil_inductance_le != '' ||
                                        data.specification.compliance_cms != '' ||
                                        data.specification.cone_material != '' ||
                                        data.specification.custom_note != '' ||
                                        data.specification.dc_resistance_re != '' ||
                                        data.specification.dome_material != '' ||
                                        data.specification.effective_piston_area_sd != '' ||
                                        data.specification.electrical_q_factor_qes != '' ||
                                        data.specification.equivalent_volume_vas != '' ||
                                        data.specification.force_factor_bi != '' ||
                                        data.specification.free_air_resonance_fs != '' ||
                                        data.specification.impedance != '' ||
                                        data.specification.linear_coil_travel_pp != '' ||
                                        data.specification.magnet_weight != '' ||
                                        data.specification.magnetic_flux_density != '' ||
                                        data.specification.max_mechanical_cone_excursion_xmech != '' ||
                                        data.specification.mechanical_loss_rms != '' ||
                                        data.specification.mechanical_q_factor_qms != '' ||
                                        data.specification.mounting_diameter != '' ||
                                        data.specification.moving_mass_mms != '' ||
                                        data.specification.net_weight != '' ||
                                        data.specification.rated_power_handling != '' ||
                                        data.specification.recommended_frequency_range != '' ||
                                        data.specification.sensitivity != '' ||
                                        data.specification.total_q_factor_qts != '' ||
                                        data.specification.voice_coil_diameter != '' ||
                                        data.specification.voice_coil_height != '') &&
                                            <div className="w-1/2">
                                                <h2 className={`${all_sub_title_style} pt-8 pr-5`}>
                                                    Specs Woofer:
                                                </h2>
                                                <div className="pr-5">
                                                    {SingleProductTable(data.specification, all_desc_style)}
                                                </div>
                                            </div>
                                    }
                                    {customProps &&
                                        (customProps.air_gap_height != '' ||
                                        customProps.cabinet_material != '' ||
                                        customProps.crossover_frequency != '' ||
                                        customProps.customDesc != '' ||
                                        customProps.custom_note_for_spec != '' ||
                                        customProps.dc_resistance_re != '' ||
                                        customProps.dome_material != '' ||
                                        customProps.driver_units != '' ||
                                        customProps.enclosure_type != '' ||
                                        customProps.free_air_resonance_fs != '' ||
                                        customProps.frequency_range != '' ||
                                        customProps.magnet_weight != '' ||
                                        customProps.magnetic_flux_density != '' ||
                                        customProps.max_spl != '' ||
                                        customProps.net_weight != '' ||
                                        customProps.nominal_impedance != '' ||
                                        customProps.port_tuning_frequency != '' ||
                                        customProps.rated_power_handling != '' ||
                                        customProps.recommended_amplifier != '' ||
                                        customProps.sensitivity != '' ||
                                        customProps.speaker_dimension != '' ||
                                        customProps.voice_coil_diameter != '' ||
                                        customProps.voice_coil_height != '') &&
                                        <div className="w-1/2">
                                            <h2 className={`${all_sub_title_style} pt-8 pl-5`}>
                                                Specs Tweeter:
                                            </h2>
                                            <div className="pl-5">
                                                {CustomProductTable(customProps, all_desc_style)}
                                            </div>
                                        </div>
                                    }
                                </div>
                            </>
                        : 
                        <>
                            {desc[0] !== '-' &&
                                <>
                                    <h2 className={`${all_sub_title_style} pt-8`}>
                                        Features:
                                    </h2>
                                    <div className={all_desc_style.concat(" pl-4")}>
                                        <ul style={{ listStyleType: 'disc' }}>
                                            {desc.map((value, index) => (
                                                <li key={index}><h3>{value}</h3></li>
                                            ))}
                                        </ul>
                                    </div>
                                </>
                            }
                                

                               
                            <h2 className="sr-only">Datasheet:</h2>
                            {datasheetCatalogues && datasheetCatalogues.length===1 && datasheetCatalogues[0].url!=''?
                                <div className="flex justify-start pt-8">
                                    <Link href={datasheetCatalogues[0].url} target="_blank" className={`${all_desc_style} font-bold flex items-center hover:text-primary`}>
                                        <div className="pr-2">
                                            {/* <Download strokeWidth={3} size={15} className="text-white"/> */}
                                            <Image src={'/images/sbacoustics/PDF-download.webp'} alt="PDF Download" className="max-h-8 w-fit" width={100} height={100}/>
                                        </div>
                                        <h3 className="pl-2">
                                            {datasheetCatalogues[0].name}
                                        </h3>
                                    </Link>
                                </div>
                            : datasheetCatalogues[0].url!='' &&
                                <div className="justify-start pt-8">
                                    {datasheetCatalogues && datasheetCatalogues.map((value, index) => (
                                        value.url!=''&&
                                            <div key={index} className={`${index !== 0 && 'pt-4'}`}>
                                                    <Link href={value.url} target="_blank" className={`${all_desc_style} font-bold flex items-center hover:text-primary`}> 
                                                    <div className="pr-2">
                                                    {/* <Download strokeWidth={3} size={15} className="text-white"/> */}
                                                    <Image src={'/images/sbacoustics/PDF-download.webp'} alt="PDF Download" className="max-h-8 w-fit" width={100} height={100}/>
                                                </div>
                                                <h3 className="pl-2">
                                                    {datasheetCatalogues[index].name}
                                                </h3>
                                                </Link>
                                            </div>
                                    ))}
                                </div>                
                            }



                            <h2 className="sr-only">FRD & ZMA Files:</h2>
                            {frdZmaFiles && frdZmaFiles.length===1 && frdZmaFiles[0].url!=''?
                                <div className="flex justify-start pt-4">
                                    <Link href={frdZmaFiles[0].url} target="_blank" className={`${all_desc_style} font-bold flex items-center hover:text-primary`}>
                                        <div className="pr-2">
                                            {/* <Download strokeWidth={3} size={15} className="text-white"/> */}
                                            <Image src={'/images/sbacoustics/FRD-ZMA-download.webp'} alt="FRD ZMA Files Download" className="max-h-8 w-fit" width={100} height={100}/>
                                        </div>
                                        <h3 className="pl-2">
                                            {frdZmaFiles[0].name}
                                        </h3>
                                    </Link>
                                </div>
                            : frdZmaFiles[0].url!='' &&
                                <div className="justify-start pt-4">
                                    {frdZmaFiles && frdZmaFiles.map((value, index) => (
                                        value.url!=''&&
                                            <div key={index} className={`${index !== 0 && 'pt-4'}`}>
                                                    <Link href={value.url} target="_blank" className={`${all_desc_style} font-bold flex items-center hover:text-primary`}> 
                                                    <div className="pr-2">
                                                    {/* <Download strokeWidth={3} size={15} className="text-white"/> */}
                                                    <Image src={'/images/sbacoustics/FRD-ZMA-download.webp'} alt="FRD ZMA Files Download" className="max-h-8 w-fit" width={100} height={100}/>
                                                </div>
                                                <h3 className="pl-2">
                                                    {frdZmaFiles[index].name}
                                                </h3>
                                                </Link>
                                            </div>
                                    ))}
                                </div>                
                            }



                            <h2 className="sr-only">3D Models:</h2>
                            {models3D && models3D.length===1 && models3D[0].url!=''?
                                <div className="flex justify-start pt-4">
                                    <Link href={models3D[0].url} target="_blank" className={`${all_desc_style} font-bold flex items-center hover:text-primary`}>
                                        <div className="pr-2">
                                            {/* <Download strokeWidth={3} size={15} className="text-white"/> */}
                                            <Image src={'/images/sbacoustics/3D-download.webp'} alt="3D Files Download" className="max-h-8 w-fit" width={100} height={100}/>
                                        </div>
                                        <h3 className="pl-2">
                                            {models3D[0].name}
                                        </h3>
                                    </Link>
                                </div>
                            : models3D[0].url!='' &&
                                <div className="justify-start pt-4">
                                    {models3D && models3D.map((value, index) => (
                                        value.url!=''&&
                                            <div key={index} className={`${index !== 0 && 'pt-4'}`}>
                                                    <Link href={value.url} target="_blank" className={`${all_desc_style} font-bold flex items-center hover:text-primary`}> 
                                                    <div className="pr-2">
                                                    {/* <Download strokeWidth={3} size={15} className="text-white"/> */}
                                                    <Image src={'/images/sbacoustics/3D-download.webp'} alt="3D Files Download" className="max-h-8 w-fit" width={100} height={100}/>
                                                </div>
                                                <h3 className="pl-2">
                                                    {models3D[index].name}
                                                </h3>
                                                </Link>
                                            </div>
                                    ))}
                                </div>                
                            }

                            






                               {/* <div className="flex justify-start pt-4">
                                    <Link href={datasheetCatalogues[0].url} target="_blank" className={`${all_desc_style} font-bold flex items-center hover:text-primary`}>
                                        <div className="pr-2">
                                            <Image src={'/images/sbacoustics/FRD-ZMA-download.webp'} alt="FRD ZMA Download" className="max-h-8 w-fit" width={100} height={100}/>
                                        </div>
                                        <h3 className="pl-2">
                                            FRD & ZMA Files
                                        </h3>
                                    </Link>
                                </div>
                               <div className="flex justify-start pt-4">
                                    <Link href={datasheetCatalogues[0].url} target="_blank" className={`${all_desc_style} font-bold flex items-center hover:text-primary`}>
                                        <div className="pr-2">
                                            <Image src={'/images/sbacoustics/3D-download.webp'} alt="3D Download" className="max-h-8 w-fit" width={100} height={100}/>
                                        </div>
                                        <h3 className="pl-2">
                                            3D Files
                                        </h3>
                                    </Link>
                                </div> */}

                            {data && 
                                (data.specification.air_gap_height != '' ||
                                data.specification.coil_inductance_le != '' ||
                                data.specification.compliance_cms != '' ||
                                data.specification.cone_material != '' ||
                                data.specification.custom_note != '' ||
                                data.specification.dc_resistance_re != '' ||
                                data.specification.dome_material != '' ||
                                data.specification.effective_piston_area_sd != '' ||
                                data.specification.electrical_q_factor_qes != '' ||
                                data.specification.equivalent_volume_vas != '' ||
                                data.specification.force_factor_bi != '' ||
                                data.specification.free_air_resonance_fs != '' ||
                                data.specification.impedance != '' ||
                                data.specification.linear_coil_travel_pp != '' ||
                                data.specification.magnet_weight != '' ||
                                data.specification.magnetic_flux_density != '' ||
                                data.specification.max_mechanical_cone_excursion_xmech != '' ||
                                data.specification.mechanical_loss_rms != '' ||
                                data.specification.mechanical_q_factor_qms != '' ||
                                data.specification.mounting_diameter != '' ||
                                data.specification.moving_mass_mms != '' ||
                                data.specification.net_weight != '' ||
                                data.specification.rated_power_handling != '' ||
                                data.specification.recommended_frequency_range != '' ||
                                data.specification.sensitivity != '' ||
                                data.specification.total_q_factor_qts != '' ||
                                data.specification.voice_coil_diameter != '' ||
                                data.specification.voice_coil_height != '') &&
                                    <>
                                        <h2 className={`${all_sub_title_style} pt-8`}>
                                            Specs:
                                        </h2>
                                        <div className="md:w-3/4 w-full">
                                            {SingleProductTable(data.specification, all_desc_style)}
                                        </div>
                                    </>
                                }
                            </>
                        }
                        
                    </div>
                </div>
            </div>}

            {data?.isCustom && !data.isKits &&
                <div className=" col-span-2 lg:hidden md:flex hidden">
                    {data.specification &&
                        (data.specification.air_gap_height != '' ||
                        data.specification.coil_inductance_le != '' ||
                        data.specification.compliance_cms != '' ||
                        data.specification.cone_material != '' ||
                        data.specification.custom_note != '' ||
                        data.specification.dc_resistance_re != '' ||
                        data.specification.dome_material != '' ||
                        data.specification.effective_piston_area_sd != '' ||
                        data.specification.electrical_q_factor_qes != '' ||
                        data.specification.equivalent_volume_vas != '' ||
                        data.specification.force_factor_bi != '' ||
                        data.specification.free_air_resonance_fs != '' ||
                        data.specification.impedance != '' ||
                        data.specification.linear_coil_travel_pp != '' ||
                        data.specification.magnet_weight != '' ||
                        data.specification.magnetic_flux_density != '' ||
                        data.specification.max_mechanical_cone_excursion_xmech != '' ||
                        data.specification.mechanical_loss_rms != '' ||
                        data.specification.mechanical_q_factor_qms != '' ||
                        data.specification.mounting_diameter != '' ||
                        data.specification.moving_mass_mms != '' ||
                        data.specification.net_weight != '' ||
                        data.specification.rated_power_handling != '' ||
                        data.specification.recommended_frequency_range != '' ||
                        data.specification.sensitivity != '' ||
                        data.specification.total_q_factor_qts != '' ||
                        data.specification.voice_coil_diameter != '' ||
                        data.specification.voice_coil_height != '') &&
                        <div className="w-1/2">
                            <h2 className={`${all_sub_title_style} pt-8 pr-5`}>
                                Specs Woofer:
                            </h2>
                            <div className="pr-5">
                                {SingleProductTable(data.specification, all_desc_style)}
                            </div>
                        </div>
                    }
                    {customProps &&
                        (customProps.air_gap_height != '' ||
                        customProps.cabinet_material != '' ||
                        customProps.crossover_frequency != '' ||
                        customProps.customDesc != '' ||
                        customProps.custom_note_for_spec != '' ||
                        customProps.dc_resistance_re != '' ||
                        customProps.dome_material != '' ||
                        customProps.driver_units != '' ||
                        customProps.enclosure_type != '' ||
                        customProps.free_air_resonance_fs != '' ||
                        customProps.frequency_range != '' ||
                        customProps.magnet_weight != '' ||
                        customProps.magnetic_flux_density != '' ||
                        customProps.max_spl != '' ||
                        customProps.net_weight != '' ||
                        customProps.nominal_impedance != '' ||
                        customProps.port_tuning_frequency != '' ||
                        customProps.rated_power_handling != '' ||
                        customProps.recommended_amplifier != '' ||
                        customProps.sensitivity != '' ||
                        customProps.speaker_dimension != '' ||
                        customProps.voice_coil_diameter != '' ||
                        customProps.voice_coil_height != '') &&
                            <div className="w-1/2">
                                <h2 className={`${all_sub_title_style} pt-8 pl-5`}>
                                    Specs Tweeter:
                                </h2>
                                <div className="pl-5">
                                    {CustomProductTable(customProps!, all_desc_style)}
                                </div>
                            </div>
                    }
                </div>
            }
            {similarprod.length!=0?
                <div className={`${all_sub_title_style} pt-28 justify-center items-center text-center w-full`}>
                    <h2 className="pb-4">
                        Similar Products
                    </h2>
                    <div className='border-2 rounded-lg p-4'>
                        <SwiperCarouselSimilarProduct similar={similarprod}/>
                    </div>
                </div>
                :
                <></>
            }
        </div>)
    );
}
