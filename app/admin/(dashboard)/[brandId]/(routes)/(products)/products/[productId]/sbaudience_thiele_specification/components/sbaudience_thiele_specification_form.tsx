"use client"

import axios, { AxiosResponse } from "axios"
import { useEffect, useState } from "react"
import { toast } from "react-hot-toast"
import { HornsSpecificationSBAudience, Specification, SpecificationSBAudience, ThieleSmallParameters } from "@prisma/client"
import { useParams, useRouter } from "next/navigation"

import { Input } from "@/app/admin/components/ui/input"
import { Button } from "@/app/admin/components/ui/button"
import { Separator } from "@/app/admin/components/ui/separator"
import { Heading } from "@/app/admin/components/ui/heading"
import { Label } from "@/app/admin/components/ui/label"


interface SBAudienceThieleSpecFormProps {
  initialData: ThieleSmallParameters,
  product_name: string
};

export const SBAudienceThieleSpecForm: React.FC<SBAudienceThieleSpecFormProps> = ({
  initialData, product_name
}) => {
  const [spec, setSpec] = useState<ThieleSmallParameters>();
  const params = useParams();
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const title = initialData ? 'Edit Thiele Small Parameters' : 'Create Thiele Small Parameters';
  const description = initialData ? `For ${product_name}` : 'Add a new Thiele Small Parameters';
  const toastMessage = initialData ? 'Thiele Small Parameters updated.' : 'Thiele Small Parameters created.';
  const action = initialData ? 'Save changes' : 'Create';


  useEffect(() => {
    if(initialData){
      setSpec(initialData)
    }
   } , [initialData]);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
      
    const tempThieleSmallParametersSBAudience : ThieleSmallParameters = {
      // @ts-ignore
      fs: event.target[0].value,
      // @ts-ignore
      re: event.target[1].value,
      // @ts-ignore
      qes: event.target[2].value,
      // @ts-ignore
      qms: event.target[3].value,
      // @ts-ignore
      qts: event.target[4].value,
      // @ts-ignore
      vas: event.target[5].value,
      // @ts-ignore
      sd: event.target[6].value,
      // @ts-ignore
      x_max: event.target[7].value,
      // @ts-ignore
      xdamage: event.target[8].value,
      // @ts-ignore
      mms: event.target[9].value,
      // @ts-ignore
      bi: event.target[10].value,
      // @ts-ignore
      le: event.target[11].value,
      // @ts-ignore
      cms: event.target[12].value,
      // @ts-ignore
      rms: event.target[13].value,
      // @ts-ignore
      eta_zero: event.target[14].value,
      // @ts-ignore
      ebp: event.target[15].value,
       productId: "",
       createdAt:new Date(),
       updatedAt:new Date(),
       id:"",
     }
     
    try {
      setLoading(true);
      let response: AxiosResponse;
      if (initialData) {
        response = await axios.patch(`${process.env.NEXT_PUBLIC_ADMIN_FOLDER_URL}/api/${params.brandId}/${params.productId}/thielesmallparameters/${initialData.id}`, tempThieleSmallParametersSBAudience);
      } else {
        response = await axios.post(`${process.env.NEXT_PUBLIC_ADMIN_FOLDER_URL}/api/${params.brandId}/${params.productId}/thielesmallparameters`, tempThieleSmallParametersSBAudience);
      }
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
        router.push(`${process.env.NEXT_PUBLIC_ADMIN_FOLDER_URL}/${params.brandId}/products`);
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
        <form onSubmit={onSubmit} className="space-y-8 w-full">
          <div className="md:grid md:grid-cols-3 gap-8">
            <div>
            <Label htmlFor="fs">Fs (Hz)</Label>
            <Input disabled={loading} id="fs" placeholder="fs value" defaultValue={spec?.fs? spec.fs : ""} />
            </div>
            <div>
            <Label htmlFor="re">Re (Ω)</Label>
            <Input disabled={loading} id="re" placeholder="re value" defaultValue={spec?.re? spec.re : ""} />
            </div>
            <div>
            <Label htmlFor="qes">Qes</Label>
            <Input disabled={loading} id="qes" placeholder="qes value" defaultValue={spec?.qes? spec.qes : ""} />
            </div>
            <div>
            <Label htmlFor="qms">Qms</Label>
            <Input disabled={loading} id="qms" placeholder="qms value" defaultValue={spec?.qms? spec.qms : ""} />
            </div>
            <div>
            <Label htmlFor="qts">Qts</Label>
            <Input disabled={loading} id="qts" placeholder="qts value" defaultValue={spec?.qts? spec.qts : ""} />
            </div>
            <div>
            <Label htmlFor="vas">Vas (liters)</Label>
            <Input disabled={loading} id="vas" placeholder="vas value" defaultValue={spec?.vas? spec.vas : ""} />
            </div>
            <div>
            <Label htmlFor="sd">Sd (cm²)</Label>
            <Input disabled={loading} id="sd" placeholder="sd value" defaultValue={spec?.sd? spec.sd : ""} />
            </div>
            <div>
            <Label htmlFor="x_max">x_max (mm)</Label>
            <Input disabled={loading} id="x_max" placeholder="x_max value" defaultValue={spec?.x_max? spec.x_max : ""} />
            </div>
            <div>
            <Label htmlFor="xdamage">Xdamage (mm)</Label>
            <Input disabled={loading} id="xdamage" placeholder="xdamage value" defaultValue={spec?.xdamage? spec.xdamage : ""} />
            </div>
            <div>
            <Label htmlFor="mms">Mms (g)</Label>
            <Input disabled={loading} id="mms" placeholder="mms value" defaultValue={spec?.mms? spec.mms : ""} />
            </div>
            <div>
            <Label htmlFor="bi">BI (Tm)</Label>
            <Input disabled={loading} id="bi" placeholder="bi value" defaultValue={spec?.bi? spec.bi : ""} />
            </div>
            <div>
            <Label htmlFor="le">Le (mH)</Label>
            <Input disabled={loading} id="le" placeholder="le value" defaultValue={spec?.le? spec.le : ""} />
            </div>
            <div>
            <Label htmlFor="cms">Cms (mm/N)</Label>
            <Input disabled={loading} id="cms" placeholder="cms value" defaultValue={spec?.cms? spec.cms : ""} />
            </div>
            <div>
            <Label htmlFor="rms">Rms (kg/s)</Label>
            <Input disabled={loading} id="rms" placeholder="rms value" defaultValue={spec?.rms? spec.rms : ""} />
            </div>
            <div>
            <Label htmlFor="eta_zero">Eta Zero (%)</Label>
            <Input disabled={loading} id="eta_zero" placeholder="eta_zero value" defaultValue={spec?.eta_zero? spec.eta_zero : ""} />
            </div>
            <div>
            <Label htmlFor="ebp">EBP</Label>
            <Input disabled={loading} id="ebp" placeholder="ebp value" defaultValue={spec?.ebp? spec.ebp : ""} />
            </div>
            </div>
          <Button disabled={loading} className="ml-auto" type="submit">
            {action}
          </Button>
        </form>
    </>
  );
};
