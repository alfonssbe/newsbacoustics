"use client"

import axios, { AxiosResponse } from "axios"
import { useEffect, useState } from "react"
import { toast } from "react-hot-toast"
import { SpecificationHFSBAudience } from "@prisma/client"
import { useParams, useRouter } from "next/navigation"

import { Input } from "@/app/admin/components/ui/input"
import { Button } from "@/app/admin/components/ui/button"
import { Separator } from "@/app/admin/components/ui/separator"
import { Heading } from "@/app/admin/components/ui/heading"
import { Label } from "@/app/admin/components/ui/label"
import { Textarea } from "@/app/admin/components/ui/textarea"


interface SBAudienceSpecHFFormProps {
  initialData: SpecificationHFSBAudience,
  product_name: string
};

export const SBAudienceSpecHFForm: React.FC<SBAudienceSpecHFFormProps> = ({
  initialData, product_name
}) => {
  const [spec, setSpec] = useState<SpecificationHFSBAudience>();
  const params = useParams();
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const title = initialData? 'Edit HF specification' : 'Create HF specification';
  const description = initialData ? `For ${product_name}` : 'Add a new HF specification';
  const toastMessage = initialData ? 'HF Specification updated.' : 'HF Specification created.';
  const action = initialData ? 'Save changes' : 'Create';


  useEffect(() => {
    if(initialData){
      setSpec(initialData)
    }
   } , [initialData]);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const tempSpecSBAudience : SpecificationHFSBAudience = {
     // @ts-ignore
     nominal_impedance: event.target[0].value,
     // @ts-ignore
     minimum_impedance: event.target[1].value,
     // @ts-ignore
     aes_power_handling: event.target[2].value,
     // @ts-ignore
     maximum_power_handling: event.target[3].value,
     // @ts-ignore
     sensitivity: event.target[4].value,
     // @ts-ignore
     frequency_range: event.target[5].value,
     // @ts-ignore
     voice_coil_diameter: event.target[6].value,
     // @ts-ignore
     winding_material: event.target[7].value,
     // @ts-ignore
     former_material: event.target[8].value,
     // @ts-ignore
     winding_depth: event.target[9].value,
     // @ts-ignore
     magnetic_gap_depth: event.target[10].value,
     // @ts-ignore
     flux_density: event.target[11].value,
     // @ts-ignore
     magnet: event.target[12].value,
     // @ts-ignore
     basket_material: event.target[13].value,
     // @ts-ignore
     demodulation: event.target[14].value,
     // @ts-ignore
     cone_surround: event.target[15].value,
      productId: "",
      createdAt:new Date(),
      updatedAt:new Date(),
      id:"",
    }
    
   
    try {
      setLoading(true);
      let response: AxiosResponse;
      if (initialData) {
        response = await axios.patch(`${process.env.NEXT_PUBLIC_ADMIN_FOLDER_URL}/api/${params.brandId}/${params.productId}/specificationhfsbaudience/${initialData.id}`, tempSpecSBAudience);
      } else {
        response = await axios.post(`${process.env.NEXT_PUBLIC_ADMIN_FOLDER_URL}/api/${params.brandId}/${params.productId}/specificationhfsbaudience`, tempSpecSBAudience);
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
            <Label htmlFor="nominal_impedance">Nominal Impedance (Ω)</Label>
            <Input disabled={loading} id="nominal_impedance" placeholder="nominal_impedance value" defaultValue={spec?.nominal_impedance? spec.nominal_impedance : ""} />
            </div>
            <div>
            <Label htmlFor="minimum_impedance">Minimum Impedance (Ω)</Label>
            <Input disabled={loading} id="minimum_impedance" placeholder="minimum_impedance value" defaultValue={spec?.minimum_impedance? spec.minimum_impedance : ""} />
            </div>
            <div>
            <Label htmlFor="aes_power_handling">AES Power Handling (W)</Label>
            <Input disabled={loading} id="aes_power_handling" placeholder="aes_power_handling value" defaultValue={spec?.aes_power_handling? spec.aes_power_handling : ""} />
            </div>
            <div>
            <Label htmlFor="maximum_power_handling">Maximum Power Handling (W)</Label>
            <Input disabled={loading} id="maximum_power_handling" placeholder="maximum_power_handling value" defaultValue={spec?.maximum_power_handling? spec.maximum_power_handling : ""} />
            </div>
            <div>
            <Label htmlFor="sensitivity">Sensitivity (1W/1m) (dB)</Label>
            <Input disabled={loading} id="sensitivity" placeholder="sensitivity value" defaultValue={spec?.sensitivity? spec.sensitivity : ""} />
            </div>
            <div>
            <Label htmlFor="frequency_range">Frequency Range (Hz)</Label>
            <Input disabled={loading} id="frequency_range" placeholder="frequency_range value" defaultValue={spec?.frequency_range? spec.frequency_range : ""} />
            </div>
            <div>
            <Label htmlFor="voice_coil_diameter">Voice Coil Diameter (mm)</Label>
            <Input disabled={loading} id="voice_coil_diameter" placeholder="voice_coil_diameter value" defaultValue={spec?.voice_coil_diameter? spec.voice_coil_diameter : ""} />
            </div>
            <div>
            <Label htmlFor="winding_material">Winding Material</Label>
            <Input disabled={loading} id="winding_material" placeholder="winding_material value" defaultValue={spec?.winding_material? spec.winding_material : ""} />
            </div>
            <div>
            <Label htmlFor="former_material">Former Material</Label>
            <Input disabled={loading} id="former_material" placeholder="former_material value" defaultValue={spec?.former_material? spec.former_material : ""} />
            </div>
            <div>
            <Label htmlFor="winding_depth">Winding Depth (mm)</Label>
            <Input disabled={loading} id="winding_depth" placeholder="winding_depth value" defaultValue={spec?.winding_depth? spec.winding_depth : ""} />
            </div>
            <div>
            <Label htmlFor="magnetic_gap_depth">Magnetic Gap Depth (mm)</Label>
            <Input disabled={loading} id="magnetic_gap_depth" placeholder="magnetic_gap_depth value" defaultValue={spec?.magnetic_gap_depth? spec.magnetic_gap_depth : ""} />
            </div>
            <div>
            <Label htmlFor="flux_density">Flux Density (T)</Label>
            <Input disabled={loading} id="flux_density" placeholder="flux_density value" defaultValue={spec?.flux_density? spec.flux_density : ""} />
            </div>
            <div>
            <Label htmlFor="magnet">Magnet</Label>
            <Input disabled={loading} id="magnet" placeholder="magnet value" defaultValue={spec?.magnet? spec.magnet : ""} />
            </div>
            <div>
            <Label htmlFor="basket_material">Basket Material</Label>
            <Input disabled={loading} id="basket_material" placeholder="basket_material value" defaultValue={spec?.basket_material? spec.basket_material : ""} />
            </div>
            <div>
            <Label htmlFor="demodulation">Demodulation</Label>
            <Input disabled={loading} id="demodulation" placeholder="demodulation value" defaultValue={spec?.demodulation? spec.demodulation : ""} />
            </div>
            <div>
            <Label htmlFor="cone_surround">Cone Surround</Label>
            <Input disabled={loading} id="cone_surround" placeholder="cone_surround value" defaultValue={spec?.cone_surround? spec.cone_surround : ""} />
            </div>
            </div>
          <Button disabled={loading} className="ml-auto" type="submit">
            {action}
          </Button>
        </form>
    </>
  );
};
