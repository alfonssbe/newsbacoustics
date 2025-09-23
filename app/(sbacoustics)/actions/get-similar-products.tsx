import { SimilarProdTypes } from "@/app/(sbacoustics)/types";
import { redirect } from "next/navigation";

const API=`${process.env.NEXT_PUBLIC_ROOT_URL}/${process.env.NEXT_PUBLIC_FETCH_ALL_SIMILAR_PRODUCTS}`;

const getSimilar = async (activeSlug: string): Promise<SimilarProdTypes[]> => {
    let allSimilar: Array<SimilarProdTypes> = []
    const API_EDITED = API.replace('{productSlug}', activeSlug)
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

