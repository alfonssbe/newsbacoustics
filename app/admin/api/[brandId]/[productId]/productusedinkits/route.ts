import { checkBearerAPI, getSession } from "@/lib/actions";
import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  props: { params: Promise<{ brandId: string, productId: string }> }
) {
  const params = await props.params;
  try {
    const session = await getSession();

    if(!session.isLoggedIn){
      return NextResponse.json("expired_session")
    }

    if(!(await checkBearerAPI(session))){
      session.destroy();
      return NextResponse.json("invalid_token")
    }

    await prismadb.productsUsedInKits.deleteMany({
      where:{
        productId: params.productId
      }
    });

    const body = await req.json();
    if(body.length!==0){
      const updatedprodUsed = await prismadb.productsUsedInKits.createMany({
        data: [
          ...body.map((data: { productId: string, productUsedInKitsId: string }) => ({
            productId: params.productId,
            productUsedInKitsId: data.productUsedInKitsId
          })),
        ],
      });
      
      await prismadb.product.update({
        where: {
          id : params.productId,
          brandId: params.brandId
        },
        data: {
          updatedAt: new Date(),
          updatedBy: session.name
        }
      });
      return NextResponse.json(updatedprodUsed);
    }
    return NextResponse.json('');
    
  } catch (error) {
    console.log('[PRODUCTS_USED_IN_KITS_POST]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};


export async function GET(
  req: Request,
  props: { params: Promise<{ brandId: string, productId: string }> }
) {
  const params = await props.params;
  try {
    if (!params.brandId) {
      return new NextResponse("Brand id is required", { status: 400 });
    }

    const all_product_used = await prismadb.productsUsedInKits.findMany({
      where: {
        productId: params.productId
      }
    });
    return NextResponse.json(all_product_used);
  } catch (error) {
    console.log('[PRODUCTS_USED_IN_KITS_GET]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};

  
