import prismadb from "@/lib/prismadb";
import { SBAudienceHornsSpecForm } from "./components/sbaudience_horns_specification_form";


const SBAudienceHornsSpecPage = async (
  props: {
    params: Promise<{ productId: string, brandId: string }>
  }
) => {
  const params = await props.params;

  const specSBAudienceHorns = await prismadb.hornsSpecificationSBAudience.findFirst({
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
        <SBAudienceHornsSpecForm 
          initialData={specSBAudienceHorns!}
          product_name={product!.name}
        />
      </div>
    </div>
  );
}

export default SBAudienceHornsSpecPage;
