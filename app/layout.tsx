import { Open_Sans } from 'next/font/google'
import './globals.css'
import React from 'react'
import { Toaster } from '../components/ui/toaster';
import { Metadata, Viewport } from 'next';
import { GoogleAnalytics } from '@next/third-parties/google';
import ScrollToTop from '../components/scrollToTop';
import { ThemeProvider } from './providers/theme-provider';
import ChangeTheme from '../components/setTheme';
import NextTopLoader from 'nextjs-toploader';
import Image from 'next/image';
import Navbar from './(sbacoustics)/components/navbar';
import Footer from '../components/footer';

const font = Open_Sans({ subsets: ['latin'] })

export const viewport : Viewport = {
  width: 'device-width',
  initialScale: 1.0,
  maximumScale: 1,
  userScalable: false,
}

export async function generateMetadata(): Promise<Metadata> {
  const baseUrl = process.env.NEXT_PUBLIC_ROOT_URL ?? 'http://localhost:3000';
  return {
    title: 'SB Acoustics | Building Your Sound',
    description: 'Check out the newest products from the SB Acoustics range! Pro Speakers, Open Source Kits, Full catalogue flipbook and downloadable. Build your dream speakers!',
    keywords: ["SB Acoustics", "SB Acoustics Official Website", "Welcome to SB Acoustics"],
    openGraph: {
      title: 'SB Acoustics | Building Your Sound',
      description: 'Check out the newest products from the SB Acoustics range! Pro Speakers, Open Source Kits, Full catalogue flipbook and downloadable. Build your dream speakers!',
      url: `${baseUrl}`,
      siteName: 'SB Acoustics',
      images: [
        {
          url: `${baseUrl}/images/sbacoustics/logo_sbacoustics_white_clean.webp`,
          width: 1200,
          height: 630,
          alt: 'SB Acoustics Logo',
        },
        {
          url: `${baseUrl}/images/sbacoustics/logo_sbacoustics_white_clean.webp`,
          width: 800,
          height: 800,
          alt: 'SB Acoustics Logo',
        },
      ],
      locale: 'id_ID',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'SB Acoustics | Building Your Sound',
      description: 'Check out the newest products from the SB Acoustics range! Pro Speakers, Open Source Kits, Full catalogue flipbook and downloadable. Build your dream speakers!',
      images: [
        {
          url: `${baseUrl}/images/sbacoustics/logo_sbacoustics_white_clean.webp`,
          width: 800,
          height: 800,
          alt: 'SB Acoustics Logo',
        }
      ],
    },
    alternates: {
      canonical: `${baseUrl}`,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
      },
    },
    icons: {
      icon: `${baseUrl}/favicon.ico`,
      shortcut: `${baseUrl}/favicon.ico`,
      apple: `${baseUrl}/apple-touch-icon.png`,
    },
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const GA_ID = process.env.NEXT_PUBLIC_GA_ID ?? 'G-XYZ'
  return (
    <html lang="en">
      <body 
        className={font.className.concat(" overflow-x-hidden")}
      >
        <ScrollToTop />
        


        <ThemeProvider
          attribute="class"
          themes={["sbacoustics", "sbaudience", "sbautomotive"]}
          enableSystem
        >
          <ChangeTheme>        
              <NextTopLoader color="#e60013" showSpinner={false} />
              {/* PLACEHOLDER BACKGROUND IMAGE PALING BELAKANG */}
              <div className="fixed inset-0 w-screen h-screen bg-black z-[-1]">
                <div className='flex items-center justify-center h-full w-full'>   
                  <Image
                    src='/images/sbacoustics/logo_sbacoustics_white_catchphrase.webp'
                    alt='SB Acoustics Logo'
                    width={1000}
                    height={1000}
                    className="w-1/4"
                    priority
                  /> 
                </div> 
              </div>
                {/* <NavbarBrands /> */}
                <Navbar />
              {/* </div> */}
              <div className="contents">{children}</div>
              <Footer />
          </ChangeTheme>
        </ThemeProvider>



        <Toaster />
      </body>
      <GoogleAnalytics gaId={GA_ID} />
    </html>
  )
}
