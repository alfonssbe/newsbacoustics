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

    const {  nominal_impedance,
      minimum_impedance,
      aes_power_handling,
      maximum_power_handling,
      sensitivity,
      frequency_range,
      voice_coil_diameter,
      winding_material,
      former_material,
      winding_depth,
      magnetic_gap_depth,
      flux_density,
      magnet,
      basket_material,
      demodulation,
      cone_surround} = body;
    
    if(!(await checkAuth(session.isAdmin!, params.brandId, session.userId!))){
      return NextResponse.json("unauthorized");
    }
    
    if (!params.productId) {
      return new NextResponse("Product id is required", { status: 400 });
    }

    const sbaudienceHFspecification = await prismadb.specificationHFSBAudience.create({
      data: {
        nominal_impedance,
        minimum_impedance,
        aes_power_handling,
        maximum_power_handling,
        sensitivity,
        frequency_range,
        voice_coil_diameter,
        winding_material,
        former_material,
        winding_depth,
        magnetic_gap_depth,
        flux_density,
        magnet,
        basket_material,
        demodulation,
        cone_surround,
        createdAt: new Date(),
        updatedAt: new Date(),
        productId: params.productId
      }
    });

    const updatedProduct = await prismadb.product.update({
      where:{
        id: params.productId,
        brandId: params.brandId
      },
      data: {
        specSBAudienceHFId: sbaudienceHFspecification.id,
        updatedBy: session.name,
        updatedAt: new Date()
      }
    });

    return NextResponse.json({sbaudienceHFspecification, updatedProduct});
  } catch (error) {
    console.log('[SB_AUDIENCE_HF_SPECIFICATION_POST]', error);
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

    const sbaudienceHFspecification = await prismadb.specificationHFSBAudience.findMany({
      where: {
        productId: params.productId
      }
    });
    return NextResponse.json(sbaudienceHFspecification);
  } catch (error) {
    console.log('[SB_AUDIENCE_HF_SPECIFICATION_GET]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};
