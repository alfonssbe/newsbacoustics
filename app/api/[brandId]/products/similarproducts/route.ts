import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function GET(req: Request, props: { params: Promise<{ brandId: string }> }) {
  const params = await props.params;
  try {
    if (!params.brandId) {
      return new NextResponse("brand id is required", { status: 400 });
    }

    const products = await prismadb.product.findMany({
      where: {
        brandId: params.brandId,
        isArchived: false,
      },
      select:{
          name: true,
          slug: true,
          id: true,
      }
    });

    const productIds = products.map(product => product.id);

    const categories = await prismadb.allProductCategory.findMany({
      where:{
          productId:{
              in: productIds
          },
          type: "Sub Category"
      },
      select:{
          type: true,
          name: true,
          productId: true
      }
    })

    const image_url = await prismadb.cover_Image.findMany({
      where:{
        productId:{
          in:productIds
        }
      },
      select:{
        productId: true,
        url: true
      }
    })
    
    const full_Spec = await prismadb.specification.findMany({
      where:{
        productId:{
          in:productIds
        }
      }
    })
  const productsWithCategoriesandImage = products.map(product => {
      const productCategories = categories.filter(category => category.productId === product.id);
      
      const categoryDetails = productCategories.map(category => ({
      type: category.type,
      name: category.name,
      }));

      const productImage = image_url.filter(image => image.productId === product.id);
      const final_Url = productImage.map(url => ({
       url: url.url
      }));

      
      const selected_spec = full_Spec.filter(spec => spec.productId === product.id);
      const final_spec = selected_spec.map(spec => ({
        impedance: spec.impedance,
        dc_resistance_re: spec.dc_resistance_re,
        coil_inductance_le: spec.coil_inductance_le,
        effective_piston_area_sd: spec.effective_piston_area_sd,
        voice_coil_diameter: spec.voice_coil_diameter,
        voice_coil_height: spec.voice_coil_height,
        air_gap_height: spec.air_gap_height,
        linear_coil_travel_pp: spec.linear_coil_travel_pp,
        moving_mass_mms: spec.moving_mass_mms,
        free_air_resonance_fs: spec.free_air_resonance_fs,
        sensitivity: spec.sensitivity,
        mechanical_q_factor_qms: spec.mechanical_q_factor_qms,
        electrical_q_factor_qes: spec.electrical_q_factor_qes,
        total_q_factor_qts: spec.total_q_factor_qts,
        force_factor_bi: spec.force_factor_bi,
        rated_power_handling: spec.rated_power_handling,
        magnetic_flux_density: spec.magnetic_flux_density,
        magnet_weight: spec.magnet_weight,
        net_weight: spec.net_weight,
        equivalent_volume_vas: spec.equivalent_volume_vas,
        compliance_cms: spec.compliance_cms,
        mechanical_loss_rms: spec.mechanical_loss_rms,
        recommended_frequency_range: spec.recommended_frequency_range,
        max_mechanical_cone_excursion_xmech: spec.max_mechanical_cone_excursion_xmech,
        custom_note: spec.custom_note
      }));
  
      return {
        productName: product.name,
        productSlug: product.slug,
        categories: categoryDetails,
        url: final_Url,
        spec: final_spec
      };
  });

  const sortedProducts = productsWithCategoriesandImage.sort((a, b) => a.productSlug.localeCompare(b.productSlug));
    return NextResponse.json(sortedProducts);


  } catch (error) {
    console.log('[SIMILAR_PRODUCTS_GET]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};