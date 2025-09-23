import { format } from "date-fns";

import prismadb from "@/lib/prismadb";
import { getSession } from "@/lib/actions";
import { redirect } from "next/navigation";
import { CustomProductColumn } from "./components/columns";
import { CustomProductClient } from "./components/client";

const CustomProductPage = async (
  props: {
    params: Promise<{ brandId: string }>
  }
) => {
  const params = await props.params;
  const session = await getSession();

  if(!session.isLoggedIn){
    redirect("/admin")
  }

  // const getProd = await prismadb.allProductCategory.findMany({
  //   where:{
  //     type:"Category",
  //     name:"Kits"
  //   },
  //   select: {
  //     productId: true
  //   }
  // })

  // if(!getProd){
  //   redirect("/admin")
  // }

  // const prodId = getProd.map((value) => value.productId)

  const customProd = await prismadb.product.findMany({
    where: {
      brandId: params.brandId,
      isCustom: true,
    },
    orderBy: {
      updatedAt: 'desc'
    },
    select: {
      id: true,
      name: true,
      customSpecId: true,
      updatedAt: true,
      updatedBy: true,
      isKits: true,
      isCoax: true,
    }
  });

  const formattedCustomProduct: CustomProductColumn[] = customProd.map((item) => ({
    id: item.id,
    name: item.name,
    isKits: item.isKits,
    isCoax: item.isCoax,
    updatedAt: format(item.updatedAt, 'MMMM do, yyyy'),
    updatedBy: item.updatedBy
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CustomProductClient data={formattedCustomProduct} userRole={session.isAdmin!}/>
      </div>
    </div>
  );
};

export default CustomProductPage;
