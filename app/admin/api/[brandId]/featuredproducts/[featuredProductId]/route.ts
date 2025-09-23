import { NextResponse } from 'next/server';

import prismadb from '@/lib/prismadb';
import { checkAuth, checkBearerAPI, getSession } from '@/lib/actions';
import { Featured_Image } from '@prisma/client';
import path from 'path';
import fs from 'fs/promises';

export async function GET(
  req: Request,
  props: { params: Promise<{ brandId: string, featuredProductId: string }> }
) {
  const params = await props.params;
  try {

    if (!params.brandId) {
      return new NextResponse("brand id is required", { status: 400 });
    }

    const products = await prismadb.product.findMany({
      where: {
        brandId: params.brandId,
        isFeatured: true,
        isArchived: false,
        id: params.featuredProductId
      },
      include: {
        cover_img: true,
      },
      orderBy: {
        createdAt: 'desc',
      }
    });

    return NextResponse.json(products);
  } catch (error) {
    console.log('[SINGLE_FEATURED_PRODUCTS_GET]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};


export async function PATCH(
  req: Request,
  props: { params: Promise<{ featuredProductId: string, brandId: string }> }
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

    const { featured_img, isFeatured, featuredDesc } = body;

    if (!params.featuredProductId) {
      return new NextResponse("Product id is required", { status: 400 });
    }

    if(!(await checkAuth(session.isAdmin!, params.brandId, session.userId!))){
      return NextResponse.json("unauthorized");
    }    



    //FEATURED_IMAGE
    const featuredImageOld = await prismadb.featured_Image.findMany({
      where: {
        productId: params.featuredProductId,
      },
    });
    let finalfoundFeaturedImage : Featured_Image[] = []
    featuredImageOld.forEach((val) => {
      const found = featured_img.find((value: Featured_Image) => value.url === val.url);
      
      if (found && !finalfoundFeaturedImage.some((item) => item.url === found.url)) {
        finalfoundFeaturedImage.push(found);
      }
    });
    //DELETE FeaturedImage
    //Delete physical files
    for (const featuredImg of featuredImageOld) {
      const isInFinal = finalfoundFeaturedImage.some((item) => item.url === featuredImg.url);
      if (isInFinal) continue;

      if (featuredImg.url) {
        const featuredImgPath = path.join(process.cwd(), featuredImg.url);

        try {
          await fs.unlink(featuredImgPath);
        } catch (error) {
          console.warn(`Could not delete file ${featuredImg.url}:`, error);
        }
      }
    }
    //Delete oldFeaturedImage records
    await prismadb.featured_Image.deleteMany({
      where: {
        productId: params.featuredProductId,
        url: {
          notIn: finalfoundFeaturedImage.map((val) => val.url),
        },
      },
    });
    if (featured_img.length !== 0) {
      const creations = featured_img.map(async (value: Featured_Image) => {
        if(value !== null && value !== undefined){
          const alreadyInDB = finalfoundFeaturedImage.some((val) => val.url === value.url);
          if (!alreadyInDB && value.url !== '') {
            await prismadb.featured_Image.create({
              data: {
                productId: params.featuredProductId,
                url: value.url,
                createdAt: new Date(),
                updatedAt: new Date()
              }
            });
          }
        }
      });

      await Promise.all(creations);
    }


    if (!isFeatured) {
      //Delete physical files
      for (const featuredImg of featuredImageOld) {
        if (featuredImg.url) {
          const featuredImgPath = path.join(process.cwd(), featuredImg.url);

          try {
            await fs.unlink(featuredImgPath);
          } catch (error) {
            console.warn(`Could not delete file when isFeatured is false - ${featuredImg.url}:`, error);
          }
        }
      }
      //Delete oldFeaturedImage records
      await prismadb.featured_Image.deleteMany({
        where: {
          productId: params.featuredProductId
        },
      });
    }



    await prismadb.product.update({
      where: {
        id: params.featuredProductId,
        brandId: params.brandId
      },
      data: {
        isFeatured,
        featuredDesc,
        updatedAt: new Date(),
        updatedBy: session.name,
      },
    })

    return NextResponse.json("success");
  } catch (error) {
    console.log('[FEATURED_PRODUCT_PATCH]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};
  