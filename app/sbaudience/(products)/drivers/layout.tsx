import { Metadata } from "next"

export async function generateMetadata(): Promise<Metadata> {
  const baseUrl = process.env.NEXT_PUBLIC_ROOT_URL ?? 'http://localhost:3000';
  const logo_URL = `${baseUrl}/images/sbaudience/logo_sbaudience.webp`

  return {
    title: "All Drivers",
    description: "All Drivers Provided by SB Audience",
    applicationName: 'SB Audience',
    keywords: ["All SB Audience Drivers", "All Drivers by SB Audience", "All Compression Drivers by SB Audience", "All Woofers by SB Audience", "All Subwoofers by SB Audience", "All Open Baffle Drivers by SB Audience", "All Coaxials by SB Audience", "All Horns by SB Audience"],
    openGraph: {
      title: "All Drivers | SB Audience",
      description: "All Drivers Provided by SB Audience",
      url: `${baseUrl}/sbaudience/drivers`,
      siteName: "SB Audience",
      images: [
        // {
        //   url: logo_URL,
        //   width: 1200,
        //   height: 630,
        //   alt: subCatName.name.concat(" ", seriesName.name," Series"),
        // },
        {
          url: logo_URL,
          width: 800,
          height: 800,
          alt: `SB Audience Logo`,
        },
      ],
      locale: 'id_ID',
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "All Drivers | SB Audience",
      description: "All Drivers Provided by SB Audience",
      images: [
        {
          url: logo_URL,
          width: 800,
          height: 800,
          alt: `SB Audience Logo`,
        },
      ],
    },
    alternates: {
      canonical: `${baseUrl}/sbaudience/drivers`,
    },
  }
}

export default function DriversLayoutSBAudience({
    children,
  }: {
    children: React.ReactNode
  }) {

    return(
        <>
          {children}
        </>
    )
}