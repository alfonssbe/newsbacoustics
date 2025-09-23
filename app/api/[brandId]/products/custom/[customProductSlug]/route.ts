import { NextResponse } from 'next/server';

import prismadb from '@/lib/prismadb';

export async function GET(
  req: Request,
  props: { params: Promise<{ brandId: string, customProductSlug: string }> }
) {
  const params = await props.params;
  try {

    if (!params.brandId) {
      return new NextResponse("brand id is required", { status: 400 });
    }

    if (!params.customProductSlug) {
      return new NextResponse("Custom Product Slug is required", { status: 400 });
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

    const customproduct = await prismadb.custom_Specification.findMany({
      where: {
        productId: productId.id
      },
    });

    return NextResponse.json(customproduct);
  } catch (error) {
    console.log('[CUSTOM_PRODUCT_GET]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};
