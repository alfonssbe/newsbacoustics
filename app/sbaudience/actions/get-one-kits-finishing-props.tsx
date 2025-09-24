import { Kits_Finishing } from "@/app/(sbacoustics)/types";
import { redirect } from "next/navigation";

const API=`${process.env.NEXT_PUBLIC_ROOT_URL}/${process.env.NEXT_PUBLIC_FETCH_ONE_KITS_FINISHING_PRODUCT}`;

const getKitsFinishingProduct = async (path: string, customProductSlug: string): Promise<Kits_Finishing[]> => {
  const brandId = path.includes('sbaudience') ? process.env.NEXT_PUBLIC_SB_AUDIENCE_ID : process.env.NEXT_PUBLIC_SB_ACOUSTICS_ID
  const API_EDITED_BRANDID = API.replace('{brandId}', brandId ?? '680c5eee-7ed7-41bc-b14b-4185f8a1c379'); //SBAcoustics ID as default
  const API_EDITED = API_EDITED_BRANDID.replace('{customProductSlug}', customProductSlug)
  const response = await fetch(API_EDITED);
  if (!response.ok) {
    redirect('/');
    // throw new Error('Failed to fetch one custom product');
  }
  const data = await response.json();
  if (!data) {
    redirect('/');
  }

  if(data.length === 0){
    let kitsFinish: Kits_Finishing[] = [{
      name: "",
      url: "",
      productId: ""
    }]
    return kitsFinish;
  }
  let allFinish: Array<Kits_Finishing> = []
    for (let i = 0; i < data.length; i++) {
        let temp: Kits_Finishing = {
            name: data[i].name,
            url: data[i].url,
            productId: data[i].productId
        }
        allFinish.push(temp)
    }
    
  return allFinish;
};

export default getKitsFinishingProduct;

