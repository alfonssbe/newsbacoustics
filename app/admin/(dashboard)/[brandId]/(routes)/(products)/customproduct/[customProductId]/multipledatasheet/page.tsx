import prismadb from "@/lib/prismadb";
import { MultipleDatasheetForm } from "./components/multiple-datasheet-form";


const MultipleDatasheetPage = async (
    props: {
      params: Promise<{ brandId: string, customProductId: string }>
    }
) => {
    const params = await props.params;
    const multiple_datasheet_data = await prismadb.multipleDatasheetProduct.findMany({
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

    if(!name_product){
        return null;
    }

    return ( 
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <MultipleDatasheetForm initialData={multiple_datasheet_data} name={name_product.name} />
            </div>
        </div>
  );
}

export default MultipleDatasheetPage;
