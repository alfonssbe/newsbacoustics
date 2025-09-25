import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function GET(req: Request, props: { params: Promise<{ brandId: string, allSlugId: string }> }) {
  const params = await props.params;
  try {
    if (!params.allSlugId) {
      return new NextResponse("Product Sub Category is required", { status: 400 });
    }

    const slugArray = params.allSlugId.split(',');
    slugArray.pop()

    if(params.brandId === process.env.NEXT_PUBLIC_SB_AUDIENCE_ID) {     
      const product = await prismadb.product.findMany({
        where: {
          slug:{
            in: slugArray
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
          slug:{
            in: slugArray
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
    console.log('[PRODUCT_FOR_ALL_DRIVERS_GET]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};