import { NextResponse } from 'next/server';

import prismadb from '@/lib/prismadb';
import { checkAuth, checkBearerAPI, getSession } from '@/lib/actions';
 
export async function POST(
  req: Request,
  props: { params: Promise<{ brandId: string, productId: string }> }
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

    const {  fs,
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
      ebp} = body;
    
    if(!(await checkAuth(session.isAdmin!, params.brandId, session.userId!))){
      return NextResponse.json("unauthorized");
    }
    
    if (!params.productId) {
      return new NextResponse("Product id is required", { status: 400 });
    }

    const thielespecification = await prismadb.thieleSmallParameters.create({
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
        updatedAt: new Date(),
        createdAt: new Date(),
        productId: params.productId
      }
    });

    const updatedProduct = await prismadb.product.update({
      where:{
        id: params.productId,
        brandId: params.brandId
      },
      data: {
        thielesmallparametersSBAudienceId: thielespecification.id,
        updatedBy: session.name,
        updatedAt: new Date()
      }
    });

    return NextResponse.json({thielespecification, updatedProduct});
  } catch (error) {
    console.log('[THIELE_SPECIFICATION_POST]', error);
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

    const thielespecification = await prismadb.thieleSmallParameters.findMany({
      where: {
        productId: params.productId
      }
    });
    return NextResponse.json(thielespecification);
  } catch (error) {
    console.log('[THIELE_SPECIFICATION_GET]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};
