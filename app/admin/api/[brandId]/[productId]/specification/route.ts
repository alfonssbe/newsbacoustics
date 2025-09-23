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

    const { impedance,
      dc_resistance_re  ,
      coil_inductance_le  ,
      effective_piston_area_sd  ,
      voice_coil_diameter ,
      voice_coil_height ,
      air_gap_height  ,
      linear_coil_travel_pp ,
      moving_mass_mms ,
      free_air_resonance_fs ,
      sensitivity ,
      mechanical_q_factor_qms ,
      electrical_q_factor_qes ,
      total_q_factor_qts  ,
      force_factor_bi ,
      rated_power_handling  ,
      magnetic_flux_density ,
      magnet_weight ,
      net_weight  ,
      equivalent_volume_vas ,
      compliance_cms  ,
      mechanical_loss_rms ,
      recommended_frequency_range ,
      max_mechanical_cone_excursion_xmech,
      custom_note,
      cone_material,
      dome_material,
      mounting_diameter,
      searchbox_desc} = body;
    
    if(!(await checkAuth(session.isAdmin!, params.brandId, session.userId!))){
      return NextResponse.json("unauthorized");
    }
    
    if (!params.productId) {
      return new NextResponse("Product id is required", { status: 400 });
    }

    const specification = await prismadb.specification.create({
      data: {
      impedance,
      dc_resistance_re,
      coil_inductance_le,
      effective_piston_area_sd,
      voice_coil_diameter,
      voice_coil_height,
      air_gap_height,
      linear_coil_travel_pp,
      moving_mass_mms,
      free_air_resonance_fs,
      sensitivity,
      mechanical_q_factor_qms,
      electrical_q_factor_qes,
      total_q_factor_qts,
      force_factor_bi,
      rated_power_handling,
      magnetic_flux_density,
      magnet_weight,
      net_weight,
      equivalent_volume_vas,
      compliance_cms,
      mechanical_loss_rms,
      recommended_frequency_range,
      max_mechanical_cone_excursion_xmech,
      custom_note,
      cone_material,
      dome_material,
      mounting_diameter,
      searchbox_desc,
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
        specId: specification.id,
        updatedBy: session.name,
        updatedAt: new Date()
      }
    });

    return NextResponse.json({specification, updatedProduct});
  } catch (error) {
    console.log('[SPECIFICATION_POST]', error);
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

    const specification = await prismadb.specification.findMany({
      where: {
        productId: params.productId
      }
    });
    return NextResponse.json(specification);
  } catch (error) {
    console.log('[SPECIFICATION_GET]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};
