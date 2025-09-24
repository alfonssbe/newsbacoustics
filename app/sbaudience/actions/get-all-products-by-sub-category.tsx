import { AllCategory, AllProductsForHome, CachedAllProducts, Products, Size, Specifications } from "@/app/(sbacoustics)/types";
import { redirect } from "next/navigation";

const API=`${process.env.NEXT_PUBLIC_ROOT_URL}/${process.env.NEXT_PUBLIC_FETCH_ALL_PRODUCTS_BY_SUB_CATEGORY}`;

const getAllProductsBySubCategory = async (path: string, subcategory: string): Promise<CachedAllProducts> => {
  let allProducts: Array<Products> = []

  let allSensitivity: Array<number> = []
  let allAirResonanceFS: Array<number> = []

  let allVoiceCoilDiameter: Array<number> = []
  let domeMaterial: Array<string> = []
  let allImpedance: Array<number> = []
  let allMountingDiameter: Array<number> = []
  let allImpedanceCheckbox: Array<string> = []

  let size = {} as Size;
  let parentSize: Array<number> = []
  let allQFactorQTS: Array<number> = []
  let linearCoilTravelXmax: Array<number> = []
  let Vas: Array<number> = []
  let coneMaterial: Array<string> = []

  const brandId = path.includes('sbaudience') ? process.env.NEXT_PUBLIC_SB_AUDIENCE_ID : process.env.NEXT_PUBLIC_SB_ACOUSTICS_ID
  const API_EDITED_BRANDID = API.replace('{brandId}', brandId ?? '680c5eee-7ed7-41bc-b14b-4185f8a1c379'); //SBAcoustics ID as default
  const API_EDITED = API_EDITED_BRANDID.replace('{productSubCategory}', subcategory)
  const response = await fetch(API_EDITED);
  if (!response.ok) {
    redirect('/');
    // throw new Error(`Failed to fetch products by ${subcategory}`);
  }
  const data = await response.json();
  if (!data) {
    redirect('/');
  }

  for (let i = 0; i < data.length; i++) {
    if(data[i].cover_img.length>0){
      if(subcategory==='tweeters'){
        //Dome Material
        if(data[i].specification.dome_material!=null){
          domeMaterial.push(data[i].specification.dome_material)
        }
        //Impedance
        if(data[i].specification.impedance!=null){
          allImpedanceCheckbox.push(data[i].specification.impedance)
        }
        //Sensitivity
        if(data[i].specification.sensitivity!=null){
          allSensitivity.push(Number(data[i].specification.sensitivity))
        }
        //Air Resonance FS
        if(data[i].specification.free_air_resonance_fs!=null){
          allAirResonanceFS.push(Number(data[i].specification.free_air_resonance_fs))
        }
        //Voice Coil Diameter
        if(data[i].specification.voice_coil_diameter!=null){
          allVoiceCoilDiameter.push(Number(data[i].specification.voice_coil_diameter))
        }
        //Mounting Diameter
        if(data[i].specification.mounting_diameter!=null){
          allMountingDiameter.push(Number(data[i].specification.mounting_diameter))
        }
      }
      else if(subcategory==='coaxials'){
        if(data[i].size!=null){
          let size2: Size = {
            label: data[i].size.value,
            value: Number(data[i].size.name)
          }
          if (!parentSize.some((size) => size === size2.value)) {
            parentSize.push(size2.value);
          }
          size = size2
        }
        //Sensitivity
        if(data[i].specification.sensitivity!=null){
          allSensitivity.push(Number(data[i].specification.sensitivity))
        }
        //Q Factor QTS
        if(data[i].specification.total_q_factor_qts!=null){
          allQFactorQTS.push(Number(data[i].specification.total_q_factor_qts))
        }
        //Linear Coil Travel XMax
        if(data[i].specification.linear_coil_travel_pp!=null){
          linearCoilTravelXmax.push(Number(data[i].specification.linear_coil_travel_pp))
        }
        //Vas
        if(data[i].specification.equivalent_volume_vas!=null){
          Vas.push(Number(data[i].specification.equivalent_volume_vas))
        }
        //Cone Material
        if(data[i].specification.cone_material!=null){
          coneMaterial.push(data[i].specification.cone_material)
        }
        // //Mounting Diameter
        // if(data[i].specification.mounting_diameter!=null){
        //   allMountingDiameter.push(Number(data[i].specification.mounting_diameter))
        // }
      }
      else{
        //Size
        if(data[i].size!=null){
          let size2: Size = {
            label: data[i].size.value,
            value: Number(data[i].size.name)
          }
          if (!parentSize.some((size) => size === size2.value)) {
            parentSize.push(size2.value);
          }
          size = size2
        }
        //Impedance
        if(data[i].specification.impedance!=null){
          allImpedance.push(Number(data[i].specification.impedance))
        }
        //Air Resonance FS
        if(data[i].specification.free_air_resonance_fs!=null){
          allAirResonanceFS.push(Number(data[i].specification.free_air_resonance_fs))
        }
        //Sensitivity
        if(data[i].specification.sensitivity!=null){
          allSensitivity.push(Number(data[i].specification.sensitivity))
        }
        //Q Factor QTS
        if(data[i].specification.total_q_factor_qts!=null){
          allQFactorQTS.push(Number(data[i].specification.total_q_factor_qts))
        }
        //Linear Coil Travel XMax
        if(data[i].specification.linear_coil_travel_pp!=null){
          linearCoilTravelXmax.push(Number(data[i].specification.linear_coil_travel_pp))
        }
        //Vas
        if(data[i].specification.equivalent_volume_vas!=null){
          Vas.push(Number(data[i].specification.equivalent_volume_vas))
        }
        //Cone Material
        if(data[i].specification.cone_material!=null){
          coneMaterial.push(data[i].specification.cone_material)
        }
        // //Mounting Diameter
        // if(data[i].specification.mounting_diameter!=null){
        //   allMountingDiameter.push(Number(data[i].specification.mounting_diameter))
        // }
      }

      

      let specific: Specifications = {
        impedance: data[i].specification.impedance,
        dc_resistance_re: data[i].specification.dc_resistance_re,
        coil_inductance_le: data[i].specification.coil_inductance_le,
        effective_piston_area_sd: data[i].specification.effective_piston_area_sd,
        voice_coil_diameter: data[i].specification.voice_coil_diameter,
        voice_coil_height: data[i].specification.voice_coil_height,
        air_gap_height: data[i].specification.air_gap_height,
        linear_coil_travel_pp: data[i].specification.linear_coil_travel_pp,
        moving_mass_mms: data[i].specification.moving_mass_mms,
        free_air_resonance_fs: data[i].specification.free_air_resonance_fs,
        sensitivity: data[i].specification.sensitivity,
        mechanical_q_factor_qms: data[i].specification.mechanical_q_factor_qms,
        electrical_q_factor_qes: data[i].specification.electrical_q_factor_qes,
        total_q_factor_qts: data[i].specification.total_q_factor_qts,
        force_factor_bi: data[i].specification.force_factor_bi,
        rated_power_handling: data[i].specification.rated_power_handling,
        magnetic_flux_density: data[i].specification.magnetic_flux_density,
        magnet_weight: data[i].specification.magnet_weight,
        net_weight: data[i].specification.net_weight,
        equivalent_volume_vas: data[i].specification.equivalent_volume_vas,
        compliance_cms: data[i].specification.compliance_cms,
        mechanical_loss_rms: data[i].specification.mechanical_loss_rms,
        recommended_frequency_range: data[i].specification.recommended_frequency_range,
        max_mechanical_cone_excursion_xmech: data[i].specification.max_mechanical_cone_excursion_xmech,
        custom_note: data[i].specification.custom_note,
        cone_material: data[i].specification.cone_material,
        dome_material: data[i].specification.dome_material,
        mounting_diameter: data[i].specification.mounting_diameter,
      }
      let product: Products = {
        id: data[i].id,
        coverUrl: data[i].cover_img[0].url,
        CoverAlt: data[i].slug,
        name: data[i].name,
        slug: data[i].slug,
        size: size,
        categories: [],
        sub_categories: [],
        sub_sub_categories: [],
        specification: specific
      }
      allProducts.push(product)
    }
  }

  let allProducts_Final : AllProductsForHome = {
    allProducts,
    allSensitivity,
    allAirResonanceFS,
    allVoiceCoilDiameter,
    allMountingDiameter,
    domeMaterial,
    allImpedance,
    allImpedanceCheckbox,
    allQFactorQTS,
    linearCoilTravelXmax,
    Vas,
    coneMaterial,
  }

  let everything : CachedAllProducts = {
    allproduct: allProducts_Final,
    allsizes: parentSize,
  }

  return everything;
};

export default getAllProductsBySubCategory;

