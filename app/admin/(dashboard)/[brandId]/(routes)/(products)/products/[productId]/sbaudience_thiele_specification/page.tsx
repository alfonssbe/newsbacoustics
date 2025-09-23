import prismadb from "@/lib/prismadb";
import { SBAudienceThieleSpecForm } from "./components/sbaudience_thiele_specification_form";


const SBAudienceThieleSpecPage = async (
  props: {
    params: Promise<{ productId: string, brandId: string }>
  }
) => {
  const params = await props.params;

  const thieleSmallParametersSBAudience = await prismadb.thieleSmallParameters.findFirst({
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
        <SBAudienceThieleSpecForm 
          initialData={thieleSmallParametersSBAudience!}
          product_name={product!.name}
        />
      </div>
    </div>
  );
}

export default SBAudienceThieleSpecPage;
