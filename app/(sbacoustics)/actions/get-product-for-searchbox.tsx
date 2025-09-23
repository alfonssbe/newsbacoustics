import { Searchbox, Size } from "@/app/(sbacoustics)/types";
import { redirect } from "next/navigation";

const API=`${process.env.NEXT_PUBLIC_ROOT_URL}/${process.env.NEXT_PUBLIC_REACT_APP_FETCH_PRODUCT_FOR_SEARCHBOX}`;

function normalizeFractions(text: string): string {
  return text
    // normalize Unicode fractions
    .replace(/½/g, "1/2")
    // normalize common patterns (6 1/2, 6-1/2 → 6.5)
    .replace(/(\d+)\s*[- ]?\s*1\/2/g, (_, num) => `${num}.5`);
}

const getProductsForSearchbox = async (): Promise<Searchbox[]> => {
    let productForSearchbox: Array<Searchbox> = [];
    const response = await fetch(API);
    if (!response.ok) {
      redirect('/');
    //   throw new Error('Failed to fetch searchbox');
    }
    const data = await response.json();
    if (!data) {
        redirect('/');
    }

    for (let i = 0; i < data.length; i++) {
        if(data[i].url.length>0){
            const normalizedStr = data[i].label.replace(/["“”‟″‶〃״˝ʺ˶ˮײ]/g, ' inch');
            let temp: Searchbox = {
                label: normalizedStr,
                name: data[i].label.replace(/^\s*\d+(\.\d+)?\s*(?:inch|")\s*/i, ''),
                size: data[i].size.map((val: string) => normalizeFractions(val)),
                cat: data[i].cat.map((val: string) => normalizeFractions(val)),
                subcat: data[i].subcat.map((val: string) => normalizeFractions(val)),
                subsubcat: data[i].subsubcat.map((val: string) => normalizeFractions(val)),
                productInKits: data[i].productInKits.map((val: string) => normalizeFractions(val)),
                slug: data[i].slug,
                url: data[i].url[0].url,
                info: data[i].info
            };
            // i === 100 && console.log(data[i].label.replace(/^\s*\d+(\.\d+)?\s*(?:inch|")\s*/i, ''))
            productForSearchbox.push(temp);
        }
    }
    return productForSearchbox;
};

export default getProductsForSearchbox;

