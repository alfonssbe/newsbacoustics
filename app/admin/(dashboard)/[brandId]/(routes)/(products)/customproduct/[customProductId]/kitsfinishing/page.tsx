import prismadb from "@/lib/prismadb";
import { KitsFinishingForm } from "./components/kits-finishing-form";


const UserPage = async (
    props: {
      params: Promise<{ brandId: string, customProductId: string }>
    }
) => {
    const params = await props.params;
    const kits_finishing_data = await prismadb.kitsFinishing.findMany({
        where: {
          productId: params.customProductId,
        },
    });

    const name_product = await prismadb.product.findFirst({
        where:{
            id: params.customProductId,
            brandId: params.brandId
        },
        select:{
            name: true
        }
    })

    const all_finishing = await prismadb.allFinishing.findMany({})

    if(!kits_finishing_data){
        return null;
    }

    if(!name_product){
        return null;
    }

    if(!all_finishing){
        return null;
    }

    return ( 
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <KitsFinishingForm initialData={kits_finishing_data} name={name_product.name} allFinishing={all_finishing}/>
            </div>
        </div>
  );
}

export default UserPage;
