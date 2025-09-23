import { NextResponse } from 'next/server';

import prismadb from '@/lib/prismadb';
import { checkAuth, checkBearerAPI, getSession } from '@/lib/actions';
import { redirect } from 'next/navigation';
 
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

    const { 
      customDesc,
      frequency_range,
      sensitivity,
      nominal_impedance,
      max_spl,
      recommended_amplifier,
      crossover_frequency,
      enclosure_type,
      port_tuning_frequency,
      driver_units,
      cabinet_material,
      speaker_dimension,
      net_weight,
      dc_resistance_re,
      voice_coil_diameter,
      voice_coil_height,
      air_gap_height,
      free_air_resonance_fs,
      rated_power_handling,
      magnetic_flux_density,
      magnet_weight,
      dome_material,
      custom_note_for_spec
       } = body;
    
    if(!(await checkAuth(session.isAdmin!, params.brandId, session.userId!))){
      return NextResponse.json("unauthorized");
    }
    
    if (!params.productId) {
      return new NextResponse("Product id is required", { status: 400 });
    }

    const customspecification = await prismadb.custom_Specification.create({
      data: {
        customDesc,
        frequency_range,
        sensitivity,
        nominal_impedance,
        max_spl,
        recommended_amplifier,
        crossover_frequency,
        enclosure_type,
        port_tuning_frequency,
        driver_units,
        cabinet_material,
        speaker_dimension,
        net_weight,
        dc_resistance_re,
        voice_coil_diameter,
        voice_coil_height,
        air_gap_height,
        free_air_resonance_fs,
        rated_power_handling,
        magnetic_flux_density,
        magnet_weight,
        dome_material,
        custom_note_for_spec,
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
        customSpecId: customspecification.id,
        updatedBy: session.name,
        updatedAt: new Date()
      }
    });

    return NextResponse.json({customspecification, updatedProduct});
  } catch (error) {
    console.log('[CUSTOM_SPECIFICATION_POST]', error);
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

    const specification = await prismadb.custom_Specification.findMany({
      where: {
        productId: params.productId
      }
    });
    return NextResponse.json(specification);
  } catch (error) {
    console.log('[CUSTOM_SPECIFICATION_GET]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};
