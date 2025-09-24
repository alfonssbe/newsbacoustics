import { NextResponse } from 'next/server';

import prismadb from '@/lib/prismadb';

export async function GET(req: Request, props: { params: Promise<{ brandId: string }> }) {
  const params = await props.params;
  try {
    if (!params.brandId) {
      return new NextResponse("Brand id is required", { status: 400 });
    }
    if(params.brandId === process.env.NEXT_PUBLIC_SB_ACOUSTICS_ID){
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
    }
    else if (params.brandId === process.env.NEXT_PUBLIC_SB_AUDIENCE_ID){
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
          specificationSBAudience: {
            select: {
              maximum_power_handling: true,
              sensitivity: true,
            }
          },
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
        const parts: string[] = [];

        if(product.size){
          if (product.size.name !== "None") {
            parts.push(`${product.size.name}"`);
          }
          size.push(product.size.name)
          size.push(product.size.name.concat(" inch"))
          size.push(product.size.value)
        }
        if (product.specificationSBAudience.maximum_power_handling && product.specificationSBAudience.maximum_power_handling !== '') {
          parts.push(product.specificationSBAudience.maximum_power_handling + " W");
        }
        if (product.specificationSBAudience.sensitivity && product.specificationSBAudience.sensitivity !== '') {
          parts.push(product.specificationSBAudience.sensitivity + " dB");
        }      
        add_info = parts.join(" - ");
        // }
        return {
          label: product.name,
          size,
          cat,
          subcat, 
          subsubcat,
          slug: product.slug,
          url: final_Url,
          info: add_info        
        };
      });
      return NextResponse.json(productsWithCategoriesandImage);
    }
  } catch (error) {
    console.log('[SEARCHBOX_GET]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};

