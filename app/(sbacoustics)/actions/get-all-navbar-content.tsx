import { NavbarCategory, NavbarProducts, PriorityMenu } from "@/app/(sbacoustics)/types";
import { redirect } from "next/navigation";

const API=`${process.env.NEXT_PUBLIC_ROOT_URL}/${process.env.NEXT_PUBLIC_FETCH_ALL_NAVBAR_CONTENT}`;

const getAllNavbarContent = async (path: string): Promise<[NavbarProducts[], PriorityMenu[]]> => {
  let allNavbarProducts: Array<NavbarProducts> = []
  const brandId = path.includes('sbaudience') ? process.env.NEXT_PUBLIC_SB_AUDIENCE_ID : process.env.NEXT_PUBLIC_SB_ACOUSTICS_ID
  const API_EDITED = API.replace('{brandId}', brandId ?? '680c5eee-7ed7-41bc-b14b-4185f8a1c379'); //SBAcoustics ID as default
  const response = await fetch(API_EDITED);
  if (!response.ok) {
    redirect('/');
    // throw new Error('Failed to fetch navbar products');
  }
  const data = await response.json();
  if (!data) {
    redirect('/');
  }

  console.log("DATA NAVBAR: ", data);


  for (let i = 0; i < data[0].length; i++) {
    if(data[0][i].url.length>0){
      let allNavbarCat: Array<NavbarCategory> = []
      for(let j = 0; j < data[0][i].categories.length; j++){
        let cat: NavbarCategory = {
          name: data[0][i].categories[j].name,
          type: data[0][i].categories[j].type,
        }
        allNavbarCat.push(cat)
      }
      let product: NavbarProducts = {
        name: data[0][i].productName,
        href: "/products/".concat(data[0][i].productSlug),
        categories: allNavbarCat,
        url: data[0][i].url[0].url,
        navbarNotes: data[0][i].navbarNotes,
        priority: data[0][i].priority,
        newProduct: data[0][i].newProd
      }
      allNavbarProducts.push(product)
    }
  }

  return [allNavbarProducts, data[1]];
};

export default getAllNavbarContent;

