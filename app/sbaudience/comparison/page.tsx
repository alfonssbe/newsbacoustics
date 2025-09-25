"use client"

import { Custom_Specifications, SingleProducts } from '@/app/types';
import Image from 'next/image';
import { useEffect, useState, use, useRef } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from '@/components/ui/table';
import getCustomProduct from '@/app/actions/get-one-custom-props';
import { Loader } from '@/components/ui/loader';
import { ArrowLeft, ArrowRight, Lightbulb, X } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import getProduct from '@/app/actions/get-one-product';

function createData(
    name: string,
    attribute: string,
    unit: string,
) {
    return { name, attribute, unit };
}

const ProductBySubCategoryPage = () => {
    const router = useRouter();
    const [finalFetchedProducts, setFinalFetchedProducts] = useState<SingleProducts[]>([])
    const [finalCustomSpecProducts, setFinalCustomSpecProducts] = useState<Custom_Specifications[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [customProd, setCustomProd] = useState<boolean>(false)
    const [kitsProd, setKitsProd] = useState<boolean>(false)
    const [slideUp, setSlideUp] = useState(false);    // Track slide-up 
    const [finalSlug, setFinalSlug] = useState<string[]>([])

    const scrollContainerRef = useRef<HTMLDivElement>(null)
    const [isDragging, setIsDragging] = useState(false)
    const [startX, setStartX] = useState(0)
    const [scrollLeft, setScrollLeft] = useState(0)

    
    const [hasOverflow, setHasOverflow] = useState(false);
    const pathname = usePathname();
    useEffect(() => {
        const el = scrollContainerRef.current;
        if (!el) return;

        const checkOverflow = () => {
            setHasOverflow(el.scrollWidth > el.clientWidth);
        };

        const resizeObserver = new ResizeObserver(checkOverflow);
        resizeObserver.observe(el);

        // Run once immediately
        checkOverflow();

        return () => resizeObserver.disconnect();
    }, [typeof window !== "undefined" ? localStorage.getItem("selectedComparison") : null]);

    // Handle mouse down event to start dragging
    const handleMouseDown = (e: React.MouseEvent) => {
      if (!scrollContainerRef.current) return
  
      setIsDragging(true)
      setStartX(e.pageX - scrollContainerRef.current.offsetLeft)
      setScrollLeft(scrollContainerRef.current.scrollLeft)
      if (hasOverflow) { scrollContainerRef.current.style.cursor = "grabbing" }
    }
  
    // Handle mouse move event while dragging
    const handleMouseMove = (e: React.MouseEvent) => {
      if (!isDragging || !scrollContainerRef.current) return
  
      const x = e.pageX - scrollContainerRef.current.offsetLeft
      const walk = (x - startX) * 2 // Scroll speed multiplier
      scrollContainerRef.current.scrollLeft = scrollLeft - walk
    }
  
    // Handle mouse up event to stop dragging
    const handleMouseUp = () => {
      setIsDragging(false)
      if (scrollContainerRef.current) {
        if (hasOverflow) { scrollContainerRef.current.style.cursor = "grab" }
      }
    }
  
    // Handle mouse leave event to stop dragging
    const handleMouseLeave = () => {
      if (isDragging) {
        setIsDragging(false)
        if (scrollContainerRef.current) {
          if (hasOverflow) { scrollContainerRef.current.style.cursor = "grab" }
        }
      }
    }
  
    const scrollLeft20 = () => {
        if (scrollContainerRef.current) {
          const container = scrollContainerRef.current;
          const maxScrollLeft = container.scrollLeft; // Current left scroll position
          const scrollAmount = Math.min(300, maxScrollLeft); // Scroll only available amount
          container.scrollBy({ left: -scrollAmount, behavior: "smooth" });
        }
      };
      
      const scrollRight20 = () => {
        if (scrollContainerRef.current) {
          const container = scrollContainerRef.current;
          const maxScrollRight = container.scrollWidth - container.clientWidth - container.scrollLeft; 
          const scrollAmount = Math.min(300, maxScrollRight); // Scroll only available amount
          container.scrollBy({ left: scrollAmount, behavior: "smooth" });
        }
      };
  

    useEffect(() => {
        const fetchData = async () => {
            try {
                document.body.style.overflow = 'hidden';
                let fetchedProducts: SingleProducts[] = []
                let customSpecProducts: Custom_Specifications[] = []
                const decodedSlugs = decodeURIComponent(localStorage.getItem("selectedComparison") || '');
                const slugArray = decodedSlugs.split(',');
                slugArray.pop()
                setFinalSlug(slugArray)
                await Promise.all(
                    slugArray.map(async (value) => {
                        let temp: SingleProducts = await getProduct("", value);
                        if(temp.isCustom){
                            setCustomProd(true)
                        }
                        if(temp.isKits){
                            setKitsProd(true)
                        }
                        let tempCustom: Custom_Specifications = await getCustomProduct(pathname, value)
                        customSpecProducts.push(tempCustom)
                        fetchedProducts.push(temp);
                    })
                );
                setFinalFetchedProducts(fetchedProducts)
                setFinalCustomSpecProducts(customSpecProducts)

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
        }

        fetchData()
    }, []);

    const rows = [
        createData('Nominal Impedance', 'impedance', "Ω"),
        createData('DC Resistance, Re', 'dc_resistance_re', "Ω"),
        createData('Voice coil inductance, Le', 'coil_inductance_le', "mH"),
        createData('Effective piston area, Sd', 'effective_piston_area_sd', "cm²"),
        createData('Voice coil diameter', 'voice_coil_diameter', "mm"),
        createData('Voice coil height', 'voice_coil_height', "mm"),
        createData('Air gap height', 'air_gap_height', "mm"),
        createData('Linear coil travel (p-p)', 'linear_coil_travel_pp', "mm"),
        createData('Moving mass incl. air, Mms', 'moving_mass_mms', "g"),
        createData('Free air resonance, Fs', 'free_air_resonance_fs', "Hz"),
        createData('Sensitivity (2.83 V / 1 m)', 'sensitivity', "dB"),
        createData('Mechanical Q-factor, Qms', 'mechanical_q_factor_qms', ""),
        createData('Electrical Q-factor, Qes', 'electrical_q_factor_qes', ""),
        createData('Total Q-factor, Qts', 'total_q_factor_qts', ""),
        createData('Force factor, Bl', 'force_factor_bi', "Tm"),
        createData('Rated power handling*', 'rated_power_handling', "W"),
        createData('Magnetic flux density', 'magnetic_flux_density', "T"),
        createData('Magnet weight', 'magnet_weight', "kg"),
        createData('Net weight', 'net_weight', "kg"),
        createData('Equivalent volume, VAS', 'equivalent_volume_vas', "liters"),
        createData('Compliance, Cms', 'compliance_cms', "mm/N"),
        createData('Mechanical loss, Rms', 'mechanical_loss_rms', "kg/s"),
        createData('Recommended Frequency Range', 'recommended_frequency_range', ""),
        createData('Max Mechanical Cone Excursion, Xmech', 'max_mechanical_cone_excursion_xmech', ""),
        createData('Cone Material', 'cone_material', ""),
        createData('Dome Material', 'dome_material', ""),
        // createData('Mounting Diameter', 'mounting_diameter', "Ø"),
      ];

    const customrows = [
      createData('Frequency Range', 'frequency_range', ""),
      createData('Sensitivity  (2.83V/1m)', 'sensitivity', "dB"),
      createData('Nominal Impedance', 'nominal_impedance', "Ω"),
      createData('Max SPL', 'max_spl', "dB"),
      createData('Recommended Amplifier', 'recommended_amplifier', "W"),
      createData('Crossover Frequency', 'crossover_frequency', "Hz"),
      createData('Enclosure Type', 'enclosure_type', ""),
      createData('Port Tuning Frequency', 'port_tuning_frequency', "Hz"),
      createData('Driver Units', 'driver_units', ""),
      createData('Cabinet Material', 'cabinet_material', ""),
      createData('Speaker Dimension', 'speaker_dimension', ""),
      createData('Net Weight (kg)', 'net_weight', ""),
      createData('DC Resistance, re', 'dc_resistance_re', "Ω"),
      createData('Voice Coil Diameter', 'voice_coil_diameter', "mm"),
      createData('Voice Coil Height', 'voice_coil_height', "mm"),
      createData('Air Gap Height', 'air_gap_height', "mm"),
      createData('Free Air Resonance, FS', 'free_air_resonance_fs', "Hz"),
      createData('Rated Power Handling*', 'rated_power_handling', "W"),
      createData('Magnetic Flux Density', 'magnetic_flux_density', "T"),
      createData('Magnet Weight', 'magnet_weight', "kg"),
      createData('Dome Material', 'dome_material', ""),
    ];

    function deleteSlug(slug: string) {
        let tempslug = finalSlug.filter((val) => val !== slug) 
        setFinalSlug(tempslug)
        let url = tempslug.map((value) => value).join(',') + ",";
        if(url === ","){
            url = ""
        }
        localStorage.setItem("selectedComparison", url);
        const index = finalFetchedProducts.findIndex((val) => val.slug === slug);
        if (index !== -1) {
            setFinalFetchedProducts(finalFetchedProducts.filter((_, i) => i !== index));
            setFinalCustomSpecProducts(finalCustomSpecProducts.filter((_, i) => i !== index));
        }
        if(finalSlug.length === 1) {
            router.push('/')
        }
    }

    return (
        <div className="xl:px-16 lg:px-12 pt-14 pb-6 px-8">
            {loading && (
                <div
                    className={`fixed top-0 left-0 w-full h-full z-[1000] flex items-center justify-center bg-black transition-transform duration-700 ${
                    slideUp ? '-translate-y-full' : 'translate-y-0'
                    }`}
                >
                    <Loader />
                </div>
                )}
            {/* <div className="flex justify-center"> */}
            <X width={30} height={30} className='absolute top-20 xl:right-16 lg:right-12 right-8 text-primary opacity-70 hover:opacity-100 text-right hover:cursor-pointer' onClick={() => router.push(`/drivers`)}/>

            
        <div className="md:whitespace-nowrap shadow-xl p-2 border rounded-md ">
            <div className={`sticky top-1/2 -translate-y-1/2 z-10 ${!hasOverflow && 'hidden'}`}>
            <div className="relative flex items-center w-full mx-auto">

                    <div className="absolute -left-4">
                        <Button variant="outline" size="icon" className="rounded-full shadow-lg bg-background" onClick={scrollLeft20}>
                            <ArrowLeft className="h-4 w-4" />
                        </Button>
                    </div>
                    
{/*                    
                    <div className="mx-auto text-center w-fit bg-white shadow-md p-2 rounded-md">
                        You can Scroll Left & Right
                    </div> */}


                    <div className="absolute -right-4">
                        <Button
                            variant="outline"
                            size="icon"
                            className="rounded-full shadow-lg bg-background"
                            onClick={scrollRight20}
                        >
                            <ArrowRight className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </div>


        <div
          ref={scrollContainerRef}
          className={`flex overflow-x-auto ${hasOverflow && 'cursor-grab'}`}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          <div className="space-x-4">
          <Table className="w-full">
                     <TableHeader>
                         <TableRow className='hover:bg-white'>
                             <TableHead>
                                <div className={`${!hasOverflow && 'hidden'}`}>
                                    <div className='flex items-center gap-1 text-primary'>
                                        <Lightbulb className="h-4 w-4 text-yellow-500" />
                                        <div className='font-bold'>Pro Tip!</div>
                                    </div>
                                    <div>
                                        You can scroll left & right!
                                    </div>
                                </div>
                             </TableHead>
                             {finalFetchedProducts.map((product) => (
                                 <TableHead key={product.name} className="relative">
                                 <X 
                                     width={20} 
                                     height={20} 
                                     className="absolute top-2 right-2 text-primary opacity-70 hover:opacity-100 hover:cursor-pointer"
                                     onClick={() => deleteSlug(product.slug)}
                                 />
                                 <Image 
                                     src={product.coverUrl.startsWith('/uploads/') ? `${process.env.NEXT_PUBLIC_ROOT_URL}${product.coverUrl}` : product.coverUrl} 
                                     alt={product.name} 
                                     width={100} 
                                     height={100} 
                                     className="max-w-36 h-fit mx-auto"
                                 />
                                 <div className="font-bold text-lg text-center max-w-52 break-words whitespace-normal">{product.name}</div>
                             </TableHead>
                             ))}
                         </TableRow>
                     </TableHeader>
                     <TableBody>
                         {rows.map((row,index)=> {
                             //@ts-ignore
                             const hasValue = finalFetchedProducts.some(product => product.specification[row.attribute] !== '');

                             // Render the TableRow if at least one value is present
                             return hasValue ? (
                                 <TableRow key={index} className='hover:bg-primary hover:text-white'>
                                     <TableCell className='font-bold'>{row.name}</TableCell>
                                     {finalFetchedProducts.map((product) => (
                                         //@ts-ignore
                                         (<TableCell key={product.name} className='text-center max-w-52 break-words whitespace-normal'>{product.specification[row.attribute] !== ''? `${product.specification[row.attribute]} ${row.unit}`
                                                     : '-'
                                                 }
                                         </TableCell>)
                                     ))}
                                 </TableRow>
                             ) : null;
                         })}
                        {customProd && (
                            <>
                                {!kitsProd ? <div className='text-left text-3xl font-bold py-8'>SPECS TWEETER</div>: <div className='h-16'></div>}
                                {customrows.map((customrow, index) => {
                                    if(kitsProd && customrow.name === 'Nominal Impedance'){
                                        return null
                                    }
                                    //@ts-ignore
                                    const hasValue = finalCustomSpecProducts.some(product => product[customrow.attribute] !== '');

                                    // Render the TableRow if at least one value is present
                                    return hasValue && (
                                        <TableRow key={index} className='hover:bg-primary hover:text-white'>
                                            <TableCell className='font-bold'>{customrow.name}</TableCell>
                                            {finalCustomSpecProducts.map((product, productIndex) => (
                                                //@ts-ignore
                                                (<TableCell key={productIndex} className='text-center max-w-52 break-words whitespace-normal'>{product[customrow.attribute] !== '' ? `${product[customrow.attribute]} ${customrow.unit}` 
                                                            : '-'
                                                        }
                                                </TableCell>)
                                            ))}
                                        </TableRow>
                                    )
                                })}
                            </>
                        )}
                     </TableBody>
                 </Table>
          </div>
        </div>

      </div>

      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>



             <div className="pt-6 flex justify-center">
                <Button className="flex items-center" onClick={() => router.push(`/drivers`)}>Add More Products</Button>
            </div>
        </div>
    );
}

export default ProductBySubCategoryPage;
