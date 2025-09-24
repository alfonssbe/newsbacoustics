import { NextResponse } from 'next/server';

import prismadb from '@/lib/prismadb';
import { checkAuth, checkBearerAPI, getSession } from '@/lib/actions';
import { Cover_Image, Drawing_Image, Graph_Image, Image_Catalogues, multiple3DModels, multipleDatasheetProduct, multipleFRDZMAFiles } from '@prisma/client';

const slugify = (str: string): string => {
  const normalizedStr = str.replace(/["“”‟″‶〃״˝ʺ˶ˮײ]/g, "'");
  const strAfterQuote = normalizedStr.includes("'") ? normalizedStr.split("'")[1] : normalizedStr;
  const strBeforeSlash = strAfterQuote.includes('/') ? strAfterQuote.split('/')[0] : strAfterQuote;
  const strWithoutSatori = strBeforeSlash.replace(/SATORI/gi, '');
  return strWithoutSatori.toLowerCase()
                         .replace(/[^a-z0-9]+/g, '-')
                         .replace(/(^-|-$)+/g, '');
};

export async function POST(req: Request, props: { params: Promise<{ brandId: string }> }) {
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

    const { name, sizeId,  description, isFeatured, isArchived, isCustom, isKits, isCoax, isNewProduct, images_catalogues, cover_img, drawing_img, graph_img, multipleDatasheetProduct, multipleFRDZMAFiles, multiple3DModels, oemQuantity, navbarNotes } = body;

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!params.brandId) {
      return new NextResponse("brand id is required", { status: 400 });
    }
    
    if(!(await checkAuth(session.isAdmin!, params.brandId, session.userId!))){
      return NextResponse.json("unauthorized");
    }    

    const duplicates = await prismadb.product.findFirst({
      where:{
        name,
        brandId: params.brandId
      }
    })

    if(duplicates){
      return NextResponse.json("duplicate")
    }

    const product = await prismadb.product.create({
      data: {
        name: name,
        slug: slugify(name),
        description,
        isFeatured,
        isArchived,
        isCustom,
        isKits,
        isCoax,
        isNewProduct,
        sizeId,
        oemQuantity,
        navbarNotes,
        specId: "0",
        updatedBy: session.name,
        createdAt: new Date(),
        updatedAt: new Date(),
        brandId: params.brandId,
      },
    });


    if(images_catalogues.length!=0){
      images_catalogues.map(async (value: Image_Catalogues) => {
        if(value.url!=''){
          await prismadb.image_Catalogues.create({
            data:{
              productId: product.id,
              url:value.url,
              name: value.name,
              createdAt: new Date(),
              updatedAt: new Date()
            }
          })
        }
      })
    }

    if(multipleDatasheetProduct.length!=0){
      multipleDatasheetProduct.map(async (datasheet: multipleDatasheetProduct) => {
        if(datasheet.url!=''){
          await prismadb.multipleDatasheetProduct.create({
            data:{
              productId: product.id,
              url:datasheet.url,
              name: datasheet.name
            }
          })
        }
      })
    }
    
    if(multipleFRDZMAFiles.length!=0){
      multipleFRDZMAFiles.map(async (FRDZMA: multipleFRDZMAFiles) => {
        if(FRDZMA.url!=''){
          await prismadb.multipleFRDZMAFiles.create({
            data:{
              productId: product.id,
              url:FRDZMA.url,
              name: FRDZMA.name
            }
          })
        }
      })
    }

    if(multiple3DModels.length!=0){
      multiple3DModels.map(async (models: multiple3DModels) => {
        if(models.url!=''){
          await prismadb.multiple3DModels.create({
            data:{
              productId: product.id,
              url:models.url,
              name: models.name
            }
          })
        }
      })
    }

    if(cover_img.length!=0){
      cover_img.map(async (value: Cover_Image) => {
        if(value.url!=''){
          await prismadb.cover_Image.create({
            data:{
              productId: product.id,
              url:value.url,
              createdAt: new Date(),
              updatedAt: new Date()
            }
          })
        }
      })
    }

    if(drawing_img.length!=0){
      drawing_img.map(async (value: Drawing_Image) => {
        if(value.url!=''){
          await prismadb.drawing_Image.create({
            data:{
              productId: product.id,
              url:value.url,
              createdAt: new Date(),
              updatedAt: new Date()
            }
          })
        }
      })
    }

    if(graph_img.length!=0){
      graph_img.map(async (value: Graph_Image) => {
        if(value.url!=''){
          await prismadb.graph_Image.create({
            data:{
              productId: product.id,
              url:value.url,
              createdAt: new Date(),
              updatedAt: new Date()
            }
          })
        }
      })
    }

    if(params.brandId === process.env.NEXT_PUBLIC_SB_ACOUSTICS_ID) {
      const spec = await prismadb.specification.create({
        data: {
          impedance :'',
          dc_resistance_re :'',
          coil_inductance_le :'',
          effective_piston_area_sd :'',
          voice_coil_diameter:'',
          voice_coil_height:'',
          air_gap_height :'',
          linear_coil_travel_pp:'',
          moving_mass_mms:'',
          free_air_resonance_fs:'',
          sensitivity:'',
          mechanical_q_factor_qms:'',
          electrical_q_factor_qes:'',
          total_q_factor_qts :'',
          force_factor_bi:'',
          rated_power_handling :'',
          magnetic_flux_density:'',
          magnet_weight:'',
          net_weight :'',
          equivalent_volume_vas:'',
          compliance_cms :'',
          mechanical_loss_rms:'',
          recommended_frequency_range:'',
          max_mechanical_cone_excursion_xmech:'',
          custom_note:'',
          cone_material:'',
          dome_material:'',
          searchbox_desc:'',
          mounting_diameter:'',
          productId: product.id,
          updatedAt: new Date(),
          createdAt: new Date()
        }
      });
      await prismadb.product.update({
        where:{
          id: product.id,
          brandId: params.brandId
        },
        data: {
          specId: spec.id,
          updatedBy: session.name,
          updatedAt: new Date()
        }
      });
    }
    else if(params.brandId === process.env.NEXT_PUBLIC_SB_AUDIENCE_ID) {
      const spec = await prismadb.specificationSBAudience.create({
        data: {
          nominal_impedance  : '',
          minimum_impedance : '',
          aes_power_handling : '',
          maximum_power_handling : '',
          sensitivity: '',
          frequency_range: '',
          voice_coil_diameter : '',
          winding_material: '',
          former_material: '',
          winding_depth: '',
          magnetic_gap_depth: '',
          flux_density: '',
          magnet: '',
          basket_material : '',
          demodulation: '',
          cone_surround : '',
          net_air_volume_filled_by_driver: '',
          spider_profile: '',
          weather_resistant : '',
          rdc: '',
          recommended_crossover_frequency: '',
          diaphragm_material: '',
          phase_plug_design: '',
          total_exit_angle: '',
          net_air_volume_filled_by_hf_driver: '',
          nominal_throat_diameter: '',
          overall_diameter : '',
          ninety_degrees_mounting_holes_diameter : '',
          depth: '',
          net_weight : '',
          shipping_box : '',
          gross_weight : '',
          replacement_diaphragm: '',
          bolt_circle_diameter : '',
          baffle_cutout_diameter : '',
          mounting_depth : '',
          flange_and_gasket_thickness: '',
          recone_kit : '',
          custom_note: '',
          productId: product.id,
          updatedAt: new Date(),
          createdAt: new Date()
        }
      });
      await prismadb.product.update({
        where:{
          id: product.id,
          brandId: params.brandId
        },
        data: {
          specSBAudienceId: spec.id,
          updatedBy: session.name,
          updatedAt: new Date()
        }
      });
    }



    const kitsId = process.env.NEXT_PUBLIC_KITS_CATEGORY_ID ?? ''
    if (isKits) { //isKits is checked
      const checkKits = await prismadb.allProductCategory.findFirst({ //is There already a 'Kits' inside this product category?
        where: {
          productId: product.id,
          categoryId: kitsId
        }
      })
      if (!checkKits) {  //no, then add a 'Kits' category for this product
        const kits = await prismadb.allCategory.findFirst({ //check if Kits is inside allCategory
          where: {
            brandId: params.brandId,
            id: kitsId
          },
        })
        if (kits){
          await prismadb.allProductCategory.create({ //Create 'Kits' Category for this product
            data: {
              productId: product.id,
              categoryId: kits.id,
              type: kits.type,
              name: kits.name,
              slug: kits.slug,
              createdAt: new Date(),
              updatedAt: new Date(),
            }
          });
        }
      }
    }
    else{ // This is in fact, not a kits product. Then delete 'Kits' inside this product category
      try {
        const kitsCategory = await prismadb.allProductCategory.findFirst({ // Find if there is an active 'Kits' Category
          where: {
            productId: product.id,
            categoryId: kitsId
          }
        });
        if (kitsCategory) {
          await prismadb.allProductCategory.deleteMany({ // Delete 'Kits' category
            where: {
              id: kitsCategory.id
            }
          });
        }
      } catch (error) {
        // Ignore if not found
      }
    }

  
    return NextResponse.json("success");
  } catch (error) {
    console.log('[PRODUCTS_POST]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};

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
      include: {
        cover_img: true,
        drawing_img: true,
        graph_img: true,
        allCat: true,
        specification: true,
        size: true,
      },
      orderBy: {
        createdAt: 'desc',
      }
    });

    return NextResponse.json(products);
  } catch (error) {
    console.log('[PRODUCTS_GET]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};
