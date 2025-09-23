import { Metadata } from "next"

export async function generateMetadata(): Promise<Metadata> {
  const baseUrl = process.env.NEXT_PUBLIC_ROOT_URL ?? 'http://localhost:3000';
  const logo_URL = `${baseUrl}/images/sbacoustics/logo_sbacoustics_white_clean.webp`

  return {
    title: "All Drivers",
    description: "All Drivers Provided by SB Acoustics",
    applicationName: 'SB Acoustics',
    keywords: ["All SB Acoustics Drivers", "All Drivers by SB Acoustics", "All Tweeters by SB Acoustics", "All Widebanders by SB Acoustics", "All Midranges by SB Acoustics", "All Midwoofers by SB Acoustics", "All Woofers by SB Acoustics", "All Full Ranges by SB Acoustics", "All Subwoofers by SB Acoustics", "All Shallow Subwoofers by SB Acoustics", "All Passive Radiators by SB Acoustics", "All Coaxials by SB Acoustics", "All OEM by SB Acoustics"],
    openGraph: {
      title: "All Drivers | SB Acoustics",
      description: "All Drivers Provided by SB Acoustics",
      url: `${baseUrl}/drivers`,
      siteName: "SB Acoustics",
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
          alt: `SB Acoustics Logo`,
        },
      ],
      locale: 'id_ID',
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "All Drivers | SB Acoustics",
      description: "All Drivers Provided by SB Acoustics",
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
      canonical: `${baseUrl}/drivers`,
    },
  }
}

export default function DriversLayout({
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