import { checkBearerAPI, getSession } from "@/lib/actions";
import prismadb from "@/lib/prismadb";
import { redirect } from "next/navigation";
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

    await prismadb.kitsFinishing.deleteMany({
      where:{
        productId: params.productId
      }
    });

    const body = await req.json();
    if(body.length!==0){
      const updatedFinishing = await prismadb.kitsFinishing.createMany({
        data: [
          ...body.map((data: { name: string, url: string }) => ({
            name: data.name,
            url: data.url,
            productId: params.productId
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
      return NextResponse.json(updatedFinishing);
    }
    return NextResponse.json('');
  } catch (error) {
    console.log('[KITS_FINISHING_POST]', error);
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

    const all_kits_finishing = await prismadb.kitsFinishing.findMany({
      where: {
        productId: params.productId
      }
    });
    return NextResponse.json(all_kits_finishing);
  } catch (error) {
    console.log('[SPECIFICATION_GET]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};

  
