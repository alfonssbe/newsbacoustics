import { AllCategory, SingleProducts, SingleProductsSBAudience, Size } from "@/app/types";
import { HornsSpecificationSBAudience, Specification, SpecificationHFSBAudience, SpecificationSBAudience, ThieleSmallParameters } from "@prisma/client";
import { redirect } from "next/navigation";

const API=`${process.env.NEXT_PUBLIC_ROOT_URL}/${process.env.NEXT_PUBLIC_FETCH_ONE_PRODUCT}`;

const getProduct = async (path: string, productSlug: string): Promise<SingleProductsSBAudience> => {
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
          prod_cat.push(temp)
        }
        else if(data.allCat[i].type === "Sub Category"){
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

    let specific: SpecificationSBAudience = {
      id : data.specificationSBAudience?.id ?? "",   
      nominal_impedance : data.specificationSBAudience?.nominal_impedance ?? "",
      minimum_impedance : data.specificationSBAudience?.minimum_impedance ?? "",
      aes_power_handling : data.specificationSBAudience?.aes_power_handling ?? "",
      maximum_power_handling : data.specificationSBAudience?.maximum_power_handling ?? "",
      sensitivity : data.specificationSBAudience?.sensitivity ?? "",
      frequency_range : data.specificationSBAudience?.frequency_range ?? "",
      voice_coil_diameter  : data.specificationSBAudience?.voice_coil_diameter ?? "",
      winding_material : data.specificationSBAudience?.winding_material ?? "",
      former_material : data.specificationSBAudience?.former_material ?? "",
      winding_depth : data.specificationSBAudience?.winding_depth ?? "",
      magnetic_gap_depth : data.specificationSBAudience?.magnetic_gap_depth ?? "",
      flux_density : data.specificationSBAudience?.flux_density ?? "",
      magnet : data.specificationSBAudience?.magnet ?? "",
      basket_material  : data.specificationSBAudience?.basket_material ?? "",
      demodulation : data.specificationSBAudience?.demodulation ?? "",
      cone_surround  : data.specificationSBAudience?.cone_surround ?? "",
      net_air_volume_filled_by_driver : data.specificationSBAudience?.net_air_volume_filled_by_driver ?? "",
      spider_profile : data.specificationSBAudience?.spider_profile ?? "",
      weather_resistant  : data.specificationSBAudience?.weather_resistant ?? "",
      rdc : data.specificationSBAudience?.rdc ?? "",
      recommended_crossover_frequency : data.specificationSBAudience?.recommended_crossover_frequency ?? "",
      diaphragm_material : data.specificationSBAudience?.diaphragm_material ?? "",
      phase_plug_design : data.specificationSBAudience?.phase_plug_design ?? "",
      total_exit_angle : data.specificationSBAudience?.total_exit_angle ?? "",
      net_air_volume_filled_by_hf_driver : data.specificationSBAudience?.net_air_volume_filled_by_hf_driver ?? "",
      nominal_throat_diameter : data.specificationSBAudience?.nominal_throat_diameter ?? "",
      overall_diameter  : data.specificationSBAudience?.overall_diameter ?? "",
      ninety_degrees_mounting_holes_diameter  : data.specificationSBAudience?.ninety_degrees_mounting_holes_diameter ?? "",
      depth : data.specificationSBAudience?.depth ?? "",
      net_weight  : data.specificationSBAudience?.net_weight ?? "",
      shipping_box  : data.specificationSBAudience?.shipping_box ?? "",
      gross_weight  : data.specificationSBAudience?.gross_weight ?? "",
      replacement_diaphragm : data.specificationSBAudience?.replacement_diaphragm ?? "",
      bolt_circle_diameter  : data.specificationSBAudience?.bolt_circle_diameter ?? "",
      baffle_cutout_diameter  : data.specificationSBAudience?.baffle_cutout_diameter ?? "",
      mounting_depth  : data.specificationSBAudience?.mounting_depth ?? "",
      flange_and_gasket_thickness : data.specificationSBAudience?.flange_and_gasket_thickness ?? "",
      recone_kit  : data.specificationSBAudience?.recone_kit ?? "",
      custom_note : data.specificationSBAudience?.custom_note ?? "", 
      productId   : data.specificationSBAudience?.productId ?? "",  
      createdAt   : new Date(),
      updatedAt   : new Date(),      
    }

    let hornspecific: HornsSpecificationSBAudience = {
      id : data.hornsspecificationSBAudience?.id ?? "",   
      nominal_coverage_horizontal: data.hornsspecificationSBAudience?.nominal_coverage_horizontal ?? "",
      nominal_coverage_vertical: data.hornsspecificationSBAudience?.nominal_coverage_vertical ?? "",
      directivity_factor : data.hornsspecificationSBAudience?.directivity_factor ?? "",
      directivity_index  : data.hornsspecificationSBAudience?.directivity_index ?? "",
      sensitivity_on_driver: data.hornsspecificationSBAudience?.sensitivity_on_driver ?? "",
      frequency_response : data.hornsspecificationSBAudience?.frequency_response ?? "",
      throat_diameter: data.hornsspecificationSBAudience?.throat_diameter ?? "",
      minimum_recommended_crossover: data.hornsspecificationSBAudience?.minimum_recommended_crossover ?? "",
      horn_material: data.hornsspecificationSBAudience?.horn_material ?? "",
      horn_finish: data.hornsspecificationSBAudience?.horn_finish ?? "",
      overall_dimensions_mouth_height: data.hornsspecificationSBAudience?.overall_dimensions_mouth_height ?? "",
      overall_dimensions_mouth_width: data.hornsspecificationSBAudience?.overall_dimensions_mouth_width ?? "",
      overall_dimensions_length: data.hornsspecificationSBAudience?.overall_dimensions_length ?? "",
      net_weight : data.hornsspecificationSBAudience?.net_weight ?? "",
      gross_weight : data.hornsspecificationSBAudience?.gross_weight ?? "",
      carton_dimensions: data.hornsspecificationSBAudience?.carton_dimensions ?? "",
      mechanical_connection_of_driver: data.hornsspecificationSBAudience?.mechanical_connection_of_driver ?? "",
      baffle_cutout_dimensions_front_mount_horizontal: data.hornsspecificationSBAudience?.baffle_cutout_dimensions_front_mount_horizontal ?? "",
      baffle_cutout_dimensions_front_mount_vertical: data.hornsspecificationSBAudience?.baffle_cutout_dimensions_front_mount_vertical ?? "",
      custom_note: data.hornsspecificationSBAudience?.custom_note ?? "",
      productId  : data.hornsspecificationSBAudience?.productId ?? "",
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    
    let thielepecific: ThieleSmallParameters = {
      id : data.thieleSmallParametersSBAudience?.id ?? "",   
      fs  : data.thieleSmallParametersSBAudience?.fs ?? "",
      re   : data.thieleSmallParametersSBAudience?.re ?? "",
      qes  : data.thieleSmallParametersSBAudience?.qes ?? "",
      qms  : data.thieleSmallParametersSBAudience?.qms ?? "",
      qts  : data.thieleSmallParametersSBAudience?.qts ?? "",
      vas  : data.thieleSmallParametersSBAudience?.vas ?? "",
      sd  : data.thieleSmallParametersSBAudience?.sd ?? "",
      x_max  : data.thieleSmallParametersSBAudience?.x_max ?? "",
      xdamage  : data.thieleSmallParametersSBAudience?.xdamage ?? "",
      mms  : data.thieleSmallParametersSBAudience?.mms ?? "",
      bi  : data.thieleSmallParametersSBAudience?.bi ?? "",
      le  : data.thieleSmallParametersSBAudience?.le ?? "",
      cms  : data.thieleSmallParametersSBAudience?.cms ?? "",
      rms  : data.thieleSmallParametersSBAudience?.rms ?? "",
      eta_zero  : data.thieleSmallParametersSBAudience?.eta_zero ?? "",
      ebp  : data.thieleSmallParametersSBAudience?.ebp ?? "",
      productId  : data.thieleSmallParametersSBAudience?.productId ?? "",
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    
    let hfspecific: SpecificationHFSBAudience = {
      id : data.SpecificationHFSBAudience?.id ?? "",
      nominal_impedance  : data.SpecificationHFSBAudience?.nominal_impedance ?? "",
      minimum_impedance : data.SpecificationHFSBAudience?.minimum_impedance ?? "",
      aes_power_handling : data.SpecificationHFSBAudience?.aes_power_handling ?? "",
      maximum_power_handling : data.SpecificationHFSBAudience?.maximum_power_handling ?? "",
      sensitivity: data.SpecificationHFSBAudience?.sensitivity ?? "",
      frequency_range: data.SpecificationHFSBAudience?.frequency_range ?? "",
      voice_coil_diameter : data.SpecificationHFSBAudience?.voice_coil_diameter ?? "",
      winding_material: data.SpecificationHFSBAudience?.winding_material ?? "",
      former_material: data.SpecificationHFSBAudience?.former_material ?? "",
      winding_depth: data.SpecificationHFSBAudience?.winding_depth ?? "",
      magnetic_gap_depth: data.SpecificationHFSBAudience?.magnetic_gap_depth ?? "",
      flux_density: data.SpecificationHFSBAudience?.flux_density ?? "",
      magnet: data.SpecificationHFSBAudience?.magnet ?? "",
      basket_material : data.SpecificationHFSBAudience?.basket_material ?? "",
      demodulation: data.SpecificationHFSBAudience?.demodulation ?? "",
      cone_surround : data.SpecificationHFSBAudience?.cone_surround ?? "",
      productId: data.SpecificationHFSBAudience?.productId ?? "", 
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    
    let alldatasheet : string[] = []
    if(data.datasheet){
      alldatasheet = data.datasheet.map((value: any)=>value.url)
    }
    
    let product: SingleProductsSBAudience = {
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
      hornSpecification: hornspecific,
      ThieleSpecification: thielepecific,
      hfspecification: hfspecific,
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
    hfspecification: {
      id : '',
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
      productId: '', 
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    isCustom: false,
    isCoax: false,
  }
  return product;
};

export default getProduct;

