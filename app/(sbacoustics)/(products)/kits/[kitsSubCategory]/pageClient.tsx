"use client"

import getAllProductsBySubCategory from '@/app/(sbacoustics)/actions/get-all-products-by-sub-category';
import { useEffect, useState } from 'react';
import { CachedAllProducts } from '@/app/types';
import { Loader } from '@/components/ui/loader';
import { usePathname } from 'next/navigation';
import AllDriversProducts from '../../components-all-drivers-page/all-product';

type Props = {
  params: Promise<{ kitsSubCategory?: string }>
}

export default function KitsByCategoryPageClient(props: Props) { 
  const [allproduct, setAllProducts] = useState<CachedAllProducts>()
  const [loading, setLoading] = useState<boolean>(true)
  const [slideUp, setSlideUp] = useState(false);
  const pathname = usePathname();
  useEffect(() => {
    
    const fetchData = async () => {
      try {
        const { kitsSubCategory = '' } = await props.params;
        document.body.style.overflow = 'hidden';
        let tempData = await getAllProductsBySubCategory(pathname, kitsSubCategory);
        setAllProducts(tempData)

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

  return(
    <>
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
      <div className="md:grid lg:grid-cols-4 md:grid-cols-3">
        {allproduct && <AllDriversProducts allActiveSliderVal={[]} allActiveCheckboxVal={[]} products={allproduct.allproduct.allProducts}/>}
      </div>
    </div>
    </>
  );
}
