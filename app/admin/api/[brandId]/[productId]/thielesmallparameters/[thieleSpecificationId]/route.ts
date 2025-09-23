import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";
import { checkAuth, checkBearerAPI, getSession } from "@/lib/actions";

export async function GET(
  req: Request,
  props: { params: Promise<{ thieleSpecificationId: string }> }
) {
  const params = await props.params;
  try {
    if (!params.thieleSpecificationId) {
      return new NextResponse("Thiele Specification id is required", { status: 400 });
    }

    const thielespecification = await prismadb.thieleSmallParameters.findUnique({
      where: {
        id: params.thieleSpecificationId
      }
    });
    return NextResponse.json(thielespecification);
  } catch (error) {
    console.log('[SINGLE_THIELE_SPECIFICATION_GET]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};


export async function PATCH(
  req: Request,
  props: { params: Promise<{ productId: string, brandId: string, thieleSpecificationId: string }> }
) {
  const params = await props.params;
  try {
    const session = await getSession();

    if(!session.isLoggedIn || !session){
      return NextResponse.json("expired_session")
    }

    if(!(await checkBearerAPI(session))){
      session.destroy();
      return NextResponse.json("invalid_token")
    }

    const body = await req.json();

    const { 
      fs,
      re,
      qes,
      qms,
      qts,
      vas,
      sd,
      x_max,
      xdamage,
      mms,
      bi,
      le,
      cms,
      rms,
      eta_zero,
      ebp } = body;

    if (!params.productId) {
      return new NextResponse("Product id is required", { status: 400 });
    }
    
    if(!(await checkAuth(session.isAdmin!, params.brandId, session.userId!))){
      return NextResponse.json("unauthorized");
    }    
    
    const thielespecification = await prismadb.thieleSmallParameters.update({
      where: {
        id : params.thieleSpecificationId
      },
      data: {
        fs,
        re,
        qes,
        qms,
        qts,
        vas,
        sd,
        x_max,
        xdamage,
        mms,
        bi,
        le,
        cms,
        rms,
        eta_zero,
        ebp,
        updatedAt: new Date()
      }
    });

    await prismadb.product.update({
      where:{
        id: params.productId,
        brandId: params.brandId
      },
      data: {
        updatedBy: session.name,
        updatedAt: new Date()
      }
    });
  
    return NextResponse.json(thielespecification);
  } catch (error) {
    console.log('[SINGLE_THIELE_SPECIFICATION_PATCH]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};
