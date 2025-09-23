import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";
import { checkAuth, checkBearerAPI, getSession } from "@/lib/actions";
import { redirect } from "next/navigation";

export async function GET(req: Request, props: { params: Promise<{ hornsSpecificationId: string }> }) {
  const params = await props.params;
  try {
    if (!params.hornsSpecificationId) {
      return new NextResponse("Horns Specification id is required", { status: 400 });
    }

    const hornsspecification = await prismadb.hornsSpecificationSBAudience.findUnique({
      where: {
        id: params.hornsSpecificationId
      }
    });
    return NextResponse.json(hornsspecification);
  } catch (error) {
    console.log('[SINGLE_HORNS_SPECIFICATION_GET]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};


export async function PATCH(
  req: Request,
  props: { params: Promise<{ productId: string, brandId: string, hornsSpecificationId: string }> }
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
        custom_note } = body;

    if (!params.productId) {
      return new NextResponse("Product id is required", { status: 400 });
    }
    
    if(!(await checkAuth(session.isAdmin!, params.brandId, session.userId!))){
      return NextResponse.json("unauthorized");
    }    
    
    const hornsspecification = await prismadb.hornsSpecificationSBAudience.update({
      where: {
        id : params.hornsSpecificationId
      },
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
        updatedAt: new Date(),
        custom_note 
      }
    });

    const updatedProduct = await prismadb.product.update({
      where:{
        id: params.productId,
        brandId: params.brandId
      },
      data: {
        updatedBy: session.name,
        updatedAt: new Date()
      }
    });
  
    return NextResponse.json(hornsspecification);
  } catch (error) {
    console.log('[SINGLE_HORNS_SPECIFICATION_PATCH]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};
