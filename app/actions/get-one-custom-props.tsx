import { redirect } from "next/navigation";
import { Custom_Specifications } from "@/app/types";


const API=`${process.env.NEXT_PUBLIC_ROOT_URL}/${process.env.NEXT_PUBLIC_FETCH_ONE_CUSTOM_PRODUCT}`;

const getCustomProduct = async (path: string, customProductSlug: string): Promise<Custom_Specifications> => {
  const brandId = path.includes('sbaudience') ? process.env.NEXT_PUBLIC_SB_AUDIENCE_ID : process.env.NEXT_PUBLIC_SB_ACOUSTICS_ID
  const API_EDITED_BRANDID = API.replace('{brandId}', brandId ?? '680c5eee-7ed7-41bc-b14b-4185f8a1c379'); //SBAcoustics ID as default
  const API_EDITED = API_EDITED_BRANDID.replace('{customProductSlug}', customProductSlug)
  const response = await fetch(API_EDITED);
  if (!response.ok) {
    redirect('/');
    // throw new Error('Failed to fetch one custom product');
  }
  const data = await response.json();
  if (!data) {
    redirect('/');
  }

  if(data.length === 0){
    let customSpec: Custom_Specifications = {
      customDesc: "",
      frequency_range: "",
      sensitivity: "",
      nominal_impedance: "",
      max_spl: "",
      recommended_amplifier: "",
      crossover_frequency: "",
      enclosure_type: "",
      port_tuning_frequency: "",
      driver_units: "",
      cabinet_material: "",
      speaker_dimension: "",
      net_weight: "",
      dc_resistance_re: "",
      voice_coil_diameter: "",
      voice_coil_height: "",
      air_gap_height: "",
      free_air_resonance_fs: "",
      rated_power_handling: "",
      magnetic_flux_density: "",
      magnet_weight: "",
      dome_material: "",
      custom_note_for_spec: ""
    }
    return customSpec;
  }
  let customSpec: Custom_Specifications = {
    customDesc: data[0].customDesc,
    frequency_range:data[0].frequency_range,
    sensitivity: data[0].sensitivity,
    nominal_impedance: data[0].nominal_impedance,
    max_spl: data[0].max_spl,
    recommended_amplifier: data[0].recommended_amplifier,
    crossover_frequency: data[0].crossover_frequency,
    enclosure_type: data[0].enclosure_type,
    port_tuning_frequency: data[0].port_tuning_frequency,
    driver_units: data[0].driver_units,
    cabinet_material: data[0].cabinet_material,
    speaker_dimension: data[0].speaker_dimension,
    net_weight :data[0].net_weight,
    dc_resistance_re :data[0].dc_resistance_re,
    voice_coil_diameter :data[0].voice_coil_diameter,
    voice_coil_height :data[0].voice_coil_height,
    air_gap_height :data[0].air_gap_height,
    free_air_resonance_fs :data[0].free_air_resonance_fs,
    rated_power_handling :data[0].rated_power_handling,
    magnetic_flux_density :data[0].magnetic_flux_density,
    magnet_weight :data[0].magnet_weight,
    dome_material: data[0].dome_material,
    custom_note_for_spec :data[0].custom_note_for_spec
  }
 
  return customSpec;
};

export default getCustomProduct;

