import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  props: { params: Promise<{ brandId: string, productSlug: string }> }
) {
  const params = await props.params;
  try {
    if (!params.brandId) {
      return new NextResponse("brand id is required", { status: 400 });
    }
    
    if (!params.productSlug) {
      return new NextResponse("Product slug is required", { status: 400 });
    }

    const productId = await prismadb.product.findFirst({
      where: {
        brandId: params.brandId,
        slug: params.productSlug
      },
      select:{
          id: true,
      }
    });


    if(productId){
      const similarprod = await prismadb.similarProducts.findMany({
        where:{
          productId: productId.id
        }
      })
      let allSimilar: {similarProductId: string, image_url: string, name: string, href: string}[] = []
      
      await Promise.all(
        similarprod.map(async (value) => {
        const name_url_prod = await prismadb.product.findFirst({
          where: {
            id: value.similarProductId,
            brandId: params.brandId
          },
          select: {
            name: true,
            slug: true,
            cover_img: {
              select: {
                // Specify the fields you want from cover_img
                url: true, // Example field from cover_img
              },
            },
          },
        });
        let tempSimilar = {
            similarProductId: value.similarProductId,
            image_url: name_url_prod!.cover_img[0].url,
            name: name_url_prod!.name,
            href: `/products/${name_url_prod!.slug}`
        }
        allSimilar.push(tempSimilar)
          })
        )
    
    return NextResponse.json(allSimilar);
    }
    else{
      return new NextResponse("No Product Id", { status: 404 });
    }


  } catch (error) {
    console.log('[SIMILAR_PRODUCTS_BY_PRODUCT_SLUG_GET]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};