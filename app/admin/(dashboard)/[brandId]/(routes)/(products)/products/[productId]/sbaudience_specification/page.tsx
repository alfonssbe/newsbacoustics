import prismadb from "@/lib/prismadb";
import { SBAudienceSpecForm } from "./components/sbaudience_specification_form";


const SBAudienceSpecPage = async (
  props: {
    params: Promise<{ productId: string, brandId: string }>
  }
) => {
  const params = await props.params;

  const specSBAudience = await prismadb.specificationSBAudience.findFirst({
    where: {
      productId: params.productId,
    },
  });

  const product = await prismadb.product.findFirst({
    where:{
      id: params.productId,
      brandId: params.brandId
    },
    select:{
      name: true
    }
  })

  return ( 
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SBAudienceSpecForm 
          initialData={specSBAudience!}
          product_name={product!.name}
        />
      </div>
    </div>
  );
}

export default SBAudienceSpecPage;
