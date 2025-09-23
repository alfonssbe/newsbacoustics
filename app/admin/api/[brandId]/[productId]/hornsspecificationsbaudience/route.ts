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
      nominal_coverage_horizontal,
      nominal_coverage_vertical,
      directivity_factor,
      directivity_index,
      sensitivity_on_driver,
      frequency_response,
      throat_diameter,
      minimum_recommended_crossover,
      horn_material,
      horn_finish,
      overall_dimensions_mouth_height,
      overall_dimensions_mouth_width,
      overall_dimensions_length,
      net_weight,
      gross_weight,
      carton_dimensions,
      mechanical_connection_of_driver,
      baffle_cutout_dimensions_front_mount_horizontal,
      baffle_cutout_dimensions_front_mount_vertical,
      custom_note} = body;
    
    if(!(await checkAuth(session.isAdmin!, params.brandId, session.userId!))){
      return NextResponse.json("unauthorized");
    }
    
    if (!params.productId) {
      return new NextResponse("Product id is required", { status: 400 });
    }

    const hornsspecification = await prismadb.hornsSpecificationSBAudience.create({
      data: {
        nominal_coverage_horizontal,
        nominal_coverage_vertical,
        directivity_factor,
        directivity_index,
        sensitivity_on_driver,
        frequency_response,
        throat_diameter,
        minimum_recommended_crossover,
        horn_material,
        horn_finish,
        overall_dimensions_mouth_height,
        overall_dimensions_mouth_width,
        overall_dimensions_length,
        net_weight,
        gross_weight,
        carton_dimensions,
        mechanical_connection_of_driver,
        baffle_cutout_dimensions_front_mount_horizontal,
        baffle_cutout_dimensions_front_mount_vertical,
        custom_note,
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
        specId: hornsspecification.id,
        updatedBy: session.name,
        updatedAt: new Date()
      }
    });

    return NextResponse.json({hornsspecification, updatedProduct});
  } catch (error) {
    console.log('[HORNS_SPECIFICATION_POST]', error);
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

    const hornsspecification = await prismadb.hornsSpecificationSBAudience.findMany({
      where: {
        productId: params.productId
      }
    });
    return NextResponse.json(hornsspecification);
  } catch (error) {
    console.log('[HORNS_SPECIFICATION_GET]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};
