"use client";

import OpenSourceKits from './components-homescreen/OpenSourceKits';
import About from './components-homescreen/About';
import Catalogues from './components-homescreen/Catalogues';
import FindUs from './components-homescreen/FindUs';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Loader } from '../../components/ui/loader';
import { Button } from '../../components/ui/button';
import Link from 'next/link';
import BrandChoice from './components-homescreen/BrandChoice';
import { FeaturedProducts } from './types';
import Hero from './components-homescreen/Hero';
import getAllFeaturedProducts from './actions/get-all-featured-products';

export default function LandingPageSBAcousticsClient() {
 const [value, setValue] = useState<FeaturedProducts[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [slideUp, setSlideUp] = useState(false);
  const pathname = usePathname();

  
  useEffect(() => {
    const fetchData = async () => {
      try {
        document.body.style.overflow = 'hidden';
        const featuredData: FeaturedProducts[] = await getAllFeaturedProducts(pathname);
        setValue(featuredData);

        setTimeout(() => {
          requestAnimationFrame(() => {
            setSlideUp(true);
            document.body.style.overflow = '';
            setTimeout(() => {
              setIsLoading(false); 
            }, 700);
          });
        }, 1000);
      } catch (error) {
        console.error('Error fetching featured products:', error);
        setIsLoading(false);
        document.body.style.overflow = '';
      }
    }

    fetchData();
  }, [pathname]);

  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isLoading]);

  return (
    <>
      {isLoading && (
          <div
          className={`fixed top-0 left-0 w-full h-full z-[1000] flex items-center justify-center bg-black transition-transform duration-700 ${
            slideUp ? '-translate-y-full' : 'translate-y-0'
          }`}
        >
          <Loader />
        </div>
      )}
      <div className="relative">
        <h1 className='sr-only'>Welcome to SB Acoustics Official Website!</h1>
        <div className="sticky top-0 left-0 w-full h-screen flex items-center justify-center">
          <Hero featuredProducts={value}/>
        </div>



        <div className="relative min-h-screen">
          <BrandChoice />
        </div>
        <div className="sticky top-0 left-0 w-full h-screen flex items-center justify-center">
          <OpenSourceKits />
        </div>
          
      

        <div className="relative min-h-screen">
            <div className="xl:px-16 xl:pb-8 lg:px-12 lg:pb-6 px-8 pb-4 flex items-end z-50">
              <div className="grid gap-0 grid-cols-1 w-fit">
                <h3 className="text-left font-bold xl:text-5xl text-3xl pb-4 text-black">
                  Open Source Kits
                </h3>
                <div className="text-left text-sm pb-4 hidden md:block text-black">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </div>
                <div className="items-start pb-4">
                  <Button asChild size="sm">
                    <Link href="/kits/open-source-kits">Learn More</Link>
                  </Button>
                </div>
              </div>
            </div>

          <div className="relative min-h-screen">
            <About />
          </div>
        </div>

          <div className="sticky top-0 left-0 w-full h-screen flex items-center justify-center">
            <Catalogues />
          </div>
          <div className="relative">
            <div className="xl:px-16 xl:pb-8 lg:px-12 lg:pb-6 px-8 pb-4 flex items-end z-50">
                <div className="grid gap-0 grid-cols-1 w-fit">
                  <h3 className="text-left font-bold xl:text-5xl text-3xl pb-4 text-black">
                    Catalogues
                  </h3>
                  <div className="text-left text-sm pb-4 hidden md:block text-black">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  </div>
                  <div className="items-start pb-4">
                    <Button size={"sm"} asChild>
                      <Link href={'/catalogues'}>
                        Learn More
                      </Link>
                    </Button>
                  </div>
                </div>
            </div>
            <FindUs />
        </div>
      </div>
    </>
  );
}
