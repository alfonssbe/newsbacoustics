export interface Products {
    id: string;
    name: string;
    slug: string;
    coverUrl: string;
    CoverAlt: string;
    size: Size;
    categories: AllCategory[];
    sub_categories: AllCategory[];
    sub_sub_categories: AllCategory[];
    specification: Specifications;
}

export interface SubCategoryFilters {
    id: string;
    productId: string;
    categoryId: string;
    type: string;
    name: string;
    slug: string;
    createdAt: string;
    updatedAt: string;
}

export interface FeaturedProducts {
    id: string;
    name: string;
    slug: string;
    featuredImgUrl: string;
    featuredDesc: string;
}

export interface Size {
    value: number;
    label: string;
}

export interface Searchbox {
    label: string;
    name: string;
    size: string[];
    cat: string[];
    subcat: string[];
    subsubcat: string[];
    productInKits: string[];
    slug: string;
    url: string;
    info: string;
}

export interface AllCategory {
    id: string;
    name: string;
    slug: string;
}

export interface NavbarCategory {
    name: string;
    type: string;
}

export interface NavbarProducts {
    name: string;
    href: string;
    categories: NavbarCategory[]
    url: string;
    navbarNotes: string;
    priority: string;
    newProduct: boolean;
}

export interface Specifications {
    impedance: string;
    dc_resistance_re: string;
    coil_inductance_le: string;
    effective_piston_area_sd: string;
    voice_coil_diameter: string;
    voice_coil_height: string;
    air_gap_height: string;
    linear_coil_travel_pp: string;
    moving_mass_mms: string;
    free_air_resonance_fs: string;
    sensitivity: string;
    mechanical_q_factor_qms: string;
    electrical_q_factor_qes: string;
    total_q_factor_qts: string;
    force_factor_bi: string;
    rated_power_handling: string;
    magnetic_flux_density: string;
    magnet_weight: string;
    net_weight: string;
    equivalent_volume_vas: string;
    compliance_cms: string;
    mechanical_loss_rms: string;
    recommended_frequency_range: string;
    max_mechanical_cone_excursion_xmech: string;
    custom_note: string;
    cone_material: string;
    dome_material: string;
    mounting_diameter: string;
}

export interface Custom_Specifications {
    customDesc: string
    frequency_range: string
    sensitivity: string
    nominal_impedance: string
    max_spl: string
    recommended_amplifier: string
    crossover_frequency: string
    enclosure_type: string
    port_tuning_frequency: string
    driver_units: string
    cabinet_material: string
    speaker_dimension: string
    net_weight: string
    dc_resistance_re: string
    voice_coil_diameter: string
    voice_coil_height: string
    air_gap_height: string
    free_air_resonance_fs: string
    rated_power_handling: string
    magnetic_flux_density: string
    magnet_weight: string
    dome_material: string
    custom_note_for_spec: string
}

export interface Kits_Finishing{
    name: string
    url: string
    productId: string
}

export interface SimilarProdTypes {
    similarProductId: string
    image_url: string
    name: string
    href: string
}

export interface NewProduct {
    productId: string
    image_url: string
    name: string
    href: string
    navbarNotes: string
}

export interface AllProductsForHome {
    allProducts: Products[];
    allSensitivity: number[];
    allAirResonanceFS: number[];
    allVoiceCoilDiameter: number[];
    allMountingDiameter: number[];
    domeMaterial: string[];
    allImpedance: number[];
    allImpedanceCheckbox: string[];
    allQFactorQTS: number[];
    linearCoilTravelXmax: number[];
    Vas: number[];
    coneMaterial: string[];
}

export interface SingleProducts {
    id: string;
    name: string;
    desc: string;
    slug: string;
    coverUrl: string;
    coverAlt: string;
    datasheet: string[];
    images_Catalogues_Url: string[];
    images_Catalogues_Alt: string[];
    drawing_Url: string[];
    graph_Url: string[];
    size: Size;
    categories: AllCategory[];
    sub_categories: AllCategory[];
    sub_sub_categories: AllCategory[];
    specification: Specifications;
    isKits: boolean;
    isAccessories: boolean;
    isCustom: boolean;
    isCoax: boolean;
    oemQuantity: string;
}

export interface CachedAllProducts {
    allproduct: AllProductsForHome;
    allsizes: number[];
}

export interface SliderData{
  slug: string
  name: string
  minIndex: number // Index in the data array
  maxIndex: number // Index in the data array
  min_index: number // Minimum possible index
  max_index: number // Maximum possible index
  unit: string
  value: number[] // Array of actual values
}

export interface CheckBoxData{
    name: string;
    slug: string;
    value: string[];
    unit: string;
}

export interface activeSlider{
    parentName: string;
    slug: string;
    bottomVal: number;
    topVal: number;
    bottomRealVal: number;
    topRealVal: number;
    unit: string;
}

export interface activeCheckbox{
    parentName: string;
    slug: string;
    name: string;
    unit: string;
}

export interface NavbarComponents{
  title: string,
  href: string,
  parent: string,
  url: string,
  imageDesc: string,
  priority: string,
  newProd: boolean,
  hasProduct: boolean
}

export interface PriorityMenu{
    productId: string,
    productName: string,
    priority: string,
    menuType: string //["Kits", "Drivers", "Sub Drivers", "Sub Sub Drivers"],
    categoryId: string,
    categoryName: string
}



//ADP = All Drivers Page

export interface CachedAllProducts_ADP {
    allproduct: AllProductsForHome_ADP;
    allsizes: number[];
}

export interface AllProductsForHome_ADP {
    allProducts: Products_ADP[];
    allSensitivity: number[];
    allAirResonanceFS: number[];
    allVoiceCoilDiameter: number[];
    allMountingDiameter: number[];
    domeMaterial: string[];
    allImpedance: number[];
    allImpedanceCheckbox: string[];
    allQFactorQTS: number[];
    linearCoilTravelXmax: number[];
    Vas: number[];
    coneMaterial: string[];
    allMaterial: string[];
    allSubCategory: string[]
}

export interface Products_ADP {
    id: string;
    name: string;
    slug: string;
    coverUrl: string;
    CoverAlt: string;
    size: Size;
    categories: AllCategory[];
    sub_categories: AllCategory[];
    sub_sub_categories: AllCategory[];
    specification: Specifications_ADP;
}

export interface Specifications_ADP {
    impedance: string;
    dc_resistance_re: string;
    coil_inductance_le: string;
    effective_piston_area_sd: string;
    voice_coil_diameter: string;
    voice_coil_height: string;
    air_gap_height: string;
    linear_coil_travel_pp: string;
    moving_mass_mms: string;
    free_air_resonance_fs: string;
    sensitivity: string;
    mechanical_q_factor_qms: string;
    electrical_q_factor_qes: string;
    total_q_factor_qts: string;
    force_factor_bi: string;
    rated_power_handling: string;
    magnetic_flux_density: string;
    magnet_weight: string;
    net_weight: string;
    equivalent_volume_vas: string;
    compliance_cms: string;
    mechanical_loss_rms: string;
    recommended_frequency_range: string;
    max_mechanical_cone_excursion_xmech: string;
    custom_note: string;
    cone_material: string;
    dome_material: string;
    mounting_diameter: string;
    all_material: string //ADP Only
    all_sub_category: string //ADP Only
}