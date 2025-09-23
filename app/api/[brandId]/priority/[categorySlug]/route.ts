import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function GET(req: Request, props: { params: Promise<{ brandId: string, categorySlug: string }> }) {
  const params = await props.params;
  try {
    if (!params.brandId) {
      return new NextResponse("Brand id is required", { status: 400 });
    }
    if (!params.categorySlug) {
      return new NextResponse("Category Slug is required", { status: 400 });
    }

    const catId = await prismadb.allCategory.findFirst({
      where: {
        slug: params.categorySlug,
        brandId: params.brandId
      },
      select: {
        id: true
      }
    });

    if (catId) {
        const allPriority = await prismadb.menuPriority.findMany({
            where: {
                categoryId: catId.id
            }
        })
        return NextResponse.json(allPriority);
    }
  
    return NextResponse.json([]);
  } catch (error) {
    console.log('[SIZES_GET]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};