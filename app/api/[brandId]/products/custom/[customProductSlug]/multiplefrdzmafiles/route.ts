import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  props: { params: Promise<{ brandId: string, customProductSlug: string }> }
) {
  const params = await props.params;
  try {
    if (!params.brandId) {
      return new NextResponse("Brand id is required", { status: 400 });
    }

    const productId = await prismadb.product.findFirst({
      where: {
        slug: params.customProductSlug,
        brandId: params.brandId
      },
      select: {
        id: true
      }
    })

    if(!productId){
      return new NextResponse("Product not found", { status: 404 });
    }

    const multiple_frdzmafiles = await prismadb.multipleFRDZMAFiles.findMany({
      where: {
        productId: productId.id
      }
    });
    return NextResponse.json(multiple_frdzmafiles);
  } catch (error) {
    console.log('[MULTIPLE_FRD_ZMA_FILES_GET]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};
  