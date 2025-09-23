import { NextResponse } from 'next/server';

import prismadb from '@/lib/prismadb';
import { getSession } from '../../../../lib/actions';
import { redirect } from 'next/navigation';

export async function POST(
  req: Request,
) {
  try {
    const session = await getSession();

    if(!session.isLoggedIn){
      redirect("/admin")
    }

    if (!session.isLoggedIn) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    let URL_datasheet = await prismadb.multipleDatasheetProduct.findMany({
        select:{
            id: true,
            url: true
        }
      });

      URL_datasheet = URL_datasheet.map((value) => {
        // Assuming `value.url` contains the original URL like '/uploads/1724219555708-Sasandu-Cabinet-Drawings.pdf'
        value.url = value.url.replace('/uploads/', '/uploads/datasheet/');
        return value; // Ensure that the updated object is returned
      });

      for (const val of URL_datasheet) {
        await prismadb.multipleDatasheetProduct.update({
            where: { id: val.id },
            data: { url: val.url },
        });
      }
  
    return NextResponse.json('success');
  } catch (error) {
    console.log('[DATASHEET_POST]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};
