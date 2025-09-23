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
import { Textarea } from "@/app/admin/components/ui/textarea"


interface SBAudienceHornsSpecFormProps {
  initialData: HornsSpecificationSBAudience,
  product_name: string
};

export const SBAudienceHornsSpecForm: React.FC<SBAudienceHornsSpecFormProps> = ({
  initialData, product_name
}) => {
  const [spec, setSpec] = useState<HornsSpecificationSBAudience>();
  const params = useParams();
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const title = initialData ? 'Edit Horns specification' : 'Create Horns specification';
  const description = initialData ? `For ${product_name}` : 'Add a new Horns specification';
  const toastMessage = initialData ? 'Horns Specification updated.' : 'Horns Specification created.';
  const action = initialData ? 'Save changes' : 'Create';


  useEffect(() => {
    if(initialData){
      setSpec(initialData)
    }
   } , [initialData]);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    const tempHornsSpecSBAudience : HornsSpecificationSBAudience = {
      // @ts-ignore
      nominal_coverage_horizontal: event.target[0].value,
      // @ts-ignore
      nominal_coverage_vertical: event.target[1].value,
      // @ts-ignore
      directivity_factor: event.target[2].value,
      // @ts-ignore
      directivity_index: event.target[3].value,
      // @ts-ignore
      sensitivity_on_driver: event.target[4].value,
      // @ts-ignore
      frequency_response: event.target[5].value,
      // @ts-ignore
      throat_diameter: event.target[6].value,
      // @ts-ignore
      minimum_recommended_crossover: event.target[7].value,
      // @ts-ignore
      horn_material: event.target[8].value,
      // @ts-ignore
      horn_finish: event.target[9].value,
      // @ts-ignore
      overall_dimensions_mouth_height: event.target[10].value,
      // @ts-ignore
      overall_dimensions_mouth_width: event.target[11].value,
      // @ts-ignore
      overall_dimensions_length: event.target[12].value,
      // @ts-ignore
      net_weight: event.target[13].value,
      // @ts-ignore
      gross_weight: event.target[14].value,
      // @ts-ignore
      carton_dimensions: event.target[15].value,
      // @ts-ignore
      mechanical_connection_of_driver: event.target[16].value,
      // @ts-ignore
      baffle_cutout_dimensions_front_mount_horizontal: event.target[17].value,
      // @ts-ignore
      baffle_cutout_dimensions_front_mount_vertical: event.target[18].value,
      // @ts-ignore
      custom_note: event.target[19].value,
       productId: "",
       createdAt:new Date(),
       updatedAt:new Date(),
       id:"",
     }
    try {
      setLoading(true);
      let response: AxiosResponse;
      if (initialData) {
        response = await axios.patch(`${process.env.NEXT_PUBLIC_ADMIN_FOLDER_URL}/api/${params.brandId}/${params.productId}/hornsspecificationsbaudience/${initialData.id}`, tempHornsSpecSBAudience);
      } else {
        response = await axios.post(`${process.env.NEXT_PUBLIC_ADMIN_FOLDER_URL}/api/${params.brandId}/${params.productId}/hornsspecificationsbaudience`, tempHornsSpecSBAudience);
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
            <Label htmlFor="nominal_coverage_horizontal">Nominal Coverage Horizontal (degrees)</Label>
            <Input disabled={loading} id="nominal_coverage_horizontal" placeholder="nominal_coverage_horizontal value" defaultValue={spec?.nominal_coverage_horizontal? spec.nominal_coverage_horizontal : ""} />
            </div>
            <div>
            <Label htmlFor="nominal_coverage_vertical">Nominal Coverage Vertical (degrees)</Label>
            <Input disabled={loading} id="nominal_coverage_vertical" placeholder="nominal_coverage_vertical value" defaultValue={spec?.nominal_coverage_vertical? spec.nominal_coverage_vertical : ""} />
            </div>
            <div>
            <Label htmlFor="directivity_factor">Directivity Factor (Q)</Label>
            <Input disabled={loading} id="directivity_factor" placeholder="directivity_factor value" defaultValue={spec?.directivity_factor? spec.directivity_factor : ""} />
            </div>
            <div>
            <Label htmlFor="directivity_index">Directivity Index (Di) (dB)</Label>
            <Input disabled={loading} id="directivity_index" placeholder="directivity_index value" defaultValue={spec?.directivity_index? spec.directivity_index : ""} />
            </div>
            <div>
            <Label htmlFor="sensitivity_on_driver">Sensitivity on Driver (dB)</Label>
            <Input disabled={loading} id="sensitivity_on_driver" placeholder="sensitivity_on_driver value" defaultValue={spec?.sensitivity_on_driver? spec.sensitivity_on_driver : ""} />
            </div>
            <div>
            <Label htmlFor="frequency_response">Frequency Response @-10dB² (Hz)</Label>
            <Input disabled={loading} id="frequency_response" placeholder="frequency_response value" defaultValue={spec?.frequency_response? spec.frequency_response : ""} />
            </div>
            <div>
            <Label htmlFor="throat_diameter">Throat diameter (mm)</Label>
            <Input disabled={loading} id="throat_diameter" placeholder="throat_diameter value" defaultValue={spec?.throat_diameter? spec.throat_diameter : ""} />
            </div>
            <div>
            <Label htmlFor="minimum_recommended_crossover">Minimum Recommended Crossover (Hz)</Label>
            <Input disabled={loading} id="minimum_recommended_crossover" placeholder="minimum_recommended_crossover value" defaultValue={spec?.minimum_recommended_crossover? spec.minimum_recommended_crossover : ""} />
            </div>
            <div>
            <Label htmlFor="horn_material">Horn Material</Label>
            <Input disabled={loading} id="horn_material" placeholder="horn_material value" defaultValue={spec?.horn_material? spec.horn_material : ""} />
            </div>
            <div>
            <Label htmlFor="horn_finish">Horn Finish</Label>
            <Input disabled={loading} id="horn_finish" placeholder="horn_finish value" defaultValue={spec?.horn_finish? spec.horn_finish : ""} />
            </div>
            <div>
            <Label htmlFor="overall_dimensions_mouth_height">Overall Dimensions Mouth Height (mm)</Label>
            <Input disabled={loading} id="overall_dimensions_mouth_height" placeholder="overall_dimensions_mouth_height value" defaultValue={spec?.overall_dimensions_mouth_height? spec.overall_dimensions_mouth_height : ""} />
            </div>
            <div>
            <Label htmlFor="overall_dimensions_mouth_width">Overall Dimensions Mouth Width (mm)</Label>
            <Input disabled={loading} id="overall_dimensions_mouth_width" placeholder="overall_dimensions_mouth_width value" defaultValue={spec?.overall_dimensions_mouth_width? spec.overall_dimensions_mouth_width : ""} />
            </div>
            <div>
            <Label htmlFor="overall_dimensions_length">Overall Dimensions Length (mm)</Label>
            <Input disabled={loading} id="overall_dimensions_length" placeholder="overall_dimensions_length value" defaultValue={spec?.overall_dimensions_length? spec.overall_dimensions_length : ""} />
            </div>
            <div>
            <Label htmlFor="net_weight">Net Weight (kg)</Label>
            <Input disabled={loading} id="net_weight" placeholder="net_weight value" defaultValue={spec?.net_weight? spec.net_weight : ""} />
            </div>
            <div>
            <Label htmlFor="gross_weight">Gross Weight (kg)</Label>
            <Input disabled={loading} id="gross_weight" placeholder="gross_weight value" defaultValue={spec?.gross_weight? spec.gross_weight : ""} />
            </div>
            <div>
            <Label htmlFor="carton_dimensions">Carton Dimensions (mm)</Label>
            <Input disabled={loading} id="carton_dimensions" placeholder="carton_dimensions value" defaultValue={spec?.carton_dimensions? spec.carton_dimensions : ""} />
            </div>
            <div>
            <Label htmlFor="mechanical_connection_of_driver">Mechanical Connection of Driver</Label>
            <Input disabled={loading} id="mechanical_connection_of_driver" placeholder="mechanical_connection_of_driver value" defaultValue={spec?.mechanical_connection_of_driver? spec.mechanical_connection_of_driver : ""} />
            </div>
            <div>
            <Label htmlFor="baffle_cutout_dimensions_front_mount_horizontal">Baffle Cutout Dimensions (front mount) Horizontal (mm)</Label>
            <Input disabled={loading} id="baffle_cutout_dimensions_front_mount_horizontal" placeholder="baffle_cutout_dimensions_front_mount_horizontal value" defaultValue={spec?.baffle_cutout_dimensions_front_mount_horizontal? spec.baffle_cutout_dimensions_front_mount_horizontal : ""} />
            </div>
            <div>
            <Label htmlFor="baffle_cutout_dimensions_front_mount_vertical">Baffle Cutout Dimensions (front mount) Vertical (mm)</Label>
            <Input disabled={loading} id="baffle_cutout_dimensions_front_mount_vertical" placeholder="baffle_cutout_dimensions_front_mount_vertical value" defaultValue={spec?.baffle_cutout_dimensions_front_mount_vertical? spec.baffle_cutout_dimensions_front_mount_vertical : ""} />
            </div>
            <div>
            <Label htmlFor="custom_note">Custom Note (Will be displayed at the bottom table)</Label>
            <Textarea disabled={loading} id="custom_note" placeholder="custom note" defaultValue={spec?.custom_note? spec.custom_note : ""} />
            </div>
            </div>
          <Button disabled={loading} className="ml-auto" type="submit">
            {action}
          </Button>
        </form>
    </>
  );
};
