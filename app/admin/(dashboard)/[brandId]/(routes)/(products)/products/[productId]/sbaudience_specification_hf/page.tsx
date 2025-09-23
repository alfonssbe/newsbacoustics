import prismadb from "@/lib/prismadb";
import { SBAudienceSpecHFForm } from "./components/sbaudience_specification_hf_form";


const SBAudienceSpecPage = async (
  props: {
    params: Promise<{ productId: string, brandId: string }>
  }
) => {
  const params = await props.params;

  const spechfSBAudience = await prismadb.specificationHFSBAudience.findFirst({
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
        <SBAudienceSpecHFForm 
          initialData={spechfSBAudience!}
          product_name={product!.name}
        />
      </div>
    </div>
  );
}

export default SBAudienceSpecPage;
