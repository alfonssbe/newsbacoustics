"use client"

import { usePathname } from 'next/navigation';
import Image from 'next/image'
import Link from 'next/link'
import { Facebook, Instagram, Mail, MapPin, Phone, Youtube } from 'lucide-react'
import { Button } from './ui/button'
import { Separator } from './ui/separator'
import { LazyImageClickable } from '@/components/lazyImageclickable'

export default function Footer() {
  const pathname = usePathname()
  return (
    <footer className="bg-black text-white">
      <h2 className='sr-only'>{pathname.includes('sbaudience') ? "SB Audience Footer Navigation" : "SB Acoustics Footer Navigation"}</h2>
      <div className="w-full xl:px-16 lg:px-12 px-8 py-12">
      <div className="md:grid-cols-2 grid pb-6 items-center justify-center">
            <div className="md:order-2 order-1 flex flex-col items-center md:items-end">
                <div className="w-full max-w-[200px] h-auto rounded-lg shadow-lg transition-transform hover:scale-105">
                  <Link href={pathname.includes('sbaudience') ? '/sbaudience' : '/'}>
                    <LazyImageClickable
                      src={pathname.includes('sbaudience') ? '/images/sbaudience/logo_sbaudience.webp' : '/images/sbacoustics/logo_sbacoustics_white_clean.webp'}
                      alt={pathname.includes('sbaudience') ? "Logo of SB Audience" : "Logo of SB Acoustics"}
                      width={500}
                      height={500}
                    />
                  </Link>
                </div>
            </div>
            <div className='flex flex-col md:order-1 order-2 items-center md:items-start md:pt-0 pt-6'>
              <div className="w-full max-w-[100px] h-auto rounded-lg shadow-lg transition-transform hover:scale-105 md:block flex items-center justify-center">
                <Link href={'https://sinarbajaelectric.com/'} target='_blank'>
                  <LazyImageClickable
                    src={'/images/sbacoustics/logo SBE-white.webp'}
                    alt={"Sinar Baja Electric"}
                    width={500}
                    height={500}
                  />
                </Link>
              </div>
            </div>
            </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 lg:gap-12">


        <div className="flex flex-col space-y-6 items-center md:items-start">
          <ul className="space-y-4 text-center md:text-left">
            <li className="group">
              <h3 className="text-2xl font-bold bg-clip-text text-white">
                Sinar Baja Electric
              </h3>  
            </li>
            <li className="flex items-start justify-center md:justify-start group">
              <MapPin className="mr-2 h-5 w-5 text-primary shrink-0" />
              <span className="text-sm">Jl. Margomulyo No. 5, Tandes, Surabaya, East Java. 60186, Indonesia</span>
            </li>
            <li className="flex items-center justify-center md:justify-start group">
              <Phone className="mr-2 h-5 w-5 text-primary shrink-0" />
              <span className="text-sm">+62 31 748 00 11</span>
            </li>
            <li className="flex items-center justify-center md:justify-start group">
              <Mail className="mr-2 h-5 w-5 text-primary shrink-0" />
              <span className="text-sm">{pathname.includes('sbaudience') ? 'info@sbaudience.com' : 'info@sbacoustics.com'}</span>
            </li>
          </ul>
        </div>


          <div className="flex flex-col md:items-end items-center">
            <h3 className='sr-only'>Stay Connected through SB Acoustics Newsletter</h3>
            <div className="text-lg font-semibold text-primary">Stay Connected</div>
            <p className="text-sm py-4 text-white md:text-right text-center">
              Join our newsletter for the latest updates and exclusive offers.
            </p>
            <Link href={'/newsletter'} className="bg-primary rounded-lg text-sm font-semibold w-fit">
              <Button type="submit" className="bg-primary text-white transition-colors flex items-center">
                Subscribe
                <Mail className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            </div>
        </div>

        <Separator className="my-8 bg-white/20" />

        <div
          className="flex col-span-3 flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0"
        >
          <div className="text-sm text-gray-400 text-center md:text-left w-1/3 md:block hidden">
            © {new Date().getFullYear()} {pathname.includes('sbaudience') ? 'SB Audience' : 'SB Acoustics'}. All rights reserved.
          </div>
          <div className="flex space-x-4 w-1/3 justify-center">
              <Link
                href="https://www.facebook.com/sbacoustics/"
                className="text-gray-400 hover:text-white transition-colors p-2 rounded-full bg-white/10 hover:bg-white/20"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Facebook className="h-5 w-5" />
              </Link>
              <Link
                href="https://www.instagram.com/sbacoustics/"
                className="text-gray-400 hover:text-white transition-colors p-2 rounded-full bg-white/10 hover:bg-white/20"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Instagram className="h-5 w-5" />
              </Link>
              <Link
                href="https://twitter.com/sbacoustics_?lang=en"
                className="text-gray-400 hover:text-white transition-colors p-2 rounded-full bg-white/10 hover:bg-white/20"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="relative w-5 h-5">
                  <Image
                    src="/images/sbacoustics/x-twitter-footer.svg"
                    alt="Twitter / X Logo"
                    fill
                    className="object-contain opacity-70 hover:opacity-100"
                  />
                </div>
              </Link>
              <Link
                href="https://www.youtube.com/channel/UC_5Sb3GW88wu_VyJyT0uYqg"
                className="text-gray-400 hover:text-white transition-colors p-2 rounded-full bg-white/10 hover:bg-white/20"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Youtube className="h-5 w-5" />
              </Link>
          </div>
          <div className="flex space-x-4 text-sm text-gray-400 w-1/3 md:justify-end justify-center  ">
            <Link href="/aboutus" className="hover:text-white transition-colors">
              About Us
            </Link>
            {/* <Link href="/privacy-policy" className="hover:text-white transition-colors fill-transparent">Privacy Policy</Link>
            <Link href="/terms-of-service" className="hover:text-white transition-colors">Terms of Service</Link> */}
          </div>
          
          <div className="text-sm text-gray-400 text-center w-full md:hidden block">
            © {new Date().getFullYear()} {pathname.includes('sbaudience') ? 'SB Audience' : 'SB Acoustics'}. All rights reserved.
          </div>
          </div>
      </div>
    </footer>
  )
}