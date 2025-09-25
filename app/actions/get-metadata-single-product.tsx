import { SingleProducts, Size } from "@/app/types";
import { redirect } from "next/navigation";

const API=`${process.env.NEXT_PUBLIC_ROOT_URL}/${process.env.NEXT_PUBLIC_FETCH_METADATA_SINGLE_PRODUCT}`;

const getSingleMetadata = async (path: string, productSlug: string): Promise<SingleProducts> => {
  const brandId = path.includes('sbaudience') ? process.env.NEXT_PUBLIC_SB_AUDIENCE_ID : process.env.NEXT_PUBLIC_SB_ACOUSTICS_ID
  const API_EDITED_BRANDID = API.replace('{brandId}', brandId ?? '680c5eee-7ed7-41bc-b14b-4185f8a1c379'); //SBAcoustics ID as default
  const API_EDITED = API_EDITED_BRANDID.replace('{productSlug}', productSlug)
  const response = await fetch(API_EDITED);
  if (!response.ok) {
    redirect('/');
    // throw new Error('Failed to fetch one product');
  }
  const data = await response.json();
  if (!data) {
    redirect('/');
  }
  
  let kitsProduct = false;
  let counterAccessories = false;

  let all_url : Array<string> = []
  let all_alt : Array<string> = []
  if (data){
    let size = {} as Size;
    if(data.size!=null){
      let size2: Size = {
        label: data.size.value,
        value: Number(data.size.name)
      }
      size = size2  
    }

    let product: SingleProducts = {
      id: data.id,
      coverUrl: data.cover_img[0].url,
      coverAlt: data.slug,
      images_Catalogues_Url: all_url.length!=0?all_url:[],
      images_Catalogues_Alt: all_alt,
      drawing_Url: [],
      graph_Url: [],
      name: data.name,
      desc: data.description,
      datasheet: [],
      slug: data.slug,
      size: size,
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
        mounting_diameter: ""
      },
      isKits: kitsProduct,
      isAccessories: counterAccessories,
      isCustom: data.isCustom,
      isCoax: data.isCoax,
      oemQuantity: data.oemQuantity
      
    }
    
    return product;
  }
  let product: SingleProducts = {
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
  }
  return product;
};

export default getSingleMetadata;

