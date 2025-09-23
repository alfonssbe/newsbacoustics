import { FeaturedProducts } from "@/app/(sbacoustics)/types";
import { redirect } from "next/navigation";

const API=`${process.env.NEXT_PUBLIC_ROOT_URL}/${process.env.NEXT_PUBLIC_FETCH_ALL_FEATURED_PRODUCTS}`;

const getAllFeaturedProducts = async (path: string): Promise<FeaturedProducts[]> => {
  let allFeaturedProducts: Array<FeaturedProducts> = []
  const brandId = path.includes('sbaudience') ? process.env.NEXT_PUBLIC_SB_AUDIENCE_ID : process.env.NEXT_PUBLIC_SB_ACOUSTICS_ID
  const API_EDITED = API.replace('{brandId}', brandId ?? '680c5eee-7ed7-41bc-b14b-4185f8a1c379'); //SBAcoustics ID as default
  const response = await fetch(API_EDITED);
  if (!response.ok) {
    redirect('/');
    // throw new Error('Failed to fetch featured products');
  }
  const data = await response.json();
  
  if (!data) {
    redirect('/');
  }

  for (let i = 0; i < data.length; i++) {
    if(data[i].featured_img.length>0){
      let product: FeaturedProducts = {
        id: data[i].id,
        name: data[i].name,
        slug: data[i].slug,
        featuredImgUrl: data[i].featured_img[0].url,
        featuredDesc: data[i].featuredDesc
      }
      allFeaturedProducts.push(product)
    }
  }
  return allFeaturedProducts;
};

export default getAllFeaturedProducts;

