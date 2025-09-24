import { SimilarProdTypes } from "@/app/(sbacoustics)/types";
import { redirect } from "next/navigation";

const API=`${process.env.NEXT_PUBLIC_ROOT_URL}/${process.env.NEXT_PUBLIC_FETCH_ALL_SIMILAR_PRODUCTS}`;

const getSimilar = async (path: string, activeSlug: string): Promise<SimilarProdTypes[]> => {
    let allSimilar: Array<SimilarProdTypes> = [] 
    const brandId = path.includes('sbaudience') ? process.env.NEXT_PUBLIC_SB_AUDIENCE_ID : process.env.NEXT_PUBLIC_SB_ACOUSTICS_ID
    const API_EDITED_BRANDID = API.replace('{brandId}', brandId ?? '680c5eee-7ed7-41bc-b14b-4185f8a1c379'); //SBAcoustics ID as default
    const API_EDITED = API_EDITED_BRANDID.replace('{productSlug}', activeSlug)
    const response = await fetch(API_EDITED);
    if (!response.ok) {
        redirect('/');
        // throw new Error('Failed to fetch products');
    }
    const data = await response.json();
    if (!data) {
        redirect('/');
    }

    for (let i = 0; i < data.length; i++) {
        let tempSimilar : SimilarProdTypes = {
            similarProductId: data[i].similarProductId,
            image_url: data[i].image_url,
            name: data[i].name,
            href: data[i].href
        }
        allSimilar.push(tempSimilar)
    }

  return allSimilar;
};

export default getSimilar;

