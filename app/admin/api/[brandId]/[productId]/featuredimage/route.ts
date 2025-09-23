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

    await prismadb.featured_Image.deleteMany({
      where:{
        productId: params.productId
      }
    });

    const body = await req.json();
    const {id, productId, url, createdAt, updatedAt} = body
    const updatedfeaturedimage = await prismadb.featured_Image.create({
      data:{
        productId: params.productId,
        url,
        createdAt,
        updatedAt
      }
    });
    return NextResponse.json(updatedfeaturedimage);
    
  } catch (error) {
    console.log('[FEATURED_IMAGE_POST]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export async function DELETE(
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

    await prismadb.featured_Image.deleteMany({
      where:{
        productId: params.productId
      }
    });

   
    return NextResponse.json("Success!");
    
  } catch (error) {
    console.log('[FEATURED_IMAGE_POST]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};