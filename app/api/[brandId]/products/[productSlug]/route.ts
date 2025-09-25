import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function GET(req: Request, props: { params: Promise<{ brandId: string, productSlug: string }> }) {
  const params = await props.params;
  try {
    if (!params.productSlug) {
      return new NextResponse("Product slug is required", { status: 400 });
    }

    if(params.brandId === process.env.NEXT_PUBLIC_SB_AUDIENCE_ID) {     
      const product = await prismadb.product.findFirst({
        where: {
          slug: params.productSlug,
          brandId: params.brandId
        },
        include: {
          allCat: true,
          images_catalogues: true,
          drawing_img: true,
          graph_img: true,
          cover_img: true,
          size: true,
          specificationSBAudience: true,
        }
      });
      return NextResponse.json(product);
    }
    else{
      const product = await prismadb.product.findFirst({
        where: {
          slug: params.productSlug,
          brandId: params.brandId
        },
        include: {
          allCat: true,
          images_catalogues: true,
          drawing_img: true,
          graph_img: true,
          cover_img: true,
          size: true,
          specification: true,
        }
      });
      return NextResponse.json(product);
    }
    
  } catch (error) {
    console.log('[PRODUCT_GET]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};