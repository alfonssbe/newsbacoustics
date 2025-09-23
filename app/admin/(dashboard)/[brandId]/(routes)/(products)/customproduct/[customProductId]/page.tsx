import prismadb from "@/lib/prismadb";
import { CustomSpecForm } from "./components/custom-product-form";

const CustomProductPage = async (
  props: {
    params: Promise<{ brandId: string, customProductId: string }>
  }
) => {
  const params = await props.params;
  const product = await prismadb.custom_Specification.findFirst({
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
      name: true,
      isKits: true
    }
  })

  if(!product){
    return ( 
      <div className="flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">
          {name_product &&
            <CustomSpecForm
              product_name={name_product.name}
              isKits={name_product.isKits}
            />
          }
        </div>
      </div>
    );
  }

  return ( 
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
          {name_product &&
            <CustomSpecForm
              initialData={product}
              product_name={name_product.name}
              isKits={name_product.isKits}
            />
          }
      </div>
    </div>
  );
}

export default CustomProductPage;

