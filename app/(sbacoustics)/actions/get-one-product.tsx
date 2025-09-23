import { AllCategory, SingleProducts, Size, Specifications } from "@/app/(sbacoustics)/types";
import { redirect } from "next/navigation";

const API=`${process.env.NEXT_PUBLIC_ROOT_URL}/${process.env.NEXT_PUBLIC_FETCH_ONE_PRODUCT}`;

const getProduct = async (productSlug: string): Promise<SingleProducts> => {
  const API_EDITED = API.replace('{productSlug}', productSlug)
  const response = await fetch(API_EDITED!);
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

  let prod_cat: Array<AllCategory> = []
  let prod_sub_cat: Array<AllCategory> = []
  let prod_sub_sub_cat: Array<AllCategory> = []
  let all_url : Array<string> = []
  let all_drawing_url : Array<string> = []
  let all_graph_url : Array<string> = []
  let all_alt : Array<string> = []
  if (data){
    if(data.allCat){
      for (let i = 0; i < data.allCat.length; i++) {
        let temp: AllCategory = {
          id: data.allCat[i].id,
          name: data.allCat[i].name,
          slug: data.allCat[i].slug
        }
        if(data.allCat[i].type === "Category"){
          if(temp.name === "Kits"){
            kitsProduct = true;
          }
          prod_cat.push(temp)
        }
        else if(data.allCat[i].type === "Sub Category"){
          if(temp.name === "Accessories"){
            counterAccessories = true;
          }
          prod_sub_cat.push(temp)
        }
        else{
          prod_sub_sub_cat.push(temp)
        }
      }
    }

    if(data.images_catalogues!=undefined){
      for(let i = 0; i< data.images_catalogues.length;i++){
        all_url.push(data.images_catalogues[i].url.toString())
        all_alt.push(data.images_catalogues[i].name.toString())
      }
    }
    
    if(data.drawing_img!=undefined){
      for(let i = 0; i< data.drawing_img.length;i++){
        all_drawing_url.push(data.drawing_img[i].url.toString())
      }
    }
    
    if(data.graph_img!=undefined){
      for(let i = 0; i< data.graph_img.length;i++){
        all_graph_url.push(data.graph_img[i].url.toString())
      }
    }

    let size = {} as Size;
    if(data.size!=null){
      let size2: Size = {
        label: data.size.value,
        value: Number(data.size.name)
      }
      size = size2  
    }

    let specific: Specifications = {
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
    }

    if(data.specification){
      specific = {
        impedance: data.specification.impedance,
        dc_resistance_re: data.specification.dc_resistance_re,
        coil_inductance_le: data.specification.coil_inductance_le,
        effective_piston_area_sd: data.specification.effective_piston_area_sd,
        voice_coil_diameter: data.specification.voice_coil_diameter,
        voice_coil_height: data.specification.voice_coil_height,
        air_gap_height: data.specification.air_gap_height,
        linear_coil_travel_pp: data.specification.linear_coil_travel_pp,
        moving_mass_mms: data.specification.moving_mass_mms,
        free_air_resonance_fs: data.specification.free_air_resonance_fs,
        sensitivity: data.specification.sensitivity,
        mechanical_q_factor_qms: data.specification.mechanical_q_factor_qms,
        electrical_q_factor_qes: data.specification.electrical_q_factor_qes,
        total_q_factor_qts: data.specification.total_q_factor_qts,
        force_factor_bi: data.specification.force_factor_bi,
        rated_power_handling: data.specification.rated_power_handling,
        magnetic_flux_density: data.specification.magnetic_flux_density,
        magnet_weight: data.specification.magnet_weight,
        net_weight: data.specification.net_weight,
        equivalent_volume_vas: data.specification.equivalent_volume_vas,
        compliance_cms: data.specification.compliance_cms,
        mechanical_loss_rms: data.specification.mechanical_loss_rms,
        recommended_frequency_range: data.specification.recommended_frequency_range,
        max_mechanical_cone_excursion_xmech: data.specification.max_mechanical_cone_excursion_xmech,
        custom_note: data.specification.custom_note,
        cone_material: data.specification.cone_material,
        dome_material: data.specification.dome_material,
        mounting_diameter: data.specification.mounting_diameter
      }
    }
    
    let alldatasheet : string[] = []
    if(data.datasheet){
      alldatasheet = data.datasheet.map((value: any)=>value.url)
    }
    
    let product: SingleProducts = {
      id: data.id,
      coverUrl: data.cover_img? data.cover_img[0].url: '',
      coverAlt: data.slug,
      images_Catalogues_Url: all_url.length!=0?all_url:[],
      images_Catalogues_Alt: all_alt,
      drawing_Url: all_drawing_url.length!=0?all_drawing_url:[],
      graph_Url: all_graph_url.length!=0?all_graph_url:[],
      name: data.name,
      desc: data.description,
      datasheet: alldatasheet,
      slug: data.slug,
      size: size,
      categories: prod_cat,
      sub_categories: prod_sub_cat,
      sub_sub_categories: prod_sub_sub_cat,
      specification: specific,
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

export default getProduct;

