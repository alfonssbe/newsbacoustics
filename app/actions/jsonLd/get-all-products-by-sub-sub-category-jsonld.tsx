import { AllCategory, AllProductsForHome, CachedAllProducts, Products, Size, Specifications, SubCategoryFilters } from "@/app/types";
import { redirect } from "next/navigation";

const API=`${process.env.NEXT_PUBLIC_ROOT_URL}/${process.env.NEXT_PUBLIC_FETCH_ALL_PRODUCTS_BY_SUB_SUB_CATEGORY}`;

const getAllProductsBySubSubCategoryJsonLd = async (path: string, subcategory: string, subsubcategory: string): Promise<Products[]> => {
  let allProducts: Array<Products> = []

  let size = {} as Size;
  let parentSize: Array<number> = []

  const brandId = path.includes('sbaudience') ? process.env.NEXT_PUBLIC_SB_AUDIENCE_ID : process.env.NEXT_PUBLIC_SB_ACOUSTICS_ID
  const API_EDITED_BRANDID = API.replace('{brandId}', brandId ?? '680c5eee-7ed7-41bc-b14b-4185f8a1c379'); //SBAcoustics ID as default
  const API_EDITED_FIRST = API_EDITED_BRANDID.replace('{productSubCategory}', subcategory)
  const API_EDITED = API_EDITED_FIRST.replace('{productSubSubCategory}', subsubcategory)
  const response = await fetch(API_EDITED);
  if (!response.ok) {
    redirect('/');
    // throw new Error(`Failed to fetch products by ${subsubcategory}`);
  }
  const data = await response.json();
  if (!data) {
    redirect('/');
  }

  for (let i = 0; i < data.length; i++) {
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

    let tempCat: Array<AllCategory> = []
    let tempSubCat: Array<AllCategory> = []
    let tempSubSubCat: Array<AllCategory> = []
    data[i].allCat && data[i].allCat.map((value: SubCategoryFilters) => {
      if(value.type === "Category"){
        tempCat.push({
          id: value.id,
          name: value.name,
          slug: value.slug
        })
      }
      else if(value.type === "Sub Category"){
        tempSubCat.push({
          id: value.id,
          name: value.name,
          slug: value.slug
        })
      }
      else if(value.type === "Sub Sub Category"){
        tempSubSubCat.push({
          id: value.id,
          name: value.name,
          slug: value.slug
        })
      }
    })

    if(data[i].cover_img.length>0){
      let product: Products = {
        id: data[i].id,
        coverUrl: data[i].cover_img[0].url,
        CoverAlt: data[i].slug,
        name: data[i].name,
        slug: data[i].slug,
        size: size,
        categories: tempCat,
        sub_categories: tempSubCat,
        sub_sub_categories: tempSubSubCat,
        specification: specific
      }
      allProducts.push(product)
    }
  }

  return allProducts;
};

export default getAllProductsBySubSubCategoryJsonLd;

