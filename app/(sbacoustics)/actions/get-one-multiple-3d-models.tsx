import { redirect } from "next/navigation";
import { Kits_Finishing } from "../types";


const API=`${process.env.NEXT_PUBLIC_ROOT_URL}/${process.env.NEXT_PUBLIC_FETCH_ONE_MULTIPLE_3D_MODELS}`;

const getMultiplemodels3DProduct = async (customProductSlug: string): Promise<Kits_Finishing[]> => {

  const API_EDITED = API.replace('{customProductSlug}', customProductSlug)
  const response = await fetch(API_EDITED!);
  if (!response.ok) {
    redirect('/');
    // throw new Error('Failed to fetch multiple models3D');
  }
  const data = await response.json();
  if (!data) {
    redirect('/');
  }

  if(data.length === 0){
    let multi_models3D: Kits_Finishing[] = [{
      productId: "",
      name: "",
      url: "",
    }]
    return multi_models3D;
  }
  let multi_models3D: Kits_Finishing[] = []
  data.map((value:Kits_Finishing) => {
    let temp_models3D: Kits_Finishing = {
      productId: value.productId,
      name: value.name,
      url: value.url,
    }
    multi_models3D.push(temp_models3D)
  })
 
  return multi_models3D;
};

export default getMultiplemodels3DProduct;

