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


interface SBAudienceSpecFormProps {
  initialData: SpecificationSBAudience,
  product_name: string
};

export const SBAudienceSpecForm: React.FC<SBAudienceSpecFormProps> = ({
  initialData, product_name
}) => {
  const [spec, setSpec] = useState<SpecificationSBAudience>();
  const params = useParams();
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const title = initialData? 'Edit specification' : 'Create specification';
  const description = initialData ? `For ${product_name}` : 'Add a new specification';
  const toastMessage = initialData ? 'Specification updated.' : 'Specification created.';
  const action = initialData ? 'Save changes' : 'Create';


  useEffect(() => {
    if(initialData){
      setSpec(initialData)
    }
   } , [initialData]);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const tempSpecSBAudience : SpecificationSBAudience = {
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
     // @ts-ignore
     net_air_volume_filled_by_driver: event.target[16].value,
     // @ts-ignore
     spider_profile: event.target[17].value,
     // @ts-ignore
     weather_resistant: event.target[18].value,
     // @ts-ignore
     rdc: event.target[19].value,
     // @ts-ignore
     recommended_crossover_frequency: event.target[20].value,
     // @ts-ignore
     diaphragm_material: event.target[21].value,
     // @ts-ignore
     phase_plug_design: event.target[22].value,
     // @ts-ignore
     total_exit_angle: event.target[23].value,
     // @ts-ignore
     net_air_volume_filled_by_hf_driver: event.target[24].value,
     // @ts-ignore
     nominal_throat_diameter: event.target[25].value,
     // @ts-ignore
     overall_diameter: event.target[26].value,
     // @ts-ignore
     ninety_degrees_mounting_holes_diameter: event.target[27].value,
     // @ts-ignore
     depth: event.target[28].value,
     // @ts-ignore
     net_weight: event.target[29].value,
     // @ts-ignore
     shipping_box: event.target[30].value,
     // @ts-ignore
     gross_weight: event.target[31].value,
     // @ts-ignore
     replacement_diaphragm: event.target[32].value,
     // @ts-ignore
     bolt_circle_diameter: event.target[33].value,
     // @ts-ignore
     baffle_cutout_diameter: event.target[34].value,
     // @ts-ignore
     mounting_depth: event.target[35].value,
     // @ts-ignore
     flange_and_gasket_thickness: event.target[36].value,
     // @ts-ignore
     recone_kit: event.target[37].value,
     // @ts-ignore
     custom_note: event.target[38].value,
      productId: "",
      createdAt:new Date(),
      updatedAt:new Date(),
      id:"",
    }
    
   
    try {
      setLoading(true);
      let response: AxiosResponse;
      if (initialData) {
        response = await axios.patch(`${process.env.NEXT_PUBLIC_ADMIN_FOLDER_URL}/api/${params.brandId}/${params.productId}/specificationsbaudience/${initialData.id}`, tempSpecSBAudience);
      } else {
        response = await axios.post(`${process.env.NEXT_PUBLIC_ADMIN_FOLDER_URL}/api/${params.brandId}/${params.productId}/specificationsbaudience`, tempSpecSBAudience);
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
            <div>
            <Label htmlFor="net_air_volume_filled_by_driver">NET Air Volume filled by driver (liters)</Label>
            <Input disabled={loading} id="net_air_volume_filled_by_driver" placeholder="net_air_volume_filled_by_driver value" defaultValue={spec?.net_air_volume_filled_by_driver? spec.net_air_volume_filled_by_driver : ""} />
            </div>
            <div>
            <Label htmlFor="spider_profile">Spider Profile</Label>
            <Input disabled={loading} id="spider_profile" placeholder="spider_profile value" defaultValue={spec?.spider_profile? spec.spider_profile : ""} />
            </div>
            <div>
            <Label htmlFor="weather_resistant">Weather Resistant</Label>
            <Input disabled={loading} id="weather_resistant" placeholder="weather_resistant value" defaultValue={spec?.weather_resistant? spec.weather_resistant : ""} />
            </div>
            <div>
            <Label htmlFor="rdc">RDC (Ω)</Label>
            <Input disabled={loading} id="rdc" placeholder="rdc value" defaultValue={spec?.rdc? spec.rdc : ""} />
            </div>
            <div>
            <Label htmlFor="recommended_crossover_frequency">Recommended Crossover Frequency (Hz)</Label>
            <Input disabled={loading} id="recommended_crossover_frequency" placeholder="recommended_crossover_frequency value" defaultValue={spec?.recommended_crossover_frequency? spec.recommended_crossover_frequency : ""} />
            </div>
            <div>
            <Label htmlFor="diaphragm_material">Diaphragm Material (PEI)</Label>
            <Input disabled={loading} id="diaphragm_material" placeholder="diaphragm_material value" defaultValue={spec?.diaphragm_material? spec.diaphragm_material : ""} />
            </div>
            <div>
            <Label htmlFor="phase_plug_design">Phase Plug Design</Label>
            <Input disabled={loading} id="phase_plug_design" placeholder="phase_plug_design value" defaultValue={spec?.phase_plug_design? spec.phase_plug_design : ""} />
            </div>
            <div>
            <Label htmlFor="total_exit_angle">Total Exit Angle</Label>
            <Input disabled={loading} id="total_exit_angle" placeholder="total_exit_angle value" defaultValue={spec?.total_exit_angle? spec.total_exit_angle : ""} />
            </div>
            <div>
            <Label htmlFor="net_air_volume_filled_by_hf_driver">NET Air Volume filled by HF Driver (liters)</Label>
            <Input disabled={loading} id="net_air_volume_filled_by_hf_driver" placeholder="net_air_volume_filled_by_hf_driver value" defaultValue={spec?.net_air_volume_filled_by_hf_driver? spec.net_air_volume_filled_by_hf_driver : ""} />
            </div>
            <div>
            <Label htmlFor="nominal_throat_diameter">Nominal Throat Diameter (mm)</Label>
            <Input disabled={loading} id="nominal_throat_diameter" placeholder="nominal_throat_diameter value" defaultValue={spec?.nominal_throat_diameter? spec.nominal_throat_diameter : ""} />
            </div>
            <div>
            <Label htmlFor="overall_diameter">Overall Diameter (mm)</Label>
            <Input disabled={loading} id="overall_diameter" placeholder="overall_diameter value" defaultValue={spec?.overall_diameter? spec.overall_diameter : ""} />
            </div>
            <div>
            <Label htmlFor="ninety_degrees_mounting_holes_diameter">90 Degrees Mounting Holes Diameter (mm)</Label>
            <Input disabled={loading} id="ninety_degrees_mounting_holes_diameter" placeholder="ninety_degrees_mounting_holes_diameter value" defaultValue={spec?.ninety_degrees_mounting_holes_diameter? spec.ninety_degrees_mounting_holes_diameter : ""} />
            </div>
            <div>
            <Label htmlFor="depth">Depth (mm)</Label>
            <Input disabled={loading} id="depth" placeholder="depth value" defaultValue={spec?.depth? spec.depth : ""} />
            </div>
            <div>
            <Label htmlFor="net_weight">Net Weight (kg)</Label>
            <Input disabled={loading} id="net_weight" placeholder="net_weight value" defaultValue={spec?.net_weight? spec.net_weight : ""} />
            </div>
            <div>
            <Label htmlFor="shipping_box">Shipping Box (mm)</Label>
            <Input disabled={loading} id="shipping_box" placeholder="shipping_box value" defaultValue={spec?.shipping_box? spec.shipping_box : ""} />
            </div>
            <div>
            <Label htmlFor="gross_weight">Gross Weight (kg)</Label>
            <Input disabled={loading} id="gross_weight" placeholder="gross_weight value" defaultValue={spec?.gross_weight? spec.gross_weight : ""} />
            </div>
            <div>
            <Label htmlFor="replacement_diaphragm">Replacement Diaphragm</Label>
            <Input disabled={loading} id="replacement_diaphragm" placeholder="replacement_diaphragm value" defaultValue={spec?.replacement_diaphragm? spec.replacement_diaphragm : ""} />
            </div>
            <div>
            <Label htmlFor="bolt_circle_diameter">Bolt Circle Diameter (mm)</Label>
            <Input disabled={loading} id="bolt_circle_diameter" placeholder="bolt_circle_diameter value" defaultValue={spec?.bolt_circle_diameter? spec.bolt_circle_diameter : ""} />
            </div>
            <div>
            <Label htmlFor="baffle_cutout_diameter">Baffle Cutout Diameter (mm)</Label>
            <Input disabled={loading} id="baffle_cutout_diameter" placeholder="baffle_cutout_diameter value" defaultValue={spec?.baffle_cutout_diameter? spec.baffle_cutout_diameter : ""} />
            </div>
            <div>
            <Label htmlFor="mounting_depth">Mounting Depth (mm)</Label>
            <Input disabled={loading} id="mounting_depth" placeholder="mounting_depth value" defaultValue={spec?.mounting_depth? spec.mounting_depth : ""} />
            </div>
            <div>
            <Label htmlFor="flange_and_gasket_thickness">Flange and Gasket Thickness (mm)</Label>
            <Input disabled={loading} id="flange_and_gasket_thickness" placeholder="flange_and_gasket_thickness value" defaultValue={spec?.flange_and_gasket_thickness? spec.flange_and_gasket_thickness : ""} />
            </div>
            <div>
            <Label htmlFor="recone_kit">Recone Kit</Label>
            <Input disabled={loading} id="recone_kit" placeholder="recone_kit value" defaultValue={spec?.recone_kit? spec.recone_kit : ""} />
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
