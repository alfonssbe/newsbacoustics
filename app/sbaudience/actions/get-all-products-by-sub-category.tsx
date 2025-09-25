import { AllProductsForHome, AllProductsSBAudienceForHome, CachedAllProducts, Products, ProductsSBAudience, Size } from "@/app/types";
import { HornsSpecificationSBAudience, Specification, SpecificationSBAudience, ThieleSmallParameters } from "@prisma/client";
import { redirect } from "next/navigation";

const API=`${process.env.NEXT_PUBLIC_ROOT_URL}/${process.env.NEXT_PUBLIC_FETCH_ALL_PRODUCTS_BY_SUB_CATEGORY}`;

const getAllProductsBySubCategory = async (path: string, subcategory: string): Promise<AllProductsSBAudienceForHome> => {
  let allProducts: Array<ProductsSBAudience> = []

  let allImpedance: Array<number> = []
  let allMaxPower: Array<number> = []
  let allSensitivity: Array<number> = []
  let allVoiceCoilDiameter: Array<number> = []
  let allDiaphragmMaterial: Array<string> = []
  let allMagnetMaterial: Array<string> = []
  let allNominalThroatDiameter: Array<number> = []


  let allFS: Array<number> = []
  let allQTS: Array<number> = []
  let allXmax: Array<number> = []
  let allMms: Array<number> = []

  let allNominalCoverageHorizontal: Array<number> = []
  let allNominalCoverageVertical: Array<number> = []
  let allDirectivityFactor: Array<number> = []
  let allDirectivityIndex: Array<number> = []
  let allThroatDiameter: Array<number> = []
  let allMinimumRecommendedCrossover: Array<number> = []
  let allMechanicalConnectionofDriver: Array<string> = []
  let allBaffleCutoutDimensionsHorizontal: Array<number> = []
  let allBaffleCutoutDimensionsVertical: Array<number> = []

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
      if(subcategory==='compression-drivers'){
        //Impedance
        if(data[i].specificationSBAudience && data[i].specificationSBAudience.nominal_impedance!=null){
          allImpedance.push(data[i].specificationSBAudience.nominal_impedance)
        }
        //Max Power
        if(data[i].specificationSBAudience && data[i].specificationSBAudience.maximum_power_handling!=null){
          allMaxPower.push(data[i].specificationSBAudience.maximum_power_handling)
        }
        //Sensitivity
        if(data[i].specificationSBAudience && data[i].specificationSBAudience.sensitivity!=null){
          allSensitivity.push(Number(data[i].specificationSBAudience.sensitivity))
        }
        //Voice Coil Diameter
        if(data[i].specificationSBAudience && data[i].specificationSBAudience.voice_coil_diameter!=null){
          allVoiceCoilDiameter.push(Number(data[i].specificationSBAudience.voice_coil_diameter))
        }
        //Diaphragm Material
        if(data[i].specificationSBAudience && data[i].specificationSBAudience.diaphragm_material!=null){
          allDiaphragmMaterial.push(data[i].specificationSBAudience.diaphragm_material)
        }
        //Magnet Material
        if(data[i].specificationSBAudience && data[i].specificationSBAudience.magnet!=null){
          allMagnetMaterial.push(data[i].specificationSBAudience.magnet)
        }
        //Nominal Throat Diameter
        if(data[i].specificationSBAudience && data[i].specificationSBAudience.nominal_throat_diameter!=null){
          allNominalThroatDiameter.push(Number(data[i].specificationSBAudience.nominal_throat_diameter))
        }
      }
      else if(subcategory==='horn'){
        console.log(data[i])
        // if(data[i].size!=null){
        //   let size2: Size = {
        //     label: data[i].size.value,
        //     value: Number(data[i].size.name)
        //   }
        //   if (!parentSize.some((size) => size === size2.value)) {
        //     parentSize.push(size2.value);
        //   }
        //   size = size2
        // }
        // Nominal Coverage Horizontal
        if(data[i].hornsspecificationSBAudience && data[i].hornsspecificationSBAudience.nominal_coverage_horizontal!=null){
          allNominalCoverageHorizontal.push(Number(data[i].hornsspecificationSBAudience.nominal_coverage_horizontal))
        }
        // Nominal Coverage Vertical
        if(data[i].hornsspecificationSBAudience && data[i].hornsspecificationSBAudience.nominal_coverage_vertical!=null){
          allNominalCoverageVertical.push(Number(data[i].hornsspecificationSBAudience.nominal_coverage_vertical))
        }
        // Directivity Factor
        if(data[i].hornsspecificationSBAudience && data[i].hornsspecificationSBAudience.directivity_factor!=null){
          allDirectivityFactor.push(Number(data[i].hornsspecificationSBAudience.directivity_factor))
        }
        // Directivity Index
        if(data[i].hornsspecificationSBAudience && data[i].hornsspecificationSBAudience.directivity_index!=null){
          allDirectivityIndex.push(Number(data[i].hornsspecificationSBAudience.directivity_index))
        }
        // Throat Diameter
        if(data[i].hornsspecificationSBAudience && data[i].hornsspecificationSBAudience.throat_diameter!=null){
          allThroatDiameter.push(Number(data[i].hornsspecificationSBAudience.throat_diameter))
        }
        // minimum Recommended Crossover
        if(data[i].hornsspecificationSBAudience && data[i].hornsspecificationSBAudience.minimum_recommended_crossover!=null){
          allMinimumRecommendedCrossover.push(Number(data[i].hornsspecificationSBAudience.minimum_recommended_crossover))
        }
        // Mechanical Connection of Driver
        if(data[i].hornsspecificationSBAudience && data[i].hornsspecificationSBAudience.mechanical_connection_of_driver!=null){
          allMechanicalConnectionofDriver.push(data[i].hornsspecificationSBAudience.mechanical_connection_of_driver)
        }
        // Baffle Cutout Dimensions Horizontal
        if(data[i].hornsspecificationSBAudience && data[i].hornsspecificationSBAudience.baffle_cutout_dimensions_front_mount_horizontal!=null){
          allBaffleCutoutDimensionsHorizontal.push(Number(data[i].hornsspecificationSBAudience.baffle_cutout_dimensions_front_mount_horizontal))
        }
        // Baffle Cutout Dimensions Vertical
        if(data[i].hornsspecificationSBAudience && data[i].hornsspecificationSBAudience.baffle_cutout_dimensions_front_mount_vertical!=null){
          allBaffleCutoutDimensionsVertical.push(Number(data[i].hornsspecificationSBAudience.baffle_cutout_dimensions_front_mount_vertical))
        }
        // Sensitivity
        if(data[i].hornsspecificationSBAudience && data[i].hornsspecificationSBAudience.sensitivity_on_driver!=null){
          allSensitivity.push(Number(data[i].hornsspecificationSBAudience.sensitivity_on_driver))
        }
      }
      else{
        // FS
        if(data[i].thieleSmallParametersSBAudience && data[i].thieleSmallParametersSBAudience.fs!=null){
          allFS.push(Number(data[i].thieleSmallParametersSBAudience.fs))
        }
        // QTS
        if(data[i].thieleSmallParametersSBAudience && data[i].thieleSmallParametersSBAudience.qts!=null){
          allQTS.push(Number(data[i].thieleSmallParametersSBAudience.qts))
        }
        // XMAX
        if(data[i].thieleSmallParametersSBAudience && data[i].thieleSmallParametersSBAudience.x_max!=null){
          allXmax.push(Number(data[i].thieleSmallParametersSBAudience.x_max))
        }
        // MMS
        if(data[i].thieleSmallParametersSBAudience && data[i].thieleSmallParametersSBAudience.mms!=null){
          allMms.push(Number(data[i].thieleSmallParametersSBAudience.mms))
        }
        // Sensitivity
        if(data[i].specificationSBAudience && data[i].specificationSBAudience.sensitivity!=null){
          allSensitivity.push(Number(data[i].specificationSBAudience.sensitivity))
        }
      }
  
      let specific: SpecificationSBAudience = {
        id : data[i].specificationSBAudience?.id ?? "",   
        nominal_impedance : data[i].specificationSBAudience?.nominal_impedance ?? "",
        minimum_impedance : data[i].specificationSBAudience?.minimum_impedance ?? "",
        aes_power_handling : data[i].specificationSBAudience?.aes_power_handling ?? "",
        maximum_power_handling : data[i].specificationSBAudience?.maximum_power_handling ?? "",
        sensitivity : data[i].specificationSBAudience?.sensitivity ?? "",
        frequency_range : data[i].specificationSBAudience?.frequency_range ?? "",
        voice_coil_diameter  : data[i].specificationSBAudience?.voice_coil_diameter ?? "",
        winding_material : data[i].specificationSBAudience?.winding_material ?? "",
        former_material : data[i].specificationSBAudience?.former_material ?? "",
        winding_depth : data[i].specificationSBAudience?.winding_depth ?? "",
        magnetic_gap_depth : data[i].specificationSBAudience?.magnetic_gap_depth ?? "",
        flux_density : data[i].specificationSBAudience?.flux_density ?? "",
        magnet : data[i].specificationSBAudience?.magnet ?? "",
        basket_material  : data[i].specificationSBAudience?.basket_material ?? "",
        demodulation : data[i].specificationSBAudience?.demodulation ?? "",
        cone_surround  : data[i].specificationSBAudience?.cone_surround ?? "",
        net_air_volume_filled_by_driver : data[i].specificationSBAudience?.net_air_volume_filled_by_driver ?? "",
        spider_profile : data[i].specificationSBAudience?.spider_profile ?? "",
        weather_resistant  : data[i].specificationSBAudience?.weather_resistant ?? "",
        rdc : data[i].specificationSBAudience?.rdc ?? "",
        recommended_crossover_frequency : data[i].specificationSBAudience?.recommended_crossover_frequency ?? "",
        diaphragm_material : data[i].specificationSBAudience?.diaphragm_material ?? "",
        phase_plug_design : data[i].specificationSBAudience?.phase_plug_design ?? "",
        total_exit_angle : data[i].specificationSBAudience?.total_exit_angle ?? "",
        net_air_volume_filled_by_hf_driver : data[i].specificationSBAudience?.net_air_volume_filled_by_hf_driver ?? "",
        nominal_throat_diameter : data[i].specificationSBAudience?.nominal_throat_diameter ?? "",
        overall_diameter  : data[i].specificationSBAudience?.overall_diameter ?? "",
        ninety_degrees_mounting_holes_diameter  : data[i].specificationSBAudience?.ninety_degrees_mounting_holes_diameter ?? "",
        depth : data[i].specificationSBAudience?.depth ?? "",
        net_weight  : data[i].specificationSBAudience?.net_weight ?? "",
        shipping_box  : data[i].specificationSBAudience?.shipping_box ?? "",
        gross_weight  : data[i].specificationSBAudience?.gross_weight ?? "",
        replacement_diaphragm : data[i].specificationSBAudience?.replacement_diaphragm ?? "",
        bolt_circle_diameter  : data[i].specificationSBAudience?.bolt_circle_diameter ?? "",
        baffle_cutout_diameter  : data[i].specificationSBAudience?.baffle_cutout_diameter ?? "",
        mounting_depth  : data[i].specificationSBAudience?.mounting_depth ?? "",
        flange_and_gasket_thickness : data[i].specificationSBAudience?.flange_and_gasket_thickness ?? "",
        recone_kit  : data[i].specificationSBAudience?.recone_kit ?? "",
        custom_note : data[i].specificationSBAudience?.custom_note ?? "", 
        productId   : data[i].specificationSBAudience?.productId ?? "",  
        createdAt   : new Date(),
        updatedAt   : new Date(),      
      }
       const extendedSpec = {
      ...specific,
      fs: data[i].thieleSmallParametersSBAudience?.fs ?? "",
      qts: data[i].thieleSmallParametersSBAudience?.qts ?? "",
      xmax: data[i].thieleSmallParametersSBAudience?.x_max ?? "",
      mms: data[i].thieleSmallParametersSBAudience?.mms ?? "",
      nominalCoverageHorizontal: data[i].hornsspecificationSBAudience?.nominal_coverage_horizontal ?? "",
      nominalCoverageVertical: data[i].hornsspecificationSBAudience?.nominal_coverage_vertical ?? "",
      directivityFactor: data[i].hornsspecificationSBAudience?.directivity_factor ?? "",
      directivityIndex: data[i].hornsspecificationSBAudience?.directivity_index ?? "",
      throatDiameter: data[i].hornsspecificationSBAudience?.throat_diameter ?? "",
      minimumRecommendedCrossover: data[i].hornsspecificationSBAudience?.minimum_recommended_crossover ?? "",
      mechanicalConnectionofDriver: data[i].hornsspecificationSBAudience?.mechanical_connection_of_driver ?? "",
      baffleCutoutDimensionsHorizontal: data[i].hornsspecificationSBAudience?.baffle_cutout_dimensions_front_mount_horizontal ?? "",
      baffleCutoutDimensionsVertical: data[i].hornsspecificationSBAudience?.baffle_cutout_dimensions_front_mount_vertical ?? "",
    }
      let product: ProductsSBAudience = {
        id: data[i].id,
        coverUrl: data[i].cover_img[0].url,
        CoverAlt: data[i].slug,
        name: data[i].name,
        slug: data[i].slug,
        categories: [],
        sub_categories: [],
        sub_sub_categories: [],
        specification: extendedSpec
      }
      allProducts.push(product)
    }
  
    let allProducts_Final : AllProductsSBAudienceForHome = {
      allProducts,
      allImpedance,
      allMaxPower,
      allSensitivity,
      allVoiceCoilDiameter,
      allDiaphragmMaterial,
      allMagnetMaterial,
      allNominalThroatDiameter,
      allFS,
      allQTS,
      allXmax,
      allMms,
      allNominalCoverageHorizontal,
      allNominalCoverageVertical,
      allDirectivityFactor,
      allDirectivityIndex,
      allThroatDiameter,
      allMinimumRecommendedCrossover,
      allMechanicalConnectionofDriver,
      allBaffleCutoutDimensionsHorizontal,
      allBaffleCutoutDimensionsVertical,
    }
  
    return allProducts_Final;
};

export default getAllProductsBySubCategory;

