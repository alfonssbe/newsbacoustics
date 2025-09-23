"use client"

import { Loader2, Search } from "lucide-react"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "./ui/popover"
import { usePathname, useRouter } from "next/navigation"
import { Searchbox } from "../app/(sbacoustics)/types"
import getProductsForSearchbox from "../app/(sbacoustics)/actions/get-product-for-searchbox"
import { Input } from "./ui/input"
import Image from "next/image"
import Link from "next/link"
import Fuse from "fuse.js";
import { FC, useEffect, useRef, useState } from "react"

function normalizeFractions(text: string): string {
  return text
    // normalize Unicode fractions
    .replace(/½/g, "1/2")
    // normalize common patterns (6 1/2, 6-1/2 → 6.5)
    .replace(/(\d+)\s*[- ]?\s*1\/2/g, (_, num) => `${num}.5`);
}

type PropType = {
  mobile: boolean
}

const SearchBox: FC<PropType> = (props) => {
  const { mobile } = props
  const [finalProductSearchbox, setFinalProductSearchbox] = useState<Searchbox[]>([]);
  const router = useRouter();
  const [activeSearch, setactiveSearch] = useState<string>('');
  const [foundProducts, setfoundProducts] = useState<Searchbox[]>([]);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const pathname = usePathname()
  const skipBlurRef = useRef(false);
  
  // Setup Fuse
  const fuse = new Fuse(finalProductSearchbox, {
      keys: [
        { name: "name", weight: 1.0 },
        { name: "size", weight: 0.9 },
        { name: "cat", weight: 0.7 },
        { name: "subcat", weight: 0.8 },
        { name: "subsubcat", weight: 0.8 },
        { name: "productInKits", weight: 0.7 },
      ],
      threshold: 0.15,         // lower = stricter match, higher = looser
      minMatchCharLength: 2,  // require at least 2 chars for match
      ignoreLocation: true,   // ignore location of match
      includeScore: true,     // gives back match score
  });
  
    useEffect(() => {
      const fetchData = async () => {
          try {
              const data : Searchbox[] = await getProductsForSearchbox();
              data.sort((a, b) => a.size[0].localeCompare(b.size[0]))
              setFinalProductSearchbox(data);
              pathname === '/drivers' && localStorage.setItem('allDriversProducts', (data.map(item => item.slug).join(',') + ','))
          } catch (error) {
              console.error('Error fetching data:', error);
          }
      };
      fetchData();
    }, []);

    useEffect(() => {
      pathname === '/drivers' && localStorage.setItem('allDriversProducts', (finalProductSearchbox.map(item => item.slug).join(',') + ','))
    }, [pathname]);


    function searchData(val: string) {
        let select: Searchbox[] = [];
        let selectOEM: Searchbox[] = [];

        // Normalize quotes and lowercase
        let updatedVal = val.replace(/["“”‟″‶〃״˝ʺ˶ˮײ']/g, " inch").trimStart().toLowerCase();
        updatedVal = normalizeFractions(updatedVal)

        // finalProductSearchbox.map((val) => {
        //   val.value.toLowerCase().includes('paper') && console.log(val.label, " - ", val.value)
        // })

        // Run fuzzy search
        const results = updatedVal
            ? fuse.search(updatedVal).map((res) => res.item)
            : finalProductSearchbox;

        // Separate OEM vs non-OEM
        results.forEach((value) => {
            if (value.subcat.map((val) => val.toLowerCase().includes("oem"))) {
            selectOEM.push(value);
            } else {
            select.push(value);
            }
        });

        // Sorting helper
        const sortFn = (a: Searchbox, b: Searchbox) => {
            const numA = parseInt(a.label.match(/^\d+/)?.[0] || "100", 10);
            const numB = parseInt(b.label.match(/^\d+/)?.[0] || "100", 10);

            if (numA !== numB) {
            return numA - numB;
            }
            return a.label.localeCompare(b.label);
        };

        select.sort(sortFn);
        selectOEM.sort(sortFn);

        // Update state
        setfoundProducts([...select, ...selectOEM ]);
    }
  
  useEffect(() => {
    foundProducts.length > 0 &&
    localStorage.setItem('allDriversProducts', (foundProducts.map(item => item.slug).join(',') + ','));
  }, [foundProducts]);

  // Adding event listeners on mount and cleaning up on unmount
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        localStorage.setItem('allDriversProducts', (finalProductSearchbox.map(item => item.slug).join(',') + ','))
        setactiveSearch('')
        inputRef.current?.blur(); // Remove focus from input
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [finalProductSearchbox]);
    

  return (
    <>
    {mobile?
    
      <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
      <PopoverTrigger asChild>
        <Search size={25} className="m-2 hover:cursor-pointer" />
      </PopoverTrigger>
      <PopoverContent className="p-0 lg:hidden bg-transparent w-full mt-4">
        <Input
          ref={inputRef}
          placeholder="Product search..."
          onChange={(event) => {
            setactiveSearch(event.target.value);
            searchData(event.target.value);
          }}
          onBlur={() => {
            if (skipBlurRef.current) {
              skipBlurRef.current = false; // reset
              return; // 👈 skip localStorage update if Enter triggered blur
            }
            setactiveSearch("");
            localStorage.setItem(
              "allDriversProducts",
              finalProductSearchbox.map((item) => item.slug).join(",") + ","
            );
          }}
          value={activeSearch}
          onKeyDown={(event) => {
            if (event.key === "Enter" && activeSearch.trim() !== "") {
              skipBlurRef.current = true; // mark to skip blur
              setIsPopoverOpen(false)
              setactiveSearch("");
              inputRef.current?.blur(); // remove focus
              // router.replace(
              //   `/drivers/all?search=${encodeURIComponent(activeSearch.trim())}`
              // );              
              window.location.href = `/drivers/all?search=${encodeURIComponent(activeSearch.trim())}`;
            }
          }}
          className="focus-visible:ring-0 focus-visible:ring-transparent bg-background w-screen"
        />
      <div className={`${activeSearch.trim() === "" ? 'hidden' : 'block border-2 absolute z-50 bg-background w-full max-h-[400px] overflow-y-auto p-2 rounded-lg'}`}>
        <div className="border-y-2 border-gray-100">
          <div className={`overflow-y-auto`}> 
            {foundProducts.length!=0?
              foundProducts.map((value) => (
                <div
                  key={value.label}
                  className="border-0 block cursor-pointer"
                  onMouseDown={() => {
                    setactiveSearch("");
                    setIsPopoverOpen(false); // Close the popover
                    window.location.href = `/products/${value.slug}`
                  }}
                >                          
                  <div className="p-2 flex border-b-2 border-gray-100 hover:bg-black hover:text-red-500 hover:font-bold">
                  <div className="relative pr-4">
                        <div className="absolute flex items-center justify-center z-[-1] w-10 h-10">
                          <Loader2 className="animate-spin text-gray-500" size={20} />
                        </div>
                        
                        
                          <Image
                            src={value.url.startsWith('/uploads/') ? `${process.env.NEXT_PUBLIC_ROOT_URL}${value.url}` : value.url}
                            alt={value.label}
                            width={100}
                            height={100}
                            className="w-10 h-auto"
                          />
                          
                      </div>
                    <div className="flex flex-col justify-center text-sm">
                      <div className="font-bold">{value.label}</div>
                      <div>{value.info}</div>
                    </div>
                    
                  </div>
                
                </div>
                // </Link>
              ))
              :
              <div>                          
                <div className="p-4 flex justify-center items-center border-b-2 border-gray-100">
                  <div className="text-sm">
                    No products found.
                  </div>
                </div>
              </div>
            }
          </div>
        </div>
      </div>
        </PopoverContent>
      </Popover>
    :
    <>
        {/* <div className="lg:w-[15vw] w-0"> */}
          {/* <div className="flex items-center py-4"> */}
            <Input
              ref={inputRef}
              placeholder="Product search..."
              onChange={(event) => {
                setactiveSearch(event.target.value);
                searchData(event.target.value);
              }}
              onBlur={() => {
                if (skipBlurRef.current) {
                  skipBlurRef.current = false; // reset
                  return; // 👈 skip localStorage update if Enter triggered blur
                }
                setactiveSearch("");
                localStorage.setItem(
                  "allDriversProducts",
                  finalProductSearchbox.map((item) => item.slug).join(",") + ","
                );
              }}
              value={activeSearch}
              onKeyDown={(event) => {
                if (event.key === "Enter" && activeSearch.trim() !== "") {
                  skipBlurRef.current = true; // mark to skip blur
                  setactiveSearch("");
                  inputRef.current?.blur(); // remove focus
                  // router.replace(
                  //   `/drivers/all?search=${encodeURIComponent(activeSearch.trim())}`
                  // );
                  window.location.href = `/drivers/all?search=${encodeURIComponent(activeSearch.trim())}`;
                }
              }}
              className="border-foreground border-2 focus:border-primary focus-visible:ring-0 focus-visible:ring-transparent lg:w-[15vw] w-[10px] focus:w-3/4 focus:top-4 focus:absolute transform transition-all ease-in-out duration-500 focus:z-102 focus:shadow-2xl focus:bg-background shadow-md z-101"
            />
          {/* </div> */}
          <div className={`${activeSearch.trim() === "" ? 'hidden' : 'block border-2 absolute z-50 bg-background lg:w-3/4 w-[10px] top-14 max-h-[400px] overflow-y-auto p-2 rounded-lg shadow-2xl'}`}>
            <div className="border-y-2 border-gray-100">
              <div className={`overflow-y-auto`}> 
                {foundProducts.length!=0?
                  foundProducts.map((value) => (
                    <div
                      key={value.label}
                      className="border-0 block cursor-pointer"
                      onMouseDown={() => {
                        setactiveSearch("");
                        window.location.href = `/products/${value.slug}`
                      }}
                      // href={`/products/${value.slug}`}
                    >                          
                      <div className="p-2 flex border-b-2 border-gray-100 hover:bg-black hover:text-red-500 hover:font-bold hover:rounded-md transfom duration-200">
                      <div className="relative pr-4">
                        <div className="absolute flex items-center justify-center z-[-1] w-10 h-10">
                          <Loader2 className="animate-spin text-gray-500" size={20} />
                        </div>
                        
                        
                          <Image
                            src={value.url.startsWith('/uploads/') ? `${process.env.NEXT_PUBLIC_ROOT_URL}${value.url}` : value.url}
                            alt={value.label}
                            width={100}
                            height={100}
                            className="w-10 h-auto"
                          />
                          
                      </div>
                        <div className="flex flex-col justify-center text-sm">
                          <div className="font-bold">{value.label}</div>
                          <div>{value.info}</div>
                        </div>
                        
                      </div>
                    
                    </div>
                    // </Link>
                  ))
                  :
                  <div>                          
                    <div className="p-4 flex justify-center items-center border-b-2 border-gray-100">
                      <div className="text-sm">
                        No products found.
                      </div>
                    </div>
                  </div>
                }
              </div>
            </div>
          </div>
        {/* </div>    */}
        </>
      }  
    </>
  )
}

export default SearchBox;