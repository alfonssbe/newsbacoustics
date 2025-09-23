import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function GET(req: Request, props: { params: Promise<{ brandId: string }> }) {
  const params = await props.params;
  try {
    if (!params.brandId) {
      return new NextResponse("brand id is required", { status: 400 });
    }

    const products = await prismadb.product.findMany({
      where: {
        brandId: params.brandId,
        isArchived: false,
        isNewProduct: true
      },
      include:{
        cover_img: true
      },
      orderBy: {
        createdAt: 'desc', // Change 'asc' to 'desc' if you want descending order
      },
    });

    if(products){
      return NextResponse.json(products);
    }
    else{
      return new NextResponse("No Products", { status: 404 });
    }

  } catch (error) {
    console.log('[SIMILAR_PRODUCTS_GET]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};