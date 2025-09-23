import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";
import { checkAuth, checkBearerAPI, getSession } from "@/lib/actions";

export async function GET(
  req: Request,
  props: { params: Promise<{ specificationHFSBAudienceId: string }> }
) {
  const params = await props.params;
  try {
    if (!params.specificationHFSBAudienceId) {
      return new NextResponse("SB Audience HF Specification id is required", { status: 400 });
    }

    const sbaudiencehfspecification = await prismadb.specificationHFSBAudience.findUnique({
      where: {
        id: params.specificationHFSBAudienceId
      }
    });
    return NextResponse.json(sbaudiencehfspecification);
  } catch (error) {
    console.log('[SINGLE_SB_AUDIENCE_HF_SPECIFICATION_GET]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};


export async function PATCH(
  req: Request,
  props: { params: Promise<{ productId: string, brandId: string, specificationHFSBAudienceId: string }> }
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
      cone_surround } = body;

    if (!params.productId) {
      return new NextResponse("Product id is required", { status: 400 });
    }
    
    if(!(await checkAuth(session.isAdmin!, params.brandId, session.userId!))){
      return NextResponse.json("unauthorized");
    }    
    
    const sbaudienceHFspecification = await prismadb.specificationHFSBAudience.update({
      where: {
        id : params.specificationHFSBAudienceId
      },
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
  
    return NextResponse.json(sbaudienceHFspecification);
  } catch (error) {
    console.log('[SINGLE_SB_AUDIENCE_HF_SPECIFICATION_PATCH]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};
