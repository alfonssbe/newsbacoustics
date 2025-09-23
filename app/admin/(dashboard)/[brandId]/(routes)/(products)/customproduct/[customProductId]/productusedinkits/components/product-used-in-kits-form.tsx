"use client"

import axios from "axios"
import { useEffect, useState } from "react"
import { toast } from "react-hot-toast"
import { ChevronsUpDown, Trash, } from "lucide-react"
import { Product, ProductsUsedInKits } from "@prisma/client"
import { useParams, useRouter } from "next/navigation"

import { Separator } from "@/app/admin/components/ui/separator"
import { Heading } from "@/app/admin/components/ui/heading"
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/app/admin/components/ui/table"
import { Popover, PopoverContent, PopoverTrigger } from "@/app/admin/components/ui/popover"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/app/admin/components/ui/command"
import { cn } from "@/lib/utils"
import { Button } from "@/app/admin/components/ui/button"
import Image from "next/image"
 
interface ProductUsedInKitsFormProps {
  initialData: ProductsUsedInKits[];
  initialProduct: Product;
  allProducts: Product[]
  // specification: Specification;
};


export const ProductUsedInKitsForm: React.FC<ProductUsedInKitsFormProps> = ({
  initialData,
  initialProduct,
  allProducts
}) => {
  const [allProductUsedInKits, setAllProductUsedInKits] = useState<ProductsUsedInKits[]>([]);

  const params = useParams();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [openCat, setOpenCat] = useState(false);

  const title = initialData.length > 0 ? `Edit Products Used in Kits Products` : `Add Products Used in Kits Products`;
  const description = `For ${initialProduct.name}`;
  const toastMessage = initialData.length > 0 ? 'Products Used in Kits updated.' : 'Products Used in Kits created.';
  const action = initialData.length > 0 ? 'Save changes' : 'Create';

  useEffect(() => {
    if(initialData.length > 0 && initialData){
      let tempInitial: ProductsUsedInKits[] = []
      initialData.forEach((item) => {
        const produsedinkits: ProductsUsedInKits = {
          id: item.id,
          productId: item.productId,
          productUsedInKitsId: item.productUsedInKitsId,
        };
        tempInitial.push(produsedinkits)
      });
      setAllProductUsedInKits(tempInitial)
    }
  }, [initialData]);

  function deleteSelectedProd(id: String){
    setAllProductUsedInKits(allProductUsedInKits.filter(item => item.id !== id))
  }
  
  function addSelectedProd(data: String){
    const foundProduct = allProducts.find(item => item.id === data);
    if (foundProduct) {
      const found = allProductUsedInKits.some(item => item.productUsedInKitsId === foundProduct.id);
      if (found) {
        toast.error('Item already selected.');
      } else {
        let tempProd : ProductsUsedInKits = {
          id: Math.random().toString(),
          productId: initialProduct.id,
          productUsedInKitsId: foundProduct.id,
          // @ts-ignore
          image_url: foundProduct.cover_img[0].url,
          name: foundProduct.name.replace('inch', '"'),
          href: `/products/${foundProduct.slug}`
        }
        setAllProductUsedInKits(prevProd => [...prevProd, tempProd]);
      }
    } else {
      console.log("No product found with the specified name.");
    }
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    const allFinalProdUsed: ProductsUsedInKits[] = [...allProductUsedInKits];
    try {
      setLoading(true);
      let response = await axios.post(`${process.env.NEXT_PUBLIC_ADMIN_FOLDER_URL}/api/${params.brandId}/${params.customProductId}/productusedinkits`, allFinalProdUsed);
      if(response.data === 'expired_session'){
        router.push(`${process.env.NEXT_PUBLIC_ADMIN_FOLDER_URL}/${params.brandId}/`);
        router.refresh();
        toast.error("Session expired, please login again");
      }
      else if(response.data === 'invalid_token'){
        router.push(`${process.env.NEXT_PUBLIC_ADMIN_FOLDER_URL}/${params.brandId}/`);
        router.refresh();
        toast.error("API Token Invalid, please login again");
      }
      else if(response.data === 'unauthorized'){
        router.push(`${process.env.NEXT_PUBLIC_ADMIN_FOLDER_URL}/${params.brandId}/`);
        router.refresh();
        toast.error("Unauthorized!");
      }
      else{
        router.push(`${process.env.NEXT_PUBLIC_ADMIN_FOLDER_URL}/${params.brandId}/customproduct`);
        router.refresh();
        toast.success(toastMessage);
      }
    } catch (error: any) {
      toast.error('Something went wrong.');
    } finally {
      setLoading(false);
    }
  };


  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
      </div>
      <Separator />
      <div className="w-full">
      <form onSubmit={handleSubmit} className="w-full space-y-4">
        <div className="md:grid md:grid-cols-2 gap-8">


          <div className="border rounded-lg p-4 shadow-lg">
            <div className="font-bold mb-2">Selected Products</div>
            <Popover open={openCat} onOpenChange={setOpenCat}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                role="combobox"
                aria-expanded={openCat}
                aria-label="Select a Brand"
                className={cn("w-full justify-between")}
              >
                Select
                <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0">
              <Command>
                <CommandList>
                  <CommandInput placeholder={`Search Products Used in ${initialProduct.name}...`} />
                  <CommandEmpty>No Products found.</CommandEmpty>
                  <CommandGroup>
                    
                    {allProducts.map((prod) => (
                      <CommandItem
                        key={prod.name}
                        onSelect={() => {
                          addSelectedProd(prod.id);
                          setOpenCat(false);
                        }}
                        className="text-sm"
                      >
                        {//@ts-ignore}
                        }<Image src={prod.cover_img[0].url.startsWith('/uploads/') ? `${process.env.NEXT_PUBLIC_ROOT_URL}${prod.cover_img[0].url}` : prod.cover_img[0].url} alt={prod.name} width={100} height={100} className="w-16 h-fit pr-4"/>
                        {prod.name}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
            </Popover>
            <Table>
              <TableHeader>
                {/* <TableRow>
                  <TableHead>Selected Products</TableHead>
                  <TableHead>Delete?</TableHead>
                </TableRow> */}
              </TableHeader>
              <TableBody>
                {allProductUsedInKits?.map((prodinKits) => (  
                  //@ts-ignore          
                  <TableRow key={allProducts.find((product) => product.id === prodinKits.productUsedInKitsId)?.name} className="flex justify-between items-center"><TableCell className="font-medium flex items-center"><Image src={allProducts.find((product) => product.id === prodinKits.productUsedInKitsId)!.cover_img[0].url.startsWith('/uploads/') ? `${process.env.NEXT_PUBLIC_ROOT_URL}${allProducts.find((product) => product.id === prodinKits.productUsedInKitsId)!.cover_img[0].url}` : allProducts.find((product) => product.id === prodinKits.productUsedInKitsId)!.cover_img[0].url} alt={allProducts.find((product) => product.id === prodinKits.productUsedInKitsId)!.name} width={100} height={100} className="w-16 h-fit pr-4"/>  
                      {allProducts.find((product) => product.id === prodinKits.productUsedInKitsId)?.name}
                    </TableCell>
                    <TableCell>
                      <Button
                        disabled={loading}
                        variant="destructive"
                        size="sm"
                        onClick={() => deleteSelectedProd(prodinKits.id)}
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
        <Button disabled={loading} className="gap-2 flex w-full bg-green-500 text-white hover:bg-green-600 transition-colors" type="submit">
              {action}
        </Button>
      </form>
      </div>
    </>
  );
};
