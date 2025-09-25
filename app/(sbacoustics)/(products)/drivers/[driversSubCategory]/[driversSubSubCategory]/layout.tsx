import getSubCatNameBySlug from "@/app/actions/get-SubCat_Name"
import getSubSubCatNameBySlug from "@/app/actions/get-SubSubCat_Name"
import { Metadata, ResolvingMetadata } from "next"

type Props = {
  params: Promise<{ driversSubCategory: string, driversSubSubCategory: string }>
}

export async function generateMetadata(props: Props, parent: ResolvingMetadata): Promise<Metadata> {
  const { driversSubCategory = '', driversSubSubCategory = '' } = await props.params
  const baseUrl = process.env.NEXT_PUBLIC_ROOT_URL ?? 'http://localhost:3000';
  const [subCatNameResult, subSubCatNameResult] = await Promise.allSettled([
    getSubCatNameBySlug("", driversSubCategory),
    getSubSubCatNameBySlug("", driversSubSubCategory),
  ]);

  const subCatName = subCatNameResult.status === 'fulfilled' ? subCatNameResult.value : { name: '' };
  const subSubCatName = subSubCatNameResult.status === 'fulfilled' ? subSubCatNameResult.value : { name: '' };
  const previousImages = (await parent).openGraph?.images || []
  const logo_URL = `${baseUrl}/images/sbacoustics/logo_sbacoustics_white_clean.webp`

  return {
    title: `${subSubCatName} | SB Acoustics`,
    description: `Found out more about ${subSubCatName} Drivers from SB Acoustics!`,
    applicationName: 'SB Acoustics',
    keywords: [`${subSubCatName}`, `${subSubCatName} SB Acoustics`, `${subSubCatName} Drivers by SB Acoustics`],
    openGraph: {
      title: `${subSubCatName} | SB Acoustics`,
      description: `Found out more about ${subSubCatName} Drivers from SB Acoustics!`,
      url: `${baseUrl}/drivers/${driversSubCategory}/${driversSubSubCategory}`,
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
        ...previousImages,
      ],
      locale: 'id_ID',
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${subSubCatName} | SB Acoustics`,
      description: `Found out more about ${subSubCatName} Drivers from SB Acoustics!`,
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
      canonical: `${baseUrl}/drivers/${driversSubCategory}/${driversSubSubCategory}`,
    },
  }
}

export default function ProductBySubSubCategoryLayout({
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