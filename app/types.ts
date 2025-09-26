import { HornsSpecificationSBAudience, Specification, SpecificationSBAudience, ThieleSmallParameters } from "@prisma/client";

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
    specification: Specification;
    isKits: boolean;
    isAccessories: boolean;
    isCustom: boolean;
    isCoax: boolean;
    oemQuantity: string;
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




// 🟩 Base Products interface
export interface BaseProduct<Spec = undefined> {
  id: string;
  name: string;
  slug: string;
  coverUrl: string;
  CoverAlt: string;
  size?: Size;
  categories: AllCategory[];
  sub_categories: AllCategory[];
  sub_sub_categories: AllCategory[];
  specification?: Spec;
  // hornsspecificationSBAudience?: HornsSpec; // SB Audience Only
  // thieleSmallParametersSBAudience?: ThieleSpec; // SB Audience Only
}

// 🟩 Base AllProductsForHome interface
export interface BaseAllProductsForHome<ProductType> {
  allProducts: ProductType[];
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

// 🟩 CachedAllProducts base interface
export interface BaseCachedAllProducts<AllProductsType> {
  allproduct: AllProductsType;
  allsizes: number[];
}



// ADP Specific
export interface Specifications_ADP extends Specification {
  all_material: string;       // ADP Only
  all_sub_category: string;   // ADP Only
}

export interface AllProductsForHome_ADP
  extends BaseAllProductsForHome<Products_ADP> {
  allMaterial: string[];
  allSubCategory: string[];
}

export interface Products_ADP
  extends BaseProduct<Specifications_ADP> {}

export interface CachedAllProducts_ADP
  extends BaseCachedAllProducts<AllProductsForHome_ADP> {}


// Normal Specifications
export type Products = BaseProduct<Specification>;

export type AllProductsForHome = BaseAllProductsForHome<Products>;

export type CachedAllProducts = BaseCachedAllProducts<AllProductsForHome>;







// SB AUDIENCE
// 🟩 Base AllProductsForHome interface
export interface BaseAllProductsSBAudienceForHome<ProductType> {
  allProducts: ProductType[];
  allImpedance: number[];
  allMaxPower: number[];
  allSensitivity: number[];
  allVoiceCoilDiameter: number[];
  allDiaphragmMaterial: string[];
  allMagnetMaterial: string[];
  allNominalThroatDiameter: number[];
  allFS: number[];
  allQTS: number[];
  allXmax: number[];
  allMms: number[];
  allNominalCoverageHorizontal: number[];
  allNominalCoverageVertical: number[];
  allDirectivityFactor: number[];
  allDirectivityIndex: number[];
  allThroatDiameter: number[];
  allMinimumRecommendedCrossover: number[];
  allMechanicalConnectionofDriver: string[];
  allBaffleCutoutDimensionsHorizontal: number[];
  allBaffleCutoutDimensionsVertical: number[];
}

export type ProductsSBAudience = BaseProduct<
  SpecificationSBAudience & {
    fs: number;
    qts: number;
    x_max: number;
    mms: number;
    nominalCoverageHorizontal: number;
    nominalCoverageVertical: number;
    directivityFactor: number;
    directivityIndex: number;
    throatDiameter: number;
    minimumRecommendedCrossover: number;
    mechanicalConnectionofDriver: string;
    baffleCutoutDimensionsHorizontal: number;
    baffleCutoutDimensionsVertical: number;
    sensitifityOnDriver: number;
  }
>;

export type AllProductsSBAudienceForHome = BaseAllProductsSBAudienceForHome<ProductsSBAudience>;

export interface SingleProductsSBAudience {
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
    specification: SpecificationSBAudience;
    hornSpecification: HornsSpecificationSBAudience;
    ThieleSpecification: ThieleSmallParameters;
    isCustom: boolean;
    isCoax: boolean;
}