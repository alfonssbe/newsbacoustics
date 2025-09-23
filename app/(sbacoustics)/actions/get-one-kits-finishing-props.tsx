import { Kits_Finishing } from "@/app/(sbacoustics)/types";
import { redirect } from "next/navigation";

const API=`${process.env.NEXT_PUBLIC_ROOT_URL}/${process.env.NEXT_PUBLIC_FETCH_ONE_KITS_FINISHING_PRODUCT}`;

const getKitsFinishingProduct = async (customProductSlug: string): Promise<Kits_Finishing[]> => {

  const API_EDITED = API.replace('{customProductSlug}', customProductSlug)
  const response = await fetch(API_EDITED!);
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

