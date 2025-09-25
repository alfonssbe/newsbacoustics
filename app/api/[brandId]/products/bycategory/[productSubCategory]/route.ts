import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function GET(req: Request, props: { params: Promise<{ brandId: string, productSubCategory: string }> }) {
  const params = await props.params;
  try {
    if (!params.productSubCategory) {
      return new NextResponse("Product Sub Category is required", { status: 400 });
    }
    
    const productIdbyCat =  await prismadb.allProductCategory.findMany({
      where:{
          slug: params.productSubCategory,
          type: 'Sub Category'
      },
      select:{
          productId: true
      }
    })

    const productIds = productIdbyCat.map((value) => value.productId)

    if(params.brandId === process.env.NEXT_PUBLIC_SB_AUDIENCE_ID) {     
      const product = await prismadb.product.findMany({
        where: {
          id:{
            in: productIds
          },
          brandId: params.brandId
        },
        include: {
          allCat: true,
          specificationSBAudience: true,
          cover_img: true,
          size: true,
        }
      });
      return NextResponse.json(product);
    }
    else{
      const product = await prismadb.product.findMany({
        where: {
          id:{
            in: productIds
          },
          brandId: params.brandId
        },
        include: {
          allCat: true,
          specification: true,
          cover_img: true,
          size: true,
        }
      });
      return NextResponse.json(product);
    }
  } catch (error) {
    console.log('[PRODUCT_BY_SUB_CATEGORY_GET]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};