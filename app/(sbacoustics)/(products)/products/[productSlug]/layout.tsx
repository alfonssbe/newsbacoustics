import { getMetadataSingleProduct } from "@/app/(sbacoustics)/utils/get-data"
import { Metadata, ResolvingMetadata } from "next"

type Props = {
  params: Promise<{ productSlug: string }>
}
 

export async function generateMetadata(props: Props, parent: ResolvingMetadata): Promise<Metadata> {
  const { productSlug = '' } = await props.params
  const baseUrl = process.env.NEXT_PUBLIC_ROOT_URL ?? 'http://localhost:3000';
  const [productResult] = await Promise.allSettled([
    getMetadataSingleProduct(productSlug),
  ]);

  const product = productResult.status === 'fulfilled' ? productResult.value 
  : 
  {
    id: "",
    coverUrl: "",
    coverAlt: "",
    images_Catalogues_Url: [],
    images_Catalogues_Alt: [],
    drawing_Url: [],
    graph_Url: [],
    name: "",
    desc: "",
    datasheet: [],
    slug: "",
    size: {
      value:0,
      label:'',
    },
    categories: [],
    sub_categories: [],
    sub_sub_categories: [],
    specification: {
      impedance: "",
      dc_resistance_re: "",
      coil_inductance_le: "",
      effective_piston_area_sd: "",
      voice_coil_diameter: "",
      voice_coil_height: "",
      air_gap_height: "",
      linear_coil_travel_pp: "",
      moving_mass_mms: "",
      free_air_resonance_fs: "",
      sensitivity: "",
      mechanical_q_factor_qms: "",
      electrical_q_factor_qes: "",
      total_q_factor_qts: "",
      force_factor_bi: "",
      rated_power_handling: "",
      magnetic_flux_density: "",
      magnet_weight: "",
      net_weight: "",
      equivalent_volume_vas: "",
      compliance_cms: "",
      mechanical_loss_rms: "",
      recommended_frequency_range: "",
      max_mechanical_cone_excursion_xmech: "",
      custom_note: "",
      cone_material: "",
      dome_material: "",
      mounting_diameter: "",
    },
    isKits: false,
    isAccessories: false,
    isCustom: false,
    isCoax: false,
    oemQuantity: ''
  };
  const previousImages = (await parent).openGraph?.images || []

  return {
    title: `${product.name} | SB Acoustics`,
    description: `Found out more about ${product.name} from SB Acoustics!`,
    applicationName: 'SB Acoustics',
    keywords: [
      product.name,
      product.slug,
      `${product.size.value}" driver`,
      `${product.size.value} inch driver`
    ],
    openGraph: {
      title: `${product.name} | SB Acoustics`,
      description: `Found out more about ${product.name} from SB Acoustics!`,
      url: `${baseUrl}/products/${product.slug}`,
      siteName: "SB Acoustics",
      images: [
        {
          url: `${baseUrl}${product.coverUrl}`,
          width: 800,
          height: 800,
          alt: product.name,
        },
        ...previousImages,
      ],
      locale: 'id_ID',
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.name} | SB Acoustics`,
      description: `Found out more about ${product.name} from SB Acoustics!`,
      images: [
        {
          url: `${baseUrl}${product.coverUrl}`,
          width: 800,
          height: 800,
          alt: product.name,
        },
      ],
    },
    alternates: {
      canonical: `${baseUrl}/products/${product.slug}`,
    },
  }
}

export default function SingleProductLayout({
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