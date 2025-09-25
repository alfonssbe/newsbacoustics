import { SingleProducts, SingleProductsSBAudience, Size } from "@/app/types";
import { redirect } from "next/navigation";

const API=`${process.env.NEXT_PUBLIC_ROOT_URL}/${process.env.NEXT_PUBLIC_FETCH_METADATA_SINGLE_PRODUCT}`;

const getSingleMetadata = async (path: string, productSlug: string): Promise<SingleProductsSBAudience> => {
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

    let product: SingleProductsSBAudience = {
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
        id : '',   
        nominal_impedance : '',
        minimum_impedance : '',
        aes_power_handling : '',
        maximum_power_handling : '',
        sensitivity : '',
        frequency_range : '',
        voice_coil_diameter  : '',
        winding_material : '',
        former_material : '',
        winding_depth : '',
        magnetic_gap_depth : '',
        flux_density : '',
        magnet : '',
        basket_material  : '',
        demodulation : '',
        cone_surround  : '',
        net_air_volume_filled_by_driver : '',
        spider_profile : '',
        weather_resistant  : '',
        rdc : '',
        recommended_crossover_frequency : '',
        diaphragm_material : '',
        phase_plug_design : '',
        total_exit_angle : '',
        net_air_volume_filled_by_hf_driver : '',
        nominal_throat_diameter : '',
        overall_diameter  : '',
        ninety_degrees_mounting_holes_diameter  : '',
        depth : '',
        net_weight  : '',
        shipping_box  : '',
        gross_weight  : '',
        replacement_diaphragm : '',
        bolt_circle_diameter  : '',
        baffle_cutout_diameter  : '',
        mounting_depth  : '',
        flange_and_gasket_thickness : '',
        recone_kit  : '',
        custom_note : '', 
        productId   : '',  
        createdAt   : new Date(),
        updatedAt   : new Date(),
      },
      isCustom: data.isCustom,
      isCoax: data.isCoax,      
    }
    
    return product;
  }
  let product: SingleProductsSBAudience = {
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
      id : '',   
      nominal_impedance : '',
      minimum_impedance : '',
      aes_power_handling : '',
      maximum_power_handling : '',
      sensitivity : '',
      frequency_range : '',
      voice_coil_diameter  : '',
      winding_material : '',
      former_material : '',
      winding_depth : '',
      magnetic_gap_depth : '',
      flux_density : '',
      magnet : '',
      basket_material  : '',
      demodulation : '',
      cone_surround  : '',
      net_air_volume_filled_by_driver : '',
      spider_profile : '',
      weather_resistant  : '',
      rdc : '',
      recommended_crossover_frequency : '',
      diaphragm_material : '',
      phase_plug_design : '',
      total_exit_angle : '',
      net_air_volume_filled_by_hf_driver : '',
      nominal_throat_diameter : '',
      overall_diameter  : '',
      ninety_degrees_mounting_holes_diameter  : '',
      depth : '',
      net_weight  : '',
      shipping_box  : '',
      gross_weight  : '',
      replacement_diaphragm : '',
      bolt_circle_diameter  : '',
      baffle_cutout_diameter  : '',
      mounting_depth  : '',
      flange_and_gasket_thickness : '',
      recone_kit  : '',
      custom_note : '', 
      productId   : '',  
      createdAt   : new Date(),
      updatedAt   : new Date(),
    },
    isCustom: false,
    isCoax: false,
  }
  return product;
};

export default getSingleMetadata;

