import { redirect } from "next/navigation";
import { Kits_Finishing } from "../types";


const API=`${process.env.NEXT_PUBLIC_ROOT_URL}/${process.env.NEXT_PUBLIC_FETCH_ONE_MULTIPLE_DATASHEET}`;

const getMultipleDatasheetProduct = async (path: string, customProductSlug: string): Promise<Kits_Finishing[]> => {
  const brandId = path.includes('sbaudience') ? process.env.NEXT_PUBLIC_SB_AUDIENCE_ID : process.env.NEXT_PUBLIC_SB_ACOUSTICS_ID
  const API_EDITED_BRANDID = API.replace('{brandId}', brandId ?? '680c5eee-7ed7-41bc-b14b-4185f8a1c379'); //SBAcoustics ID as default 
  const API_EDITED = API_EDITED_BRANDID.replace('{customProductSlug}', customProductSlug)
  const response = await fetch(API_EDITED);
  if (!response.ok) {
    redirect('/');
    // throw new Error('Failed to fetch multiple datasheet');
  }
  const data = await response.json();
  if (!data) {
    redirect('/');
  }

  if(data.length === 0){
    let multi_datasheet: Kits_Finishing[] = [{
      productId: "",
      name: "",
      url: "",
    }]
    return multi_datasheet;
  }
  let multi_datasheet: Kits_Finishing[] = []
  data.map((value:Kits_Finishing) => {
    let temp_datasheet: Kits_Finishing = {
      productId: value.productId,
      name: value.name,
      url: value.url,
    }
    multi_datasheet.push(temp_datasheet)
  })
 
  return multi_datasheet;
};

export default getMultipleDatasheetProduct;

