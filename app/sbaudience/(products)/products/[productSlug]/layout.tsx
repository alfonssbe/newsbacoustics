import getSingleMetadata from "@/app/sbaudience/actions/get-metadata-single-product";
import { SingleProductsSBAudience } from "@/app/types";
import { Metadata, ResolvingMetadata } from "next"

type Props = {
  params: Promise<{ productSlug: string }>
}
 

export async function generateMetadata(props: Props, parent: ResolvingMetadata): Promise<Metadata> {
  const { productSlug = '' } = await props.params
  const baseUrl = process.env.NEXT_PUBLIC_ROOT_URL ?? 'http://localhost:3000';
  const [productResult] = await Promise.allSettled([
    getSingleMetadata('sbaudience', productSlug),
  ]);

  const product: SingleProductsSBAudience = productResult.status === 'fulfilled' ? productResult.value 
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
      id: '',
      nominal_impedance  : '',
      minimum_impedance : '',
      aes_power_handling : '',
      maximum_power_handling : '',
      sensitivity: '',
      frequency_range: '',
      voice_coil_diameter : '',
      winding_material: '',
      former_material: '',
      winding_depth: '',
      magnetic_gap_depth: '',
      flux_density: '',
      magnet: '',
      basket_material : '',
      demodulation: '',
      cone_surround : '',
      net_air_volume_filled_by_driver: '',
      spider_profile: '',
      weather_resistant : '',
      rdc: '',
      recommended_crossover_frequency: '',
      diaphragm_material: '',
      phase_plug_design: '',
      total_exit_angle: '',
      net_air_volume_filled_by_hf_driver: '',
      nominal_throat_diameter: '',
      overall_diameter : '',
      ninety_degrees_mounting_holes_diameter : '',
      depth: '',
      net_weight : '',
      shipping_box : '',
      gross_weight : '',
      replacement_diaphragm: '',
      bolt_circle_diameter : '',
      baffle_cutout_diameter : '',
      mounting_depth : '',
      flange_and_gasket_thickness: '',
      recone_kit : '',
      custom_note: '',
      productId  : '',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    hornSpecification: {
      id: '',
      nominal_coverage_horizontal: '',
      nominal_coverage_vertical: '',
      directivity_factor : '',
      directivity_index  : '',
      sensitivity_on_driver: '',
      frequency_response : '',
      throat_diameter: '',
      minimum_recommended_crossover: '',
      horn_material: '',
      horn_finish: '',
      overall_dimensions_mouth_height: '',
      overall_dimensions_mouth_width: '',
      overall_dimensions_length: '',
      net_weight : '',
      gross_weight : '',
      carton_dimensions: '',
      mechanical_connection_of_driver: '',
      baffle_cutout_dimensions_front_mount_horizontal: '',
      baffle_cutout_dimensions_front_mount_vertical: '',
      custom_note: '',
      productId: '',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    ThieleSpecification: {
      id : '',
      fs: '',
      re : '',
      qes: '',
      qms: '',
      qts: '',
      vas: '',
      sd: '',
      x_max: '',
      xdamage: '',
      mms: '',
      bi: '',
      le: '',
      cms: '',
      rms: '',
      eta_zero: '',
      ebp: '',
      productId  : '',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    isCustom: false,
    isCoax: false,
  };
  const previousImages = (await parent).openGraph?.images || []

  return {
    title: `${product.name} | SB Audience`,
    description: `Found out more about ${product.name} from SB Audience!`,
    applicationName: 'SB Audience',
    keywords: [
      product.name,
      product.slug,
      `${product.size.value}" driver`,
      `${product.size.value} inch driver`
    ],
    openGraph: {
      title: `${product.name} | SB Audience`,
      description: `Found out more about ${product.name} from SB Audience!`,
      url: `${baseUrl}/sbaudience/products/${product.slug}`,
      siteName: "SB Audience",
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
      title: `${product.name} | SB Audience`,
      description: `Found out more about ${product.name} from SB Audience!`,
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
      canonical: `${baseUrl}/sbaudience/products/${product.slug}`,
    },
  }
}

export default function SingleProductLayoutSBAudience({
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