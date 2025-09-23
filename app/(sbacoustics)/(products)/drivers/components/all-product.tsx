"use client";

import NoResults from "@/components/ui/no-results";
import ProductCard from "@/app/(sbacoustics)/components/ui/product-card";
import { activeCheckbox, activeSlider, PriorityMenu, Products } from "@/app/(sbacoustics)/types";
import React, { useEffect, useRef, useState } from "react";
import AllActiveFilters from "./all-active-filters";
import { BarChart4, Check, ChevronDown, ChevronUp, Loader2, Trash2, X } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useToast } from "@/components/hooks/use-toast";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import getSubCatNameBySlug from "@/app/(sbacoustics)/actions/get-SubCat_Name";
import getSubSubCatNameBySlug from "@/app/(sbacoustics)/actions/get-SubSubCat_Name";
import { usePathname, useRouter } from "next/navigation";
import getCompareAttr from "@/app/(sbacoustics)/actions/get-comparison-attribute-from-slug";

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';
import { Navigation, Thumbs, Scrollbar } from 'swiper/modules';
import getAllPriorityBySubCategory from "@/app/(sbacoustics)/actions/get-all-priority-by-category";


interface MainProps {
    allActiveSliderVal: (activeSlider)[]
    allActiveCheckboxVal: (activeCheckbox)[]
    products: (Products)[]
};

const AllDriversProducts: React.FC<MainProps> = ({
    allActiveSliderVal, allActiveCheckboxVal, products
}) => {
    
    const [activeSlugCompare, setActiveSlugCompare] = useState<string[]>([]);
    const [activeNameCompare, setActiveNameCompare] = useState<string[]>([]);
    const [activeImgUrlCompare, setActiveImgUrlCompare] = useState<string[]>([]);

    const [allFeaturedProducts, setAllFeaturedProducts] = useState<Products[]>([])
    const [hoveredDriver, setHoveredDriver] = useState<{ [key: string]: boolean }>({});
    const { toast } = useToast()    
    const [isButtonVisible, setIsButtonVisible] = useState(false);
    const [finalBreadcrumb, setFinalBreadcrumb] = useState<string[]>([])
    const [priority, setPriority] = useState<PriorityMenu[]>([])


    const [totalSlidesPerView, setTotalSlidesPerView] = useState<number>(1);
    const [totalSpaceBetween, setTotalSpaceBetween] = useState<number>(0);
    const [loadFinished, setLoadFinsihed] = useState<boolean>(false)
    

    const pathname = usePathname()
    const params = pathname.split('/').slice(1);

    useEffect(() => {
        const updateSwiper = () => {
        if(window.innerWidth > 1280){
            setTotalSlidesPerView(3.5);
            setTotalSpaceBetween(20);
        }
        else if(window.innerWidth >768){
            setTotalSlidesPerView(2.5);
            setTotalSpaceBetween(10);
        }
        else{
            setTotalSlidesPerView(1.5);
            setTotalSpaceBetween(5);
        }
        }

        updateSwiper()
        // Listen for window resize events
        window.addEventListener("resize", updateSwiper);
    
        // Cleanup event listener on unmount
        return () => window.removeEventListener("resize", updateSwiper);
    }, []);

    useEffect(() => {
        const fetchPriority = async () => {
          try {  
            let temp = await getAllPriorityBySubCategory(pathname, params[params.length - 1])
            setPriority(temp)
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
    
        fetchPriority();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
          try {
            setLoadFinsihed(false)
            const id = localStorage.getItem("selectedComparison") ?? '';
            const decodedSlugs = decodeURIComponent(id);
            const slugArray = decodedSlugs.split(',');
            slugArray.pop()
            setActiveSlugCompare(slugArray);

            // Wait for all getCompareAttr results
            const results = await Promise.all(slugArray.map((slug) => getCompareAttr(pathname, slug)));
            const names = results.map((r) => r[0]);
            const imgs = results.map((r) => r[1]);
            setActiveNameCompare(names);
            setActiveImgUrlCompare(imgs);
            

            let finishedSliderProducts: Products [] = []
            let finishedCheckboxProducts: Products[] = []
            let tempShowed: Products[][] = [];
            if(params.length === 2){
                if(params[1] === 'all') {
                    setFinalBreadcrumb([params[0], 'All Drivers'])
                }
                else{
                    setFinalBreadcrumb([params[0], await getSubCatNameBySlug(params[1])])
                }
            }
            else if (params.length > 2){
                setFinalBreadcrumb([params[0], await getSubCatNameBySlug(params[1]), await getSubSubCatNameBySlug(params[2])])
            }
            if (allActiveSliderVal.length !== 0) {
                allActiveSliderVal.forEach((slider, indexslider) => {
                    // Initialize the array at the current index if it doesn't exist
                    if (!tempShowed[indexslider]) {
                        tempShowed[indexslider] = [];
                    }
                    if (indexslider === 0) {
                        products.forEach((product) => {
                            let productValue = 0
                            if(slider.slug==='size'){
                                productValue = Number(product.size.value)
                            }
                            else{
                                //@ts-ignore
                                productValue = Number(product.specification[slider.slug]);
                            }
                            const bottomValue = Number(slider.bottomRealVal);
                            const topValue = Number(slider.topRealVal);
            
                            if (bottomValue <= productValue && topValue >= productValue) {
                                tempShowed[indexslider].push(product);
                            }
                        });
                    } else {
                        tempShowed[indexslider - 1].forEach((product) => {
                            let productValue = 0
                            if(slider.slug==='size'){
                                productValue = Number(product.size.value)
                            }
                            else{
                                //@ts-ignore
                                productValue = Number(product.specification[slider.slug]);
                            }
                            const bottomValue = Number(slider.bottomRealVal);
                            const topValue = Number(slider.topRealVal);
            
                            if (bottomValue <= productValue && topValue >= productValue) {
                                tempShowed[indexslider].push(product);
                            }
                        });
                    }
                });
            
                // setAllFeaturedProducts(tempShowed[allActiveSliderVal.length - 1]);
                finishedSliderProducts = tempShowed[allActiveSliderVal.length - 1]
                // activeIndex = allActiveSliderVal.length
            } else {
                finishedSliderProducts = products
                // setAllFeaturedProducts(products);
            }

            if (allActiveCheckboxVal.length !== 0) {
                let finalTempProduct: Record<string, Products[]> = {};
                let checkboxCategories: string[] = [];

                allActiveCheckboxVal.forEach((checkbox) => {
                    const category = checkbox.slug;
                    !checkboxCategories.includes(category)?
                        checkboxCategories.push(category)
                    :
                        null

                    if (!finalTempProduct[category]) {
                        finalTempProduct[category] = [];
                    }

                    products.forEach((product) => {
                        //@ts-ignore
                        const productValue = product.specification[checkbox.slug];
                        const checkboxValue = checkbox.name;
                        if (productValue === checkboxValue.toString()) {
                            const productExists = finalTempProduct[category].some(item => item.name === product.name);

                            if (!productExists) {
                                finalTempProduct[category].push(product);
                            }
                        }
                    });
                });

                let tempFinished: Products[] = [];
                let productCountMap = new Map<string, number>();

                checkboxCategories.map((category) => {
                    finalTempProduct[category].map((product) => {
                        tempFinished.push(product);
                        const count = productCountMap.get(product.name) || 0;
                        productCountMap.set(product.name, count + 1);
                    });
                });

                productCountMap.forEach((count, productName) => {
                    if (count === checkboxCategories.length) {
                        const product = tempFinished.find(p => p.name === productName);
                        if (product) {
                            finishedCheckboxProducts.push(product);
                        }
                    }
                });
            }
            else{
                finishedCheckboxProducts = products
            }

            let FinalFeatured: Products[] = []
            for (const checkboxproducts of finishedCheckboxProducts) {
                for (const sliderproducts of finishedSliderProducts) {
                    if(checkboxproducts.name === sliderproducts.name){
                        FinalFeatured.push(sliderproducts)
                        break
                    }
                }
            }
            
            if(priority.length === 0) {
                FinalFeatured.sort((a, b) => {
                    // Extract the leading number from the name
                    const numA = parseInt(a.name.match(/^\d+/)?.[0] || "100", 10);
                    const numB = parseInt(b.name.match(/^\d+/)?.[0] || "100", 10);
                
                    if (numA !== numB) {
                    return numA - numB; // Sort numerically first
                    }
                
                    return a.name.localeCompare(b.name); // Sort alphabetically if numbers are the same
                });
                setAllFeaturedProducts(FinalFeatured)
                setLoadFinsihed(true)
            }
            else{
                FinalFeatured.sort((a, b) => {
                    const priorityA = Number(priority.find((pri) => pri.productId === a.id)?.priority ?? 999)
                    const priorityB = Number(priority.find((pri) => pri.productId === b.id)?.priority ?? 999)
                    return priorityA - priorityB
                });
                setAllFeaturedProducts(FinalFeatured)
                setLoadFinsihed(true)
            }

          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
    
        fetchData();
      }, [products, allActiveSliderVal, allActiveCheckboxVal]); 

    function addComparison(slug: string, name: string, imgUrl: string) {
        if (!activeSlugCompare.includes(slug)) {
            const newSlugs = [...activeSlugCompare, slug];
            const newNames = [...activeNameCompare, name];
            const newImgs = [...activeImgUrlCompare, imgUrl];

            setActiveSlugCompare(newSlugs);
            setActiveNameCompare(newNames);
            setActiveImgUrlCompare(newImgs);

            const tempUrl = newSlugs.join(",") + ",";
            localStorage.setItem("selectedComparison", tempUrl);
        }
    }


    const handleHover = (id: string) => {
        setHoveredDriver((prev) => ({
          ...prev,
          [id]: true,
        }));
      };

      const handleHoverLeave = (id: string) => {
        setHoveredDriver((prev) => ({
          ...prev,
          [id]: false,
        }));
      };

      const [_1, setRefresh] = useState<string>('');
      const [_2, setIsOpen] = useState(false)
      
      const buttonRef = useRef<HTMLDivElement | null>(null);  // Ref for the Scale icon div
      const comparisonListRef = useRef<HTMLDivElement | null>(null);  // Ref for the comparison list
    
      function deleteComparison(slug: string) {
        let tempslug: string[] = []
        let tempname: string[] = []
        let tempimgurl: string[] = []
        let tempUrl: string = ''
        activeSlugCompare.map((value, index) => {
          if (value !== slug) {
            tempslug.push(activeSlugCompare[index])
            tempname.push(activeNameCompare[index])
            tempimgurl.push(activeImgUrlCompare[index])
            tempUrl = tempUrl.concat(value, ",");
          } else {
            if (activeSlugCompare.length === 1) {
              tempname = []
              tempslug = []
            }
          }
        });
        setActiveSlugCompare(tempslug);
        setActiveNameCompare(tempname);
        setActiveImgUrlCompare(tempimgurl);
        // setUrl(tempUrl);
        localStorage.setItem("selectedComparison", tempUrl);
        setRefresh(slug);
      }
    
      // Close the comparison list when clicking outside
      useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
          if (
            buttonRef.current && !buttonRef.current.contains(event.target as Node) && // If the click is not inside the Scale icon div
            comparisonListRef.current && !comparisonListRef.current.contains(event.target as Node) // If the click is not inside the comparison list
          ) {
            setIsOpen(false); // Close the comparison list
          }
        };
    
        document.addEventListener("mousedown", handleClickOutside); // Listen for clicks outside
    
        return () => {
          document.removeEventListener("mousedown", handleClickOutside); // Clean up the event listener
        };
      }, []);
    

    useEffect(() => {
        setIsButtonVisible(activeSlugCompare.length > 0);
    }, [activeSlugCompare.length]);
    

    return ( 
        <>
        
                <Drawer>
                    <DrawerTrigger asChild>
                    <Button
                        variant="default"
                        className={`rounded-b-none shadow-2xl bottom-0 fixed left-1/2 -translate-x-1/2 transform transition-transform duration-300 ease-in-out z-40 hover:bg-primary hover:translate-y-0 h-20 ${isButtonVisible ? 'translate-y-8' : 'translate-y-20'}`}
                    >
                        <div className="flex flex-col items-center gap-3">
                            <div>Compare</div>
                            <div>
                                <ChevronUp size={20} />
                            </div>
                        </div>
                    </Button>

                    </DrawerTrigger>
                    <DrawerContent className="px-4">
                        <DrawerHeader>
                            <DrawerTitle className="text-center">All Comparison</DrawerTitle>
                            <DrawerDescription></DrawerDescription>
                        </DrawerHeader>

                        <Swiper
                            slidesPerView={totalSlidesPerView}
                            spaceBetween={totalSpaceBetween}
                            scrollbar={{ draggable: true }}
                            navigation={true}
                            modules={[Scrollbar, Thumbs, Navigation]}
                            className="mySwiper h-[270px] w-full"
                            style={{
                            // @ts-ignore
                            "--swiper-pagination-color": "#e60013",
                            "--swiper-navigation-color": "#000000",
                            "--swiper-navigation-size": "20px",
                            "--swiper-pagination-bottom": "0px",
                            "--swiper-scrollbar-drag-bg-color" : "#000000",
                            "--swiper-scrollbar-size": "8px"
                            }}
                            >
                            {activeImgUrlCompare && activeImgUrlCompare.length > 0 && activeSlugCompare && activeSlugCompare.length !== 0 && activeSlugCompare.map((value, index) => (
                            <SwiperSlide key={index}>
                                <div className="h-[250px]">
                                    <Card className="relative min-h-[250px] flex items-center justify-center transform duration-200 hover:shadow-lg">
                                        <Button
                                            className="absolute top-2 right-2 hover:text-primary"
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => deleteComparison(value)}
                                            aria-label={`Remove ${activeNameCompare[index]} from comparison`}
                                        >
                                            <X className="w-4 h-4 text-primary" />
                                        </Button>
                                        <CardContent className="flex items-center justify-center text-center p-2">
                                            <div className="flex flex-col items-center justify-center text-center relative">
                                                <div className="absolute flex items-center justify-center z-[-1] w-10 h-10">
                                                    <Loader2 className="animate-spin text-gray-500" size={20} />
                                                </div>
                                                <Image src={activeImgUrlCompare[index].startsWith('/uploads/') ? `${process.env.NEXT_PUBLIC_ROOT_URL}${activeImgUrlCompare[index]}` : activeImgUrlCompare[index] } alt={activeNameCompare[index]} width={150} height={150} />
                                                <div className="text-black text-base font-bold mt-4">
                                                    {activeNameCompare[index]}
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>
                            </SwiperSlide>
                            ))}
                        </Swiper> 

                        <DrawerFooter className="items-center">
                        <div className="flex flex-col items-center gap-2">
                            {isButtonVisible &&
                                <Button size="sm" className="flex items-center gap-2 p-8" asChild>
                                    <Link href={`/comparison`}>Compare Now</Link>
                                </Button>
                            }
                            <DrawerClose asChild>
                                <Button variant="outline" className="w-fit flex justify-center">
                                    <ChevronDown size={20} />
                                </Button>
                            </DrawerClose>
                        </div>
                        </DrawerFooter>
                    </DrawerContent>
                </Drawer>



         <div className="lg:col-span-4 md:col-span-3 relative">
                {/* <ComparisonButton slug={SelectedSlugComparison!} name={SelectedNameComparison!}/> */}
                <div className="text-base text-left pl-4">
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem>
                            <BreadcrumbLink href="/">Home</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            {finalBreadcrumb.map((value, index) => {
                                const isLast = index === finalBreadcrumb.length - 1;

                                let breadcrumbItem = null;

                                if (index === 0) {
                                    if (value === 'drivers') {
                                        breadcrumbItem = (
                                            <BreadcrumbItem key={index}>
                                                <BreadcrumbLink href={`/drivers`}>Drivers</BreadcrumbLink>
                                            </BreadcrumbItem>
                                        );
                                    } else if (value === 'kits') {
                                        breadcrumbItem = (
                                            <BreadcrumbItem key={index}>
                                                <BreadcrumbLink href={`/kits`}>Kits</BreadcrumbLink>
                                            </BreadcrumbItem>
                                        );
                                    }
                                } else if (isLast) {
                                    breadcrumbItem = (
                                        <BreadcrumbItem key={index}>
                                            <BreadcrumbPage>{value}</BreadcrumbPage>
                                        </BreadcrumbItem>
                                    );
                                } else {
                                    breadcrumbItem = (
                                        <BreadcrumbItem key={index}>
                                            <BreadcrumbLink href={`/drivers/${params[index]}`}>{value}</BreadcrumbLink>
                                        </BreadcrumbItem>
                                    );
                                }

                                return (
                                    <React.Fragment key={index}>
                                        {breadcrumbItem}
                                        {!isLast && <BreadcrumbSeparator />}
                                    </React.Fragment>
                                );
                            })}
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>
                {allActiveCheckboxVal.length!=0 || allActiveSliderVal.length!=0?
                <AllActiveFilters slider={allActiveSliderVal} checkbox={allActiveCheckboxVal}/>
                :
                <></>}
                {!loadFinished && <div className="h-screen"></div>}
                {loadFinished && allFeaturedProducts.length === 0 && <NoResults />}
                <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {allFeaturedProducts.map((item: Products, i) => (
                        <div key={i} className="px-2 pt-12 relative" onMouseEnter={() => handleHover(item.id)} onMouseLeave={() => handleHoverLeave(item.id)}>
                            <div
                                className={`lg:block hidden absolute top-12 right-4 z-30`}
                            >
                                {activeSlugCompare?.includes(item.slug)?
                                <div className="hover:text-primary hover:cursor-pointer" onClick={() => {deleteComparison(item.slug),
                                    toast({
                                        title: item.name.concat(" removed from comparison"),
                                    })
                                }}>
                                    <TooltipProvider>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <Trash2 size={25} />
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p>Remove from Comparison</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                </div>
                                :
                                <div className="hover:text-primary hover:cursor-pointer" onClick={() => {
                                    if (activeSlugCompare.length < 5) {
                                        addComparison(item.slug, item.name, item.coverUrl);
                                        toast({
                                            title: item.name.concat(" added to comparison"),
                                        });
                                    } else {
                                        toast({
                                            variant: "destructive",
                                            title: "Maximum 5 items can be compared",

                                        });
                                    }
                                }}>
                                    <TooltipProvider>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <div className="flex gap-2 font-bold cursor-pointer">Compare</div>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p>Add to Comparison</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                </div>
                                }
                            </div>



                            <div
                                className={`lg:hidden block absolute top-12 right-4 z-30`}
                            >
                                {activeSlugCompare?.includes(item.slug)?
                                <div onClick={() => {deleteComparison(item.slug),
                                    toast({
                                        title: item.name.concat(" removed from comparison"),
                                    })
                                }}>
                                    <TooltipProvider>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <Trash2 size={25} />
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p>Remove from Comparison</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                </div>
                                :
                                <div  onClick={() => {
                                    if (activeSlugCompare.length < 5) {
                                        addComparison(item.slug, item.name, item.coverUrl);
                                        toast({
                                            title: item.name.concat(" added to comparison"),
                                        });
                                    } else {
                                        toast({
                                            variant: "destructive",
                                            title: "Maximum 5 items can be compared",
                                        });
                                    }
                                }}>
                                    <TooltipProvider>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                            <div className="flex gap-2 font-bold cursor-pointer">Compare</div>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p>Add to Comparison</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                </div>
                                }
                            </div>
                            
                            {/* {activeSlugCompare?.includes(item.slug) &&
                                <div
                                    className={`lg:block hidden absolute top-12 right-4 transform duration-300 ease-in-out ${
                                    hoveredDriver[item.id] ? 'opacity-0' : 'opacity-100'
                                    } z-20`}
                                >
                                    <Check size={25} />
                                </div>
                            } */}
                            <ProductCard key={item.id} data={item} hovered={hoveredDriver[item.id]}/>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default AllDriversProducts;
