"use client"

import axios, { AxiosResponse } from "axios"
import { useEffect, useState } from "react"
import { toast } from "react-hot-toast"
import { Specification } from "@prisma/client"
import { useParams, useRouter } from "next/navigation"

import { Input } from "@/app/admin/components/ui/input"
import { Button } from "@/app/admin/components/ui/button"
import { Separator } from "@/app/admin/components/ui/separator"
import { Heading } from "@/app/admin/components/ui/heading"
import { Label } from "@/app/admin/components/ui/label"
import Link from "next/link"
import { Textarea } from "@/app/admin/components/ui/textarea"


interface SpecFormProps {
  initialData: Specification | null,
  product_name: string,
  product_isKits: boolean
};

export const SpecForm: React.FC<SpecFormProps> = ({
  initialData, product_name, product_isKits
}) => {
  const [spec, setSpec] = useState<Specification>();
  const params = useParams();
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const title = initialData ? 'Edit specification (Do not add units)' : 'Create specification (Do not add units)';
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
    const temp : Specification = {
     // @ts-ignore
     impedance: event.target[0].value,
     // @ts-ignore
     dc_resistance_re: event.target[1].value,
     // @ts-ignore
     coil_inductance_le: event.target[2].value,
     // @ts-ignore
     effective_piston_area_sd: event.target[3].value,
     // @ts-ignore
     voice_coil_diameter: event.target[4].value,
     // @ts-ignore
     voice_coil_height: event.target[5].value,
     // @ts-ignore
     air_gap_height: event.target[6].value,
     // @ts-ignore
     linear_coil_travel_pp: event.target[7].value,
     // @ts-ignore
     magnetic_flux_density: event.target[8].value,
     // @ts-ignore
     magnet_weight: event.target[9].value,
     // @ts-ignore
     net_weight: event.target[10].value,
     // @ts-ignore
     free_air_resonance_fs: event.target[11].value,
     // @ts-ignore
     sensitivity: event.target[12].value,
     // @ts-ignore
     mechanical_q_factor_qms: event.target[13].value,
     // @ts-ignore
     electrical_q_factor_qes: event.target[14].value,
     // @ts-ignore
     total_q_factor_qts: event.target[15].value,
     // @ts-ignore
     moving_mass_mms: event.target[16].value,
     // @ts-ignore
     force_factor_bi: event.target[17].value,
     // @ts-ignore
     equivalent_volume_vas: event.target[18].value,
     // @ts-ignore
     compliance_cms: event.target[19].value,
     // @ts-ignore
     mechanical_loss_rms: event.target[20].value,
     // @ts-ignore
     rated_power_handling: event.target[21].value,
     // @ts-ignore
     recommended_frequency_range: event.target[22].value,
     // @ts-ignore
     max_mechanical_cone_excursion_xmech: event.target[23].value,
     // @ts-ignore
     custom_note: event.target[24].value,
     // @ts-ignore
     cone_material: event.target[25].value,
     // @ts-ignore
     dome_material: event.target[26].value,
     //@ts-ignore
     mounting_diameter: event.target[27].value,
     //@ts-ignore
     searchbox_desc: event.target[28].value,
      productId: "",
      createdAt:new Date(),
      updatedAt:new Date(),
      id:"",
    }
    try {
      setLoading(true);
      let response: AxiosResponse;
      if (initialData) {
        response = await axios.patch(`${process.env.NEXT_PUBLIC_ADMIN_FOLDER_URL}/api/${params.brandId}/${params.productId}/specification/${initialData.id}`, temp);
      } else {
        response = await axios.post(`${process.env.NEXT_PUBLIC_ADMIN_FOLDER_URL}/api/${params.brandId}/${params.productId}/specification`, temp);
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
          <div className="grid md:grid-cols-3 grid-cols-1 md:gap-8 gap-4 border rounded-lg p-4 shadow-lg">
            <div>
            <Label htmlFor="impedance" className="font-bold">Nominal Impedance (Ω)</Label>
            <Input disabled={loading} id="impedance" placeholder="Impedance value" defaultValue={spec?.impedance? spec.impedance : ""} />
            </div>
            <div>
            <Label htmlFor="dc_resistance_re" className="font-bold">DC resistance, Re (Ω)</Label>
            <Input disabled={loading} id="dc_resistance_re" placeholder="dc_resistance_re value" defaultValue={spec?.dc_resistance_re? spec.dc_resistance_re : ""} />
            </div>
            <div>
            <Label htmlFor="coil_inductance_le" className="font-bold">Voice coil inductance, Le (mH)</Label>
            <Input disabled={loading} id="coil_inductance_le" placeholder="coil_inductance_le value" defaultValue={spec?.coil_inductance_le? spec.coil_inductance_le : ""} />
            </div>
            <div>
            <Label htmlFor="effective_piston_area_sd" className="font-bold">Effective piston area, Sd (cm2)</Label>
            <Input disabled={loading} id="effective_piston_area_sd" placeholder="effective_piston_area_sd value" defaultValue={spec?.effective_piston_area_sd? spec.effective_piston_area_sd : ""} />
            </div>
            <div>
            <Label htmlFor="voice_coil_diameter" className="font-bold">Voice coil diameter (mm)</Label>
            <Input disabled={loading} id="voice_coil_diameter" placeholder="voice_coil_diameter value" defaultValue={spec?.voice_coil_diameter? spec.voice_coil_diameter : ""} />
            </div>
            <div>
            <Label htmlFor="voice_coil_height" className="font-bold">Voice coil height (mm)</Label>
            <Input disabled={loading} id="voice_coil_height" placeholder="voice_coil_height value" defaultValue={spec?.voice_coil_height? spec.voice_coil_height : ""} />
            </div>
            <div>
            <Label htmlFor="air_gap_height" className="font-bold">Air gap height (mm)</Label>
            <Input disabled={loading} id="air_gap_height" placeholder="air_gap_height value" defaultValue={spec?.air_gap_height? spec.air_gap_height : ""} />
            </div>
            <div>
            <Label htmlFor="linear_coil_travel_pp" className="font-bold">Linear coil travel (p-p) (mm)</Label>
            <Input disabled={loading} id="linear_coil_travel_pp" placeholder="linear_coil_travel_pp value" defaultValue={spec?.linear_coil_travel_pp? spec.linear_coil_travel_pp : ""} />
            </div>
            <div>
            <Label htmlFor="magnetic_flux_density" className="font-bold">Magnetic flux density (T)</Label>
            <Input disabled={loading} id="magnetic_flux_density" placeholder="magnetic_flux_density value" defaultValue={spec?.magnetic_flux_density? spec.magnetic_flux_density : ""} />
            </div>
            <div>
            <Label htmlFor="magnet_weight" className="font-bold">Magnet weight (kg)</Label>
            <Input disabled={loading} id="magnet_weight" placeholder="magnet_weight value" defaultValue={spec?.magnet_weight? spec.magnet_weight : ""} />
            </div>
            <div>
            <Label htmlFor="net_weight" className="font-bold">Net weight (kg)</Label>
            <Input disabled={loading} id="net_weight" placeholder="net_weight value" defaultValue={spec?.net_weight? spec.net_weight : ""} />
            </div>
            <div>
            <Label htmlFor="free_air_resonance_fs" className="font-bold">Free air resonance, Fs (Hz)</Label>
            <Input disabled={loading} id="free_air_resonance_fs" placeholder="free_air_resonance_fs value" defaultValue={spec?.free_air_resonance_fs? spec.free_air_resonance_fs : ""} />
            </div>
            <div>
            <Label htmlFor="sensitivity" className="font-bold">Sensitivity (2.83 V / 1 m) (dB)</Label>
            <Input disabled={loading} id="sensitivity" placeholder="sensitivity value" defaultValue={spec?.sensitivity? spec.sensitivity : ""} />
            </div>
            <div>
            <Label htmlFor="mechanical_q_factor_qms" className="font-bold">Mechanical Q-factor, Qms</Label>
            <Input disabled={loading} id="mechanical_q_factor_qms" placeholder="mechanical_q_factor_qms value" defaultValue={spec?.mechanical_q_factor_qms? spec.mechanical_q_factor_qms : ""} />
            </div>
            <div>
            <Label htmlFor="electrical_q_factor_qes" className="font-bold">Electrical Q-factor, Qes</Label>
            <Input disabled={loading} id="electrical_q_factor_qes" placeholder="electrical_q_factor_qes value" defaultValue={spec?.electrical_q_factor_qes? spec.electrical_q_factor_qes : ""} />
            </div>
            <div>
            <Label htmlFor="total_q_factor_qts" className="font-bold">Total Q-factor, Qts</Label>
            <Input disabled={loading} id="total_q_factor_qts" placeholder="total_q_factor_qts value" defaultValue={spec?.total_q_factor_qts? spec.total_q_factor_qts : ""} />
            </div>
            <div>
            <Label htmlFor="moving_mass_mms" className="font-bold">Moving mass incl. air, Mms (g)</Label>
            <Input disabled={loading} id="moving_mass_mms" placeholder="moving_mass_mms value" defaultValue={spec?.moving_mass_mms? spec.moving_mass_mms : ""} />
            </div>
            <div>
            <Label htmlFor="force_factor_bi" className="font-bold">Force factor, Bl (Tm)</Label>
            <Input disabled={loading} id="force_factor_bi" placeholder="force_factor_bi value" defaultValue={spec?.force_factor_bi? spec.force_factor_bi : ""} />
            </div>
            <div>
            <Label htmlFor="equivalent_volume_vas" className="font-bold">Equivalent volume, VAS (liters)</Label>
            <Input disabled={loading} id="equivalent_volume_vas" placeholder="equivalent_volume_vas value" defaultValue={spec?.equivalent_volume_vas? spec.equivalent_volume_vas : ""} />
            </div>
            <div>
            <Label htmlFor="compliance_cms" className="font-bold">Compliance, Cms (mm/N)</Label>
            <Input disabled={loading} id="compliance_cms" placeholder="compliance_cms value" defaultValue={spec?.compliance_cms? spec.compliance_cms : ""} />
            </div>
            <div>
            <Label htmlFor="mechanical_loss_rms" className="font-bold">Mechanical loss, Rms (kg/s)</Label>
            <Input disabled={loading} id="mechanical_loss_rms" placeholder="mechanical_loss_rms value" defaultValue={spec?.mechanical_loss_rms? spec.mechanical_loss_rms : ""} />
            </div>
            <div>
            <Label htmlFor="rated_power_handling" className="font-bold">Rated power handling* (W)</Label>
            <Input disabled={loading} id="rated_power_handling" placeholder="rated_power_handling value" defaultValue={spec?.rated_power_handling? spec.rated_power_handling : ""} />
            </div>
            

           
            <div>
            <Label htmlFor="recommended_frequency_range" className="font-bold">recommended_frequency_range</Label>
            <Input disabled={loading} id="recommended_frequency_range" placeholder="recommended_frequency_range value" defaultValue={spec?.recommended_frequency_range? spec.recommended_frequency_range : ""} />
            </div>
            <div>
            <Label htmlFor="max_mechanical_cone_excursion_xmech" className="font-bold">max_mechanical_cone_excursion_xmech</Label>
            <Input disabled={loading} id="max_mechanical_cone_excursion_xmech" placeholder="max_mechanical_cone_excursion_xmech value" defaultValue={spec?.max_mechanical_cone_excursion_xmech? spec.max_mechanical_cone_excursion_xmech : ""} />
            </div>
            <div>
            <Label htmlFor="custom_note" className="font-bold">Custom Note (At the bottom table) | <Link href={'/images/admin/custom_table_note_placement.png'} target="blank" className="text-primary hover:underline font-normal text-sm  ">See placement</Link></Label>
            <Textarea
              disabled={loading}
              id="custom_note"
              placeholder="custom note"
              defaultValue={spec?.custom_note? spec.custom_note : ""}
            />
            </div>
            <div>
            <Label htmlFor="cone_material" className="font-bold">Cone Material</Label>
            <Input disabled={loading} id="cone_material" placeholder="cone material value" defaultValue={spec?.cone_material? spec.cone_material : ""} />
            </div>
            <div>
            <Label htmlFor="dome_material" className="font-bold">Dome Material</Label>
            <Input disabled={loading} id="dome_material" placeholder="dome material value" defaultValue={spec?.dome_material? spec.dome_material : ""} />
            </div>
            <div>
            <Label htmlFor="mounting_diameter" className="font-bold">Overall Diameter</Label>
            <Input disabled={loading} id="mounting_diameter" placeholder="Mounting Diameter Value" defaultValue={spec?.mounting_diameter? spec.mounting_diameter : ""} />
            </div>
            <div>
            <Label htmlFor="searchbox_desc" className="font-bold">Custom Searchbox Description (Only for Kits) | <Link href={'/images/admin/custom_searchbox_desc_placement.png'} target="blank" className="text-primary hover:underline font-normal text-sm  ">See placement</Link></Label>
            <Input disabled={loading || !product_isKits} id="searchbox_desc" placeholder="Searchbox Description Value" defaultValue={spec?.searchbox_desc? spec.searchbox_desc : ""} />
            </div>
            </div>
          <Button disabled={loading} type="submit" className="w-full flex gap-2 bg-green-500 text-white hover:bg-green-600 transition-colors">
            {action}
          </Button>
        </form>
    </>
  );
};
