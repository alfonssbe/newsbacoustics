"use client"

import React, { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import required modules
import { Navigation, Thumbs, FreeMode } from 'swiper/modules';
import { Card, CardContent } from '../../../../components/ui/card';
import Image from 'next/image';
import { Eye, Loader2 } from 'lucide-react';

import Lightbox from 'yet-another-react-lightbox'
import Zoom from 'yet-another-react-lightbox/plugins/zoom'
import Thumbnails from 'yet-another-react-lightbox/plugins/thumbnails'
import Captions from "yet-another-react-lightbox/plugins/captions"
import 'yet-another-react-lightbox/styles.css'
import 'yet-another-react-lightbox/plugins/thumbnails.css'
import "yet-another-react-lightbox/plugins/captions.css";
import { LazyImageCustom } from '@/components/lazyImageCustom';



type PropType = {
  cover: string,
  alt: string,
  catalogues: string[],
  drawing: string[],
  graph: string[],
}

const SwiperCarouselOneProduct: React.FC<PropType> = (props) => {
    const [lightboxOpen, setLightboxOpen] = useState(false)
    const [lightboxIndex, setLightboxIndex] = useState(0)
  
    const openLightbox = (index: number) => {
      setLightboxIndex(index)
      setLightboxOpen(true)
    }
  
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [hoverImage, setHoverImage] = useState<boolean>(false)
    const { cover, alt, catalogues, drawing, graph } = props

    const [totalCatalgouesOnView, settotalCatalgouesOnView] = useState<number>(4)
    const swiperRef = useRef<SwiperClass | null>(null);
    const [initialized, setInitialized] = useState(false);
    // const [multipleslides, setmultipleslides] = useState(false);

    useEffect(() => {
      const updateSwiperSettings = () => {
        // catalogues && catalogues.length > 0 ? setmultipleslides(true) : setmultipleslides(false)
        cover && catalogues && drawing && graph && (cover.length + catalogues.length + drawing.length + graph.length < 4) ? settotalCatalgouesOnView(3) : settotalCatalgouesOnView(4)
        setInitialized(true); // allow rendering Swiper after settings are correct
      };
  
      updateSwiperSettings();
    }, []);
    
    if (!initialized) return null; // wait until loop/slidesPerView is set correctly

  return (
    <>
      <Swiper
        loop={true}
        pagination={{
          clickable: true,
        }}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        onSlideChange={(swiper) => {
          setActiveIndex(swiper.realIndex)
        }}
        thumbs={{ swiper: thumbsSwiper }}
        navigation={true}
        modules={[Navigation, Thumbs, FreeMode]}
        className="oneproductswiper h-72"
        style={{
          // @ts-ignore
          "--swiper-pagination-color": "#000000",
          "--swiper-navigation-color": "#000000",
          "--swiper-navigation-size": "20px",
        }}
      >
        {cover && (
          <SwiperSlide>
          {/* <Dialog>
            <DialogTrigger asChild> */}
              <div className="h-full flex justify-center items-center cursor-pointer" onClick={() => openLightbox(0)}>
                <Card className="border-none h-full w-full flex items-center justify-center">
                  <CardContent className="p-6 flex items-center justify-center w-full h-full "
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
                            src={cover.startsWith('/uploads/') ? `${process.env.NEXT_PUBLIC_ROOT_URL}${cover}` : cover} 
                            alt={alt} 
                            width={200}
                            height={200}
                            classname={`object-contain h-full w-fit transition-transform duration-300 ${hoverImage ? 'scale-110' : ''}`}
                            lazy={false}
                          />
                        </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
        </SwiperSlide>
        )}
        {catalogues && catalogues.length > 0 && catalogues.map((item, index) => (
          <SwiperSlide key={alt.concat(" - ", index.toString())}>
              <div className="h-full flex justify-center items-center cursor-pointer" onClick={() => openLightbox(index + 1)}>
                <Card className="border-none h-full w-full flex items-center justify-center">
                  <CardContent className="p-6 flex items-center justify-center w-full h-full "
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
                          width={200}
                          height={200}
                          classname={`object-contain h-full w-fit transition-transform duration-300 ${hoverImage ? 'scale-110' : ''}`}
                          lazy={true}
                        />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
          </SwiperSlide>
        ))}
        {drawing && drawing.length > 0 && drawing.map((item, index) => (
          <SwiperSlide key={alt.concat(" - Drawing - ", index.toString())}>
                <div className="h-full flex justify-center items-center cursor-pointer" onClick={() => openLightbox(index + catalogues.length + 1)}>
                  <Card className="border-none h-full w-full flex items-center justify-center">
                    <CardContent className="p-6 flex items-center justify-center w-full h-full "
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
                          alt={alt.concat(" - Drawing")} 
                          width={200}
                          height={200}
                          classname={`object-contain h-full w-fit transition-transform duration-300 ${hoverImage ? 'scale-110' : ''}`}
                          lazy={true}
                        />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
          </SwiperSlide>
        ))}
        {graph && graph.length > 0 && graph.map((item, index) => (
          <SwiperSlide key={alt.concat(" - Frequency Response - ", index.toString())}>
                <div className="h-full flex justify-center items-center cursor-pointer" onClick={() => openLightbox(index + catalogues.length + drawing.length + 1)}>
                  <Card className="border-none h-full w-full flex items-center justify-center">
                    <CardContent className="p-6 flex items-center justify-center w-full h-full "
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
                          alt={alt.concat(" - Frequency Response")} 
                          width={200}
                          height={200}
                          classname={`object-contain h-full w-fit transition-transform duration-300 ${hoverImage ? 'scale-110' : ''}`}
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
      <Swiper
      //@ts-ignore
        onSwiper={setThumbsSwiper}
        loop={true}
        spaceBetween={10}
        slidesPerView={totalCatalgouesOnView}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper h-[100px]"
      >
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
            width={100}
            height={100}
            classname="object-contain w-fit h-full"
            lazy={false}
          />
          </div>
          </div>
        </SwiperSlide>
        {catalogues && catalogues.length > 0 && catalogues.map((item, index) => (
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
              width={100}
              height={100}
              classname="object-contain w-fit h-full"
              lazy={false}
            />
            </div>
            </div>
          </SwiperSlide>
        ))}
        {drawing && drawing.length > 0 && drawing.map((item, index) => (
          <SwiperSlide key={alt.concat(" - Drawing Thumbnail - ", index.toString())} className={`${activeIndex - catalogues.length - 1 === index? "opacity-100": "opacity-50"} h-fit flex items-center justify-center hover:cursor-pointer hover:opacity-100`}
          onClick={() => {
            if (swiperRef.current) {
              // If loop is true, use slideToLoop to account for looped indices
              swiperRef.current.slideToLoop(catalogues.length + 1 + index);
            }
          }}>
            <div className="relative overflow-hidden flex items-center justify-center h-full w-full">
            <div className='z-10 h-[75px]'>
            <LazyImageCustom 
              src={item.startsWith('/uploads/') ? `${process.env.NEXT_PUBLIC_ROOT_URL}${item}` : item} 
              alt={alt.concat(" - Drawing")} 
              width={100}
              height={100}
              classname="object-contain w-fit h-full"
              lazy={false}
            />
            </div>
            </div>
          </SwiperSlide>
        ))}
        {graph && graph.length > 0 && graph.map((item, index) => (
          <SwiperSlide key={alt.concat(" - Frequency Response Thumbnail - ", index.toString())} className={`${activeIndex - catalogues.length - 2 === index? "opacity-100": "opacity-50"} h-fit flex items-center justify-center hover:cursor-pointer hover:opacity-100`}
          onClick={() => {
            if (swiperRef.current) {
              // If loop is true, use slideToLoop to account for looped indices
              swiperRef.current.slideToLoop(catalogues.length + 2 + index);
            }
          }}>
            <div className="relative overflow-hidden flex items-center justify-center h-full w-full">
            <div className='z-10 h-[75px]'>
            <LazyImageCustom 
              src={item.startsWith('/uploads/') ? `${process.env.NEXT_PUBLIC_ROOT_URL}${item}` : item} 
              alt={alt.concat(" - Frequency Response")} 
              width={100}
              height={100}
              classname="object-contain w-fit h-full"
              lazy={false}
            />
            </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        index={lightboxIndex}
        slides=
        {[
          { src: cover.startsWith('/uploads/') ? `${process.env.NEXT_PUBLIC_ROOT_URL}${cover}` : cover, title:alt , description: "Cover", alt },
          ...catalogues.map((item, index) => ({ src: item.startsWith('/uploads/') ? `${process.env.NEXT_PUBLIC_ROOT_URL}${item}` : item, title: alt, description: "Catalogue ".concat((index + 1).toString()), alt: alt })),
          ...drawing.map((item) => ({ src: item.startsWith('/uploads/') ? `${process.env.NEXT_PUBLIC_ROOT_URL}${item}` : item, title:alt , description: "Drawing", alt: alt.concat(" - Drawing") })),
          ...graph.map((item) => ({ src: item.startsWith('/uploads/') ? `${process.env.NEXT_PUBLIC_ROOT_URL}${item}` : item, title: alt, description: "Frequency Response", alt: alt.concat(" - Frequency Response") }))
        ]}
        plugins={[Zoom, Thumbnails, Captions]}
      />
    </>
  );
}

export default SwiperCarouselOneProduct