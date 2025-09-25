"use client"

import React, { useEffect, useState } from 'react';
import { FeaturedProducts } from '@/app/types';
import SwiperCarousel from '@/components/swipercarousel';

interface HeroProps {
  featuredProducts: FeaturedProducts[]; // Define the prop type
}

const Hero: React.FC<HeroProps> = ({ featuredProducts }) => {
  const [isLgScreen, setIsLgScreen] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 1024px)');
    const handleResize = (e: MediaQueryListEvent) => {
      setIsLgScreen(e.matches);
    };
    setIsLgScreen(mediaQuery.matches);
    mediaQuery.addEventListener('change', handleResize);
    return () => {
      mediaQuery.removeEventListener('change', handleResize);
    };
  }, []);

  return (
    <div className="top-0 left-0 w-full z-10">
      <SwiperCarousel slides={featuredProducts} mobile={!isLgScreen} />
    </div>
  );
};

export default Hero;
