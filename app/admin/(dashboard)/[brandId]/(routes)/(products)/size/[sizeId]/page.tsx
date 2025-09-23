import prismadb from "@/lib/prismadb";

import { SizeForm } from "./components/size-form";

const SizePage = async (
  props: {
    params: Promise<{ brandId: string, sizeId: string }>
  }
) => {
  const params = await props.params;
  const size = await prismadb.size.findUnique({
    where: {
      id: params.sizeId,
      brandId: params.brandId
    }
  });

  return ( 
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SizeForm initialData={size} />
      </div>
    </div>
  );
}

export default SizePage;
