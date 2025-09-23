import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";
import { checkAuth, checkBearerAPI, getSession } from "@/lib/actions";

export async function GET(
  req: Request,
  props: { params: Promise<{ specificationSBAudienceId: string }> }
) {
  const params = await props.params;
  try {
    if (!params.specificationSBAudienceId) {
      return new NextResponse("SB Audience Specification id is required", { status: 400 });
    }

    const sbaudiencespecification = await prismadb.specificationSBAudience.findUnique({
      where: {
        id: params.specificationSBAudienceId
      }
    });
    return NextResponse.json(sbaudiencespecification);
  } catch (error) {
    console.log('[SINGLE_SB_AUDIENCE_SPECIFICATION_GET]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};


export async function PATCH(
  req: Request,
  props: { params: Promise<{ productId: string, brandId: string, specificationSBAudienceId: string }> }
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
      cone_surround,
      net_air_volume_filled_by_driver,
      spider_profile,
      weather_resistant,
      rdc,
      recommended_crossover_frequency,
      diaphragm_material,
      phase_plug_design,
      total_exit_angle,
      net_air_volume_filled_by_hf_driver,
      nominal_throat_diameter,
      overall_diameter,
      ninety_degrees_mounting_holes_diameter,
      depth,
      net_weight,
      shipping_box,
      gross_weight,
      replacement_diaphragm,
      bolt_circle_diameter,
      baffle_cutout_diameter,
      mounting_depth,
      flange_and_gasket_thickness,
      recone_kit,
      custom_note } = body;

    if (!params.productId) {
      return new NextResponse("Product id is required", { status: 400 });
    }
    
    if(!(await checkAuth(session.isAdmin!, params.brandId, session.userId!))){
      return NextResponse.json("unauthorized");
    }    
    
    const sbaudiencespecification = await prismadb.specificationSBAudience.update({
      where: {
        id : params.specificationSBAudienceId
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
      net_air_volume_filled_by_driver,
      spider_profile,
      weather_resistant,
      rdc,
      recommended_crossover_frequency,
      diaphragm_material,
      phase_plug_design,
      total_exit_angle,
      net_air_volume_filled_by_hf_driver,
      nominal_throat_diameter,
      overall_diameter,
      ninety_degrees_mounting_holes_diameter,
      depth,
      net_weight,
      shipping_box,
      gross_weight,
      replacement_diaphragm,
      bolt_circle_diameter,
      baffle_cutout_diameter,
      mounting_depth,
      flange_and_gasket_thickness,
      recone_kit,
      custom_note,
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
  
    return NextResponse.json(sbaudiencespecification);
  } catch (error) {
    console.log('[SINGLE_SB_AUDIENCE_SPECIFICATION_PATCH]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};
