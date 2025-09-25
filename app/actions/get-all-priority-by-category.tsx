import { PriorityMenu } from "@/app/types";
import { menuPriority } from "@prisma/client";
import { redirect } from "next/navigation";

const API=`${process.env.NEXT_PUBLIC_ROOT_URL}/${process.env.NEXT_PUBLIC_FETCH_ALL_PRIORITY_BY_CATEGORY}`;

const getAllPriorityBySubCategory = async (path: string, subsubcategory: string): Promise<PriorityMenu[]> => {
 
    const brandId = path.includes('sbaudience') ? process.env.NEXT_PUBLIC_SB_AUDIENCE_ID : process.env.NEXT_PUBLIC_SB_ACOUSTICS_ID
    const API_EDITED_BRANDID = API.replace('{brandId}', brandId ?? '680c5eee-7ed7-41bc-b14b-4185f8a1c379'); //SBAcoustics ID as default
    const API_EDITED = API_EDITED_BRANDID.replace('{category}', subsubcategory)
    const response = await fetch(API_EDITED);
    if (!response.ok) {
        redirect('/');
        // throw new Error(`Failed to fetch products by ${subsubcategory}`);
    }
    const data = await response.json();
    if (!data) {
        redirect('/');
    }
    let allPriority: PriorityMenu[] = []
    data.map((val: menuPriority) => {
        let temp: PriorityMenu = {
            productId: val.productId,
            productName: '',
            priority: val.priorityNumber,
            menuType: '',
            categoryId: val.categoryId,
            categoryName: ''
        }
        allPriority.push(temp)
    })

    return allPriority
};

export default getAllPriorityBySubCategory;

