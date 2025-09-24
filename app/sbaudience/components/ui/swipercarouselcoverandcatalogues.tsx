"use client"

import React, { useEffect, useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

// import required modules
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import { Card, CardContent } from '../../../../components/ui/card';
import Image from 'next/image';
import { Eye, Loader2 } from 'lucide-react';


import Lightbox from 'yet-another-react-lightbox'
import Zoom from 'yet-another-react-lightbox/plugins/zoom'
import Thumbnails from 'yet-another-react-lightbox/plugins/thumbnails'
import Captions from "yet-another-react-lightbox/plugins/captions";
import 'yet-another-react-lightbox/styles.css'
import 'yet-another-react-lightbox/plugins/thumbnails.css'
import "yet-another-react-lightbox/plugins/captions.css";
import { LazyImageCustom } from '@/components/lazyImageCustom';


type PropType = {
  cover: string,
  alt: string,
  catalogues: string[],
  catalogues_alt: string[],
}

const SwiperCarouselOneProduct: React.FC<PropType> = (props) => {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)

  const openLightbox = (index: number) => {
    setLightboxIndex(index)
    setLightboxOpen(true)
  }

  const [initialized, setInitialized] = useState(false);
  const [multipleslides, setmultipleslides] = useState(false);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [hoverImage, setHoverImage] = useState<boolean>(false)
  const [totalCatalgouesOnView, settotalCatalgouesOnView] = useState<number>(4)
  const { cover, alt, catalogues, catalogues_alt } = props
  const swiperRef = useRef<SwiperClass | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const updateSwiperSettings = () => {
      catalogues && catalogues.length > 0 ? setmultipleslides(true) : setmultipleslides(false)
      cover && catalogues && catalogues.length < 2 ? settotalCatalgouesOnView(2) : cover && catalogues && catalogues.length < 3 ? settotalCatalgouesOnView(3) : settotalCatalgouesOnView(4)
      setInitialized(true); // allow rendering Swiper after settings are correct
    };

    updateSwiperSettings();
  }, []);
  
  if (!initialized) return null; // wait until loop/slidesPerView is set correctly


  return (
    <>

    <div className='lg:px-16 px-10'>
      <Swiper
        style={{//@ts-ignore
          "--swiper-pagination-color": "#000000",
          "--swiper-navigation-color": "#000000",
          "--swiper-navigation-size": "20px",
        }}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        onSlideChange={(swiper) => {
          setActiveIndex(swiper.realIndex)
        }}
        loop={multipleslides}
        spaceBetween={0}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper2 h-full bg-transparent"
      >
        {cover && (
            <SwiperSlide>
                <div className="h-full flex justify-center items-center cursor-zoom-in" onClick={() => openLightbox(0)}>
                  <Card className="border-none h-full w-full flex items-center justify-center">
                    <CardContent className="p-6 flex items-center justify-center w-full h-full"
                      onMouseEnter={() => setHoverImage(true)}
                      onMouseLeave={() => setHoverImage(false)}
                    >
                      <div className="relative overflow-hidden flex items-center justify-center h-full w-full">
                        <div
                          className={`absolute top-0 right-0 transform transition-all duration-300 ease-in-out ${hoverImage ? 'translate-x-0 opacity-100' : 'translate-x-6 opacity-0'} z-20`}
                        >
                          <Eye size={25} />
                        </div>
                        <div className='z-10 h-[200px]'>
                        <LazyImageCustom 
                          src={cover.startsWith('/uploads/') ? `${process.env.NEXT_PUBLIC_ROOT_URL}${cover}` : cover} 
                          alt={alt} 
                          width={500}
                          height={500}
                          classname={`object-cover h-full w-fit transition-transform duration-300 z-10 ${hoverImage ? 'scale-110' : ''}`}
                          lazy={false}
                        />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
          </SwiperSlide>
          )}
          {multipleslides && catalogues.map((item, index) => (
            <SwiperSlide key={alt.concat(" - Catalogues - ", index.toString())}>
                <div className="h-full flex justify-center items-center cursor-zoom-in" onClick={() => openLightbox(index+1)}>
                  <Card className="border-none h-full w-full flex items-center justify-center">
                    <CardContent className="p-6 flex items-center justify-center w-full h-full"
                      onMouseEnter={() => setHoverImage(true)}
                      onMouseLeave={() => setHoverImage(false)}>
                      <div className="relative overflow-hidden flex items-center justify-center h-full w-full">
                      <div
                          className={`absolute top-0 right-0 transform transition-all duration-300 ease-in-out ${hoverImage ? 'translate-x-0 opacity-100' : 'translate-x-6 opacity-0'} z-20`}
                        >
                          <Eye size={25} />
                        </div>
                        <div className='z-10 h-[200px]'>
                          <LazyImageCustom 
                            src={item.startsWith('/uploads/') ? `${process.env.NEXT_PUBLIC_ROOT_URL}${item}` : item} 
                            alt={alt} 
                            width={500}
                            height={500}
                            classname={`object-cover h-full w-fit transition-transform duration-300 ${hoverImage ? 'scale-110' : ''}`}
                            lazy={true}
                          />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
            </SwiperSlide>
          ))}
      </Swiper>
      </div>
      

      {multipleslides &&
      <div className='lg:px-16 px-10'>
      <Swiper
      //@ts-ignore
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={totalCatalgouesOnView}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper"
      >
        {cover && (
          <SwiperSlide className={`${activeIndex === 0? "opacity-100": "opacity-50"} h-fit flex items-center justify-center hover:cursor-pointer hover:opacity-100`}   
          onClick={() => {
            if (swiperRef.current) {
              // If loop is true, use slideToLoop to account for looped indices
              swiperRef.current.slideToLoop(0);
            }
          }}>
            <div className="relative overflow-hidden flex items-center justify-center h-full w-full">
              <div className='z-10 h-[75px]'>
              <LazyImageCustom 
                src={cover.startsWith('/uploads/') ? `${process.env.NEXT_PUBLIC_ROOT_URL}${cover}` : cover} 
                alt={alt} 
                width={1000}
                height={1000}
                classname="object-cover h-full w-fit"
                lazy={false}
              />
              </div>
            </div>
          </SwiperSlide>
        )}
        {multipleslides && catalogues.map((item, index) => (
          <SwiperSlide key={alt.concat(" - Catalogues Thumbnail - ", index.toString())} className={`${activeIndex - 1 === index? "opacity-100": "opacity-50"} h-fit flex items-center justify-center hover:cursor-pointer hover:opacity-100`} 
          onClick={() => {
            if (swiperRef.current) {
              // If loop is true, use slideToLoop to account for looped indices
              swiperRef.current.slideToLoop(index + 1);
            }
          }}>
            <div className="relative overflow-hidden flex items-center justify-center h-full w-full">
              <div className='z-10 h-[75px]'>
                <LazyImageCustom
                  src={item.startsWith('/uploads/') ? `${process.env.NEXT_PUBLIC_ROOT_URL}${item}` : item} 
                  alt={alt} 
                  width={1000}
                  height={1000}
                  classname="object-cover h-full w-fit"
                  lazy={false}
                />
                </div>
              </div>
          </SwiperSlide>
        ))} 
      </Swiper>
      </div>
      }

      {multipleslides ?
        <Lightbox
          open={lightboxOpen}
          close={() => setLightboxOpen(false)}
          index={lightboxIndex}
          slides=
          {[
            { src: cover.startsWith('/uploads/') ? `${process.env.NEXT_PUBLIC_ROOT_URL}${cover}` : cover, title: alt.concat(" - Cover"), alt },
            ...catalogues.map((item, index) => ({ src: item.startsWith('/uploads/') ? `${process.env.NEXT_PUBLIC_ROOT_URL}${item}` : item, title: alt.concat(" - ", catalogues_alt[index] == ''? (index + 1).toString() : catalogues_alt[index]), alt: alt.concat(" - ", catalogues_alt[index] == ''? (index + 1).toString() : catalogues_alt[index])}))
          ]}
          plugins={[Zoom, Thumbnails, Captions]}
        />
        :
        <Lightbox
          open={lightboxOpen}
          close={() => setLightboxOpen(false)}
          index={lightboxIndex}
          slides={[{ src: cover.startsWith('/uploads/') ? `${process.env.NEXT_PUBLIC_ROOT_URL}${cover}` : cover, title: alt.concat(" - Cover"), alt }]}
          plugins={[Zoom, Captions]}
        />
      } 
    </>
  );
}

export default SwiperCarouselOneProduct
