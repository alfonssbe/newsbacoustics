// import { NextResponse } from 'next/server';

// import prismadb from '@/lib/prismadb';

// export async function GET(req: Request, props: { params: Promise<{ brandId: string }> }) {
//   const params = await props.params;
//   try {
//     if (!params.brandId) {
//       return new NextResponse("Brand id is required", { status: 400 });
//     }

//     const products = await prismadb.product.findMany({
//       where: {
//         brandId: params.brandId,
//         isArchived: false,
//       },
//       select: {
//         slug: true,
//         name: true,
//         id: true,
//         size: true,
//         isKits: true,
//       },
//       orderBy: {
//         name: 'asc'
//       }
//     });

//     const productIds = products.map(product => product.id);

//     const categories = await prismadb.allProductCategory.findMany({
//       where:{
//           productId:{
//               in: productIds
//           },
//       },
//       select:{
//           type: true,
//           name: true,
//           productId: true
//       }
//     })
    
//     const image_url = await prismadb.cover_Image.findMany({
//       select:{
//         productId: true,
//         url: true
//       }
//     })

//     const additional_info = await prismadb.specification.findMany({
//       where:{
//         productId:{
//           in: productIds
//         }
//       },
//       select:{
//         productId: true,
//         rated_power_handling: true,
//         sensitivity: true,
//         searchbox_desc: true
//       }
//     })

//     const productsWithCategoriesandImage = products.map((product, index) => {
//       const productCategories = categories.filter(category => category.productId === product.id);
      
//       let tempName = ""
//       const categoryDetails = productCategories.map(category => {
//           tempName = tempName.concat(category.name, " ");
//           return { tempName };
//       });
      
//       const productImage = image_url.filter(image => image.productId === product.id);
//       const final_Url = productImage.map(url => ({
//        url: url.url
//       }));

//       let add_info = ''
//       if(additional_info[index]){
//         if(product.isKits){
//           add_info = additional_info.find(info => info.productId === product.id)?.searchbox_desc || 
//           "";
//         }
//         else{
//           const parts: string[] = [];

//           if (product.size.name !== "None") {
//             parts.push(`${product.size.name}"`);
//           }
//           const info = additional_info.find(info => info.productId === product.id);
//           if (info?.rated_power_handling) {
//             parts.push(info.rated_power_handling + " W");
//           }
//           if (info?.sensitivity) {
//             parts.push(info.sensitivity + " dB");
//           }
//           // if (additional_info[index].rated_power_handling !== null && additional_info[index].rated_power_handling !== "") {
//           //   parts.push(`${additional_info[index].rated_power_handling} W`);
//           // }
//           // if (additional_info[index].sensitivity !== null && additional_info[index].sensitivity !== "") {
//           //   parts.push(`${additional_info[index].sensitivity} dB`);
//           // }
      
//           add_info = parts.join(" - ");
//         }
//       }
//       return {
//         label: product.name,
//         value: tempName.toLowerCase().includes('nrx') || tempName.toLowerCase().includes('norex') || product.name.toLowerCase().includes('nrx') || product.name.toLowerCase().includes('norex') ? tempName.concat("Paper ") : tempName,
//         slug: product.slug,
//         url: final_Url,
//         info: add_info        
//       };
//     });


  
//     return NextResponse.json(productsWithCategoriesandImage);
//   } catch (error) {
//     console.log('[SEARCHBOX_GET]', error);
//     return new NextResponse("Internal error", { status: 500 });
//   }
// };







import { NextResponse } from 'next/server';

import prismadb from '@/lib/prismadb';

export async function GET(req: Request, props: { params: Promise<{ brandId: string }> }) {
  const params = await props.params;
  try {
    if (!params.brandId) {
      return new NextResponse("Brand id is required", { status: 400 });
    }

    const products = await prismadb.product.findMany({
      where: {
        brandId: params.brandId,
        isArchived: false,
      },
      include: {
        size: true,
        cover_img: {
          select:{
            productId: true,
            url: true
          }
        },
        allCat: {
          select:{
              type: true,
              name: true,
              productId: true
          }
        },
        specification: {
          select: {
            rated_power_handling: true,
            sensitivity: true,
            searchbox_desc: true
          }
        },
        productsUsedInKits: true
      },
      orderBy: {
        name: 'asc'
      }
    });

    const productsWithCategoriesandImage = products.map((product) => {      
      let tempName = ""
      product.allCat.map(category => {
          tempName = tempName.concat(category.name, " ");
          return { tempName };
      });
      let cat: string[] = []
      let subcat: string[] = []
      let subsubcat: string[] = []
      let size: string[] = []
      let productInKits: string[] = []
      
      product.allCat.map(category => {
        category.type === 'Category' && cat.push(category.name)
        category.type === 'Sub Category' && subcat.push(category.name)
        category.type === 'Sub Sub Category' && subsubcat.push(category.name)
      });
           


      const productImage = product.cover_img.filter(image => image.productId === product.id);
      const final_Url = productImage.map(url => ({
       url: url.url
      }));

      let add_info = ''
      // if(additional_info[index]){
        if(product.isKits){
          add_info = product.specification.searchbox_desc || 
          "";
          size.push('Kits')
        }
        else{
          const parts: string[] = [];

          if(product.size){
            if (product.size.name !== "None") {
              parts.push(`${product.size.name}"`);
            }
            size.push(product.size.name)
            size.push(product.size.name.concat(" inch"))
            size.push(product.size.value)
          }
          if (product.specification.rated_power_handling && product.specification.rated_power_handling !== '') {
            parts.push(product.specification.rated_power_handling + " W");
          }
          if (product.specification.sensitivity && product.specification.sensitivity !== '') {
            parts.push(product.specification.sensitivity + " dB");
          }      
          add_info = parts.join(" - ");
        }



        // const tempProductsInKits: string[] = [];
        // product.productsUsedInKits && product.productsUsedInKits.length > 0 && product.productsUsedInKits.map((item, index) => {
        //   tempProductsInKits.push(products.find((val)=> val.id === item.productUsedInKitsId)?.name ?? '')
        // })
        // tempProductsInKits.length > 0 && (tempName = tempName.concat(tempProductsInKits.join(" "), " "))
        product.productsUsedInKits && product.productsUsedInKits.length > 0 && product.productsUsedInKits.map((item, index) => {
          productInKits.push(products.find((val)=> val.id === item.productUsedInKitsId)?.name ?? '')
        })
        
        if(tempName.toLowerCase().includes('nrx') || tempName.toLowerCase().includes('norex') || product.name.toLowerCase().includes('nrx') || product.name.toLowerCase().includes('norex')){
          subcat.push('Paper')
          subsubcat.push('Paper')
        }
      // }
      return {
        label: product.name,
        size,
        cat,
        subcat, 
        subsubcat,
        productInKits,
        slug: product.slug,
        url: final_Url,
        info: add_info        
      };
    });


  
    return NextResponse.json(productsWithCategoriesandImage);
  } catch (error) {
    console.log('[SEARCHBOX_GET]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};

