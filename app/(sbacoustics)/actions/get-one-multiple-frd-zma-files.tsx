import { redirect } from "next/navigation";
import { Kits_Finishing } from "../types";


const API=`${process.env.NEXT_PUBLIC_ROOT_URL}/${process.env.NEXT_PUBLIC_FETCH_ONE_MULTIPLE_FRD_ZMA_FILES}`;

const getMultipleFRDZMA = async (customProductSlug: string): Promise<Kits_Finishing[]> => {

  const API_EDITED = API.replace('{customProductSlug}', customProductSlug)
  const response = await fetch(API_EDITED!);
  if (!response.ok) {
    redirect('/');
    // throw new Error('Failed to fetch multiple FRDZMA');
  }
  const data = await response.json();
  if (!data) {
    redirect('/');
  }

  if(data.length === 0){
    let multi_FRDZMA: Kits_Finishing[] = [{
      productId: "",
      name: "",
      url: "",
    }]
    return multi_FRDZMA;
  }
  let multi_FRDZMA: Kits_Finishing[] = []
  data.map((value:Kits_Finishing) => {
    let temp_FRDZMA: Kits_Finishing = {
      productId: value.productId,
      name: value.name,
      url: value.url,
    }
    multi_FRDZMA.push(temp_FRDZMA)
  })
 
  return multi_FRDZMA;
};

export default getMultipleFRDZMA;

