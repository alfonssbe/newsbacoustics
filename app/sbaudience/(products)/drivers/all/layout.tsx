import { Metadata, ResolvingMetadata } from "next"

export async function generateMetadata(): Promise<Metadata> {
  const baseUrl = process.env.NEXT_PUBLIC_ROOT_URL ?? 'http://localhost:3000';

  // const previousImages = (await parent).openGraph?.images || []
  const logo_URL = `${baseUrl}/images/sbacoustics/logo_sbacoustics_white_clean.webp`

  return {
    title: `All Drivers | SB Acoustics`,
    description: `Found out more about All Drivers from SB Acoustics!`,
    applicationName: 'SB Acoustics',
    keywords: [`All Drivers by SB Acoustics`, `All Drivers`, `SB Acoustics All Drivers`, `All Products by SB Acoustics`],
    openGraph: {
      title: `All Drivers | SB Acoustics`,
      description: `Found out more about All Drivers from SB Acoustics!`,
      url: `${baseUrl}/drivers/all`,
      siteName: "SB Acoustics",
      images: [
        {
          url: logo_URL,
          width: 800,
          height: 800,
          alt: `SB Acoustics Logo`,
        },
      ],
      locale: 'id_ID',
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `All Drivers | SB Acoustics`,
      description: `Found out more about All Drivers from SB Acoustics!`,
      images: [
        {
          url: logo_URL,
          width: 800,
          height: 800,
          alt: `SB Acoustics Logo`,
        },
      ],
    },
    alternates: {
      canonical: `${baseUrl}/drivers/all`,
    },
  }
}

export default function AllProductLayout({
    children,
  }: {
    children: React.ReactNode
  }
)
{
  return(
    <>
      {children}
    </>
  )
  }