"use client"

import Link from 'next/link';
import NoResults from '@/components/ui/no-results';
import { NewProduct } from '../types';
import getAllNewProducts from '../actions/get-all-new-products';
import { useEffect, useState } from 'react';
import { Loader } from '../../../components/ui/loader';
import { LazyImageClickable } from '@/components/lazyImageclickable';
import { usePathname } from 'next/navigation';


const NewProductsPageClient = () => {
  const [data, setData] = useState<NewProduct[]>([]);
  const [dataKits, setDataKits] = useState<NewProduct[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [slideUp, setSlideUp] = useState(false);    // Track slide-up state
  const pathname = usePathname()

  useEffect(() => {
    const fetchData = async () => {
      try {
        document.body.style.overflow = 'hidden';
        let tempData = await getAllNewProducts(pathname);
        setData(tempData[0])
        setDataKits(tempData[1])

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

    fetchData();
  }, []); 

  if(!data){return null}

  return(
    <div className="2xl:px-60 xl:px-40 xl:py-8 lg:py-6 lg:px-12 px-8 py-4">
     {loading && (
          <div
            className={`fixed top-0 left-0 w-full h-full z-[1000] flex items-center justify-center bg-black transition-transform duration-700 ${
              slideUp ? '-translate-y-full' : 'translate-y-0'
            }`}
          >
            <Loader />
          </div>
        )}
        <h1 className='sr-only'>New Products | SB Acoustics</h1>
        {data && data.length !== 0 && dataKits && dataKits.length !== 0 ? (
        <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {data && data.length !== 0 && data.map((item, i) => (
            <div key={i} className="py-4 px-2">
              <Link href={item.href} className="bg-white group cursor-pointer space-y-4">
                <div className="flex flex-col items-center justify-center text-center relative p-4" style={{ aspectRatio: "1/1" }}>
                  <LazyImageClickable
                    src={item.image_url.startsWith('/uploads/') ? `${process.env.NEXT_PUBLIC_ROOT_URL}${item.image_url}` : item.image_url} 
                    alt={item.name} 
                    width={500}
                    height={500}
                  />
                </div>
                <div className="flex flex-col items-center">
                  <h2 className="text-lg lg:text-xl font-bold text-center pb-2 z-10">
                    {item.name}
                  </h2>
                </div>
              </Link>
            </div>
          ))}
          {dataKits && dataKits.length !== 0 && dataKits.map((item, i) => (
            <div key={i} className="py-4 px-2">
              <Link href={item.href} className="bg-white group cursor-pointer space-y-4">
                 <div className="flex flex-col items-center justify-center text-center relative p-4" style={{ aspectRatio: "1/1" }}>
                  <LazyImageClickable
                    src={item.image_url.startsWith('/uploads/') ? `${process.env.NEXT_PUBLIC_ROOT_URL}${item.image_url}` : item.image_url} 
                    alt={item.name} 
                    width={500}
                    height={500}
                  />
                </div>
                <div className="flex flex-col items-center">
                  <h2 className="text-lg lg:text-xl font-bold text-center pb-2 z-10">
                    {item.name}
                  </h2>
                </div>
              </Link>
            </div>
          ))}
        </div>
        
      ) : (
        <div className="flex self-center text-center items-center origin-center object-center justify-center content-center">
          <NoResults />
        </div>
      )}
    </div>
  );
}

export default NewProductsPageClient;
