import getSubCatNameBySlug from "@/app/(sbacoustics)/actions/get-SubCat_Name"
import { Metadata, ResolvingMetadata } from "next"

type Props = {
  params: Promise<{ driversSubCategory?: string }>
}


export async function generateMetadata(props: Props, parent: ResolvingMetadata): Promise<Metadata> {
  const { driversSubCategory = '' } = await props.params
  const baseUrl = process.env.NEXT_PUBLIC_ROOT_URL ?? 'http://localhost:3000';
  const [subCatNameResult] = await Promise.allSettled([
    getSubCatNameBySlug("",driversSubCategory),
  ]);

  const subCatName = subCatNameResult.status === 'fulfilled' ? subCatNameResult.value : { name: '' };
  const previousImages = (await parent).openGraph?.images || []
  const logo_URL = `${baseUrl}/images/sbacoustics/logo_sbacoustics_white_clean.webp`

  return {
    title: `${subCatName} | SB Acoustics`,
    description: `Found out more about ${subCatName} from SB Acoustics!`,
    applicationName: 'SB Acoustics',
    keywords: [`${subCatName}`, `${subCatName} SB Acoustics`, `${subCatName} Products by SB Acoustics`],
    openGraph: {
      title: `${subCatName} | SB Acoustics`,
      description: `Found out more about ${subCatName} from SB Acoustics!`,
      url: `${baseUrl}/drivers/${driversSubCategory}`,
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
      title: `${subCatName} | SB Acoustics`,
      description: `Found out more about ${subCatName} from SB Acoustics!`,
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
      canonical: `${baseUrl}/drivers/${driversSubCategory}`,
    },
  }
}

export default function ProductBySubCategoryLayout({
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