import * as React from 'react';
import Link from 'next/link';
import { LazyImage } from '@/components/lazyImage';

interface LogoItem {
  route: string;
  url: string;
}

const darkLogos: LogoItem[] = [
  {
    url: '/images/sbacoustics/facebook.png',
    route: 'https://www.facebook.com/sbacoustics/'
  },
  {
    url: '/images/sbacoustics/instagram.png',
    route: 'https://www.instagram.com/sbacoustics/'
  },
  {
    url: '/images/sbacoustics/x.png',
    route: 'https://twitter.com/sbacoustics_?lang=en'
  },
  {
    url: '/images/sbacoustics/youtube.png',
    route: 'https://www.youtube.com/channel/UC_5Sb3GW88wu_VyJyT0uYqg'
  }
];

export default function FindUs() {
  return (
    <>
      <div className='xl:h-96 lg:h-80 md:h-72 sm:h-72 h-60 w-full flex flex-col justify-center items-start xl:px-16 xl:py-8 lg:px-12 lg:py-6 px-8 py-4 bg-white'>
        <h2 className='sr-only'>Where to Find SB Acoustics</h2>
        <div className="text-left font-bold xl:text-5xl text-3xl text-black py-4">
          Find us in:
        </div>
        <div className='flex justify-start pb-4'>
          {darkLogos.map((logo, index) => (
              <Link target='_blank' href={logo.route} key={index} className='xl:w-20 xl:h-20 md:w-16 md:h-16 w-12 h-12 mr-4 opacity-100'>
                <LazyImage
                  src={logo.url.startsWith('/uploads/') ? `${process.env.NEXT_PUBLIC_ROOT_URL}${logo.url}` : logo.url}
                  alt={`Social Media Logo ${index + 1}`}
                  width={500}
                  height={500}
                />
              </Link>
          ))}
        </div>
      </div>
    </>
  );
}
