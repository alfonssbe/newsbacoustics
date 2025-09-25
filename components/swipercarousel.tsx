import React, { useRef, useState } from 'react';
import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';

import { Autoplay, Navigation } from 'swiper/modules';
import { FeaturedProducts } from '@/app/types';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Loader2 } from 'lucide-react';

type PropType = {
  slides: FeaturedProducts[];
  mobile: boolean;
};

const SwiperCarousel: React.FC<PropType> = (props) => {
  const { slides, mobile } = props;
  const [realIndex, setRealIndex] = useState(0);
  const swiperRef = useRef<SwiperClass | null>(null);

  return (
    <>
    <div className="absolute top-0 left-0 w-full h-full object-cover bg-white">
      <div className="absolute inset-0 flex items-center justify-center">
        <Loader2 className="animate-spin text-gray-500" size={20} />
      </div>
      <h2 className='sr-only'>SB Acoustics Featured Products</h2>
    {slides && slides.length > 0 && 
    <>
      <Swiper
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        loop={true}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        onSlideChange={(swiper) => {
          const indexAttr = swiper.slides[swiper.activeIndex]?.getAttribute('data-swiper-slide-index');
          const real = indexAttr ? parseInt(indexAttr) : 0;
          setRealIndex(real);
        }}
        slidesPerView={1}
        navigation={!mobile ? true : false}
        modules={[Autoplay, Navigation]}
        className="swiper"
        style={{
          //@ts-ignore
          '--swiper-navigation-color': '#e60013',
        }}
      >
        {slides.map((item, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-screen">
              <img src={item.featuredImgUrl.startsWith('/uploads/') ? `${process.env.NEXT_PUBLIC_ROOT_URL}${item.featuredImgUrl}` : item.featuredImgUrl} alt={item.name} className='w-full h-full object-cover' />

              <div className={`absolute inset-x-0 bottom-0 xl:px-16 xl:py-8 lg:px-12 lg:py-6 px-8 py-4 h-fit flex items-end ${mobile?'bg-linear-to-r from-white/80 to-white/0':'bg-linear-to-t from-black to-transparent'}`}>
                  <div className="grid gap-0 grid-cols-1 w-fit">
                    <h3 className="text-left font-bold xl:text-5xl text-3xl text-foreground pb-4 lg:text-white">
                      {item.name}
                    </h3>
                    <div className="text-left text-sm text-foreground pb-4 hidden md:block lg:text-white">
                      {item.featuredDesc}
                    </div>
                    <div className="items-start pb-4">
                      <Button asChild size={"sm"}>
                        <Link href={`/products/${item.slug}`}>Learn More</Link>
                      </Button>
                    </div>
                  </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
        </Swiper>
    
       <div className="absolute top-[97%] left-1/2 -translate-x-1/2 z-100 flex justify-center gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => swiperRef.current?.slideToLoop(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              realIndex === index ? 'bg-primary scale-125' : 'bg-zinc-700'
            }`}
          ></button>
        ))}
      </div>

      </>
      }
      </div>
    </>
  );
};

export default SwiperCarousel;
