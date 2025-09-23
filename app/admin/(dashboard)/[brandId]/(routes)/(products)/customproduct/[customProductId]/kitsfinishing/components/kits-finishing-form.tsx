"use client"

import { useEffect, useState } from "react"
import { allFinishing, Brand, kitsFinishing, Roles } from "@prisma/client"
import { useParams, useRouter } from "next/navigation"

import { Button } from "@/app/admin/components/ui/button"

import { Separator } from "@/app/admin/components/ui/separator"
import { Heading } from "@/app/admin/components/ui/heading"
import { Checkbox } from "@/app/admin/components/ui/checkbox"
import axios, { AxiosResponse } from "axios"
import toast from "react-hot-toast"
import Image from "next/image"

interface KitsFinishingFormProps {
  initialData: kitsFinishing[] | null;
  allFinishing: allFinishing[] | null;
  name: String;
};

export const KitsFinishingForm: React.FC<KitsFinishingFormProps> = ({
  initialData, allFinishing, name
}) => {
  const params = useParams();
  const router = useRouter();
  const [allSelectedFinishing, setAllSelectedFinishing] = useState<kitsFinishing[]>([]);
  const [loading, setLoading] = useState(false);
  const [allChecked, setAllChecked] = useState<boolean[]>([]);
  
  const title = initialData ? 'Edit Kits Finishing' : 'Add Kits Finishing';
  const description = `For ${name}`;
  const toastMessage = initialData ? 'Kits Finishing updated.' : 'Kits Finishing Added.';
  const action = initialData ? 'Save changes' : 'Create';
  
  useEffect(() => {
    const checkedState = allFinishing?.map((finishing) => 
      initialData?.some((data) => data.name === finishing.name) || false
    ) || [];
    setAllChecked(checkedState);
    setAllSelectedFinishing(initialData || []);
  }, [initialData, allFinishing]);
  
  function addFinishing(name: string, url: string, index: number){
    const updatedCheckedState = [...allChecked];
    const updatedFinishing = [...allSelectedFinishing];
    
    if (updatedCheckedState[index]) {
      updatedCheckedState[index] = false;
      const roleIndex = updatedFinishing.findIndex(finishing => finishing.name === name);
      if (roleIndex !== -1) {
        updatedFinishing.splice(roleIndex, 1);
      }
    } else {
      updatedCheckedState[index] = true;
      updatedFinishing.push({
        id: index.toString(),
        name,
        url,
        //@ts-ignore
        productId: params.customProductId
      });
    }
    
    setAllChecked(updatedCheckedState);
    setAllSelectedFinishing(updatedFinishing);
  }
 
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      setLoading(true);
      
      if (allSelectedFinishing.length === 0) {
        let tempFinishing: kitsFinishing[] = [{
          id: '0',
          name: '',
          url: '',
          productId: initialData![0].productId
        }] 
        setAllSelectedFinishing(tempFinishing)
      }
        let response = await axios.post(`${process.env.NEXT_PUBLIC_ADMIN_FOLDER_URL}/api/${params.brandId}/${params.customProductId}/kitsfinishing`, allSelectedFinishing);
      if(response.data === 'expired_session'){
        router.push(`${process.env.NEXT_PUBLIC_ADMIN_FOLDER_URL}/`);
        router.refresh();
        toast.error("Session expired, please login again")
      }
      else if(response.data === 'invalid_token'){
        router.push(`${process.env.NEXT_PUBLIC_ADMIN_FOLDER_URL}/`);
        router.refresh();
        toast.error("API Token Invalid, please login again")
      }
      else if(response.data === 'not_admin'){
        router.push(`${process.env.NEXT_PUBLIC_ADMIN_FOLDER_URL}/`);
        router.refresh();
        toast.error("Unauthorized!")
      }
      router.push(`${process.env.NEXT_PUBLIC_ADMIN_FOLDER_URL}/${params.brandId}/customproduct`);
      router.refresh();
      toast.success(toastMessage);
    } catch (error: any) {
      toast.error('Something went wrong.');
    } finally {
      setLoading(false);
    }
  };



  return (
    <>
     <div key={"1"} className="flex items-center justify-between">
        <Heading title={title} description={description} />
      </div>
      <Separator />
        <form onSubmit={handleSubmit} className="space-y-8 w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {allFinishing?.map((finishing, index) => (
              <div key={index} className={`items-center flex space-x-2 border rounded-lg p-4 shadow-lg justify-center duration-300 ease-in-out ${allChecked[index] ? 'shadow-primary/70' : ''}`}>
                <Checkbox 
                  id={`${index}`} 
                  onClick={() => addFinishing(finishing.name, finishing.url, index)}
                  checked={allChecked[index]}
                />
                <div className="gap-1.5 leading-none flex flex-col justify-center text-center" key={index}>
                    <Image src={finishing.url.startsWith('/uploads/') ? `${process.env.NEXT_PUBLIC_ROOT_URL}${finishing.url}` : finishing.url } alt={finishing.name} width={200} height={200}/>
                  <label
                    htmlFor={`terms${index}`}
                    className="text-sm font-bold"
                  >
                    {finishing.name}
                  </label>
                </div>
              </div>
            ))}
          </div>
          <Button disabled={loading} className="w-full flex gap-2 bg-green-500 text-white hover:bg-green-600 transition-colors" type="submit">
            {action}
          </Button>
        </form>
    </>
  );
};
