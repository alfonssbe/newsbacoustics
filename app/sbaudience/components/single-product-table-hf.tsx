import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import { Specification, SpecificationHFSBAudience, SpecificationSBAudience } from '@prisma/client';

function createData(
  specs: string,
  value: string,
  unit: string,
  valuehf: string,
  unithf: string
) {
  return { specs, value, unit, valuehf, unithf };
}

export default function SpecificationwithHFSBAudienceTable(spec: SpecificationSBAudience, specHf: SpecificationHFSBAudience, styling: string) {
    const rows = [
      createData('Nominal Impedance', spec.nominal_impedance, "Ω", specHf.nominal_impedance, "Ω"),
      createData('Minimum Impedance', spec.minimum_impedance, "Ω", specHf.minimum_impedance, "Ω"),
      createData('AES Power Handling⁽¹⁾', spec.aes_power_handling, "W", specHf.aes_power_handling, "W"),
      createData('Maximum Power Handling⁽²⁾', spec.maximum_power_handling, "W", specHf.maximum_power_handling, "W"),
      createData('Sensitivity (1W/1m)⁽³⁾', spec.sensitivity, "dB", specHf.sensitivity, "dB"),
      createData('Frequency Range', spec.frequency_range, "Hz", specHf.frequency_range, "Hz"),
      createData('Voice Coil Diameter', spec.voice_coil_diameter, "mm", specHf.voice_coil_diameter, "mm"),
      createData('Winding Material', spec.winding_material, "", specHf.winding_material, ""),
      createData('Former Material', spec.former_material, "", specHf.former_material, ""),
      createData('Winding Depth', spec.winding_depth, "mm", specHf.winding_depth, "mm"),
      createData('Magnetic Gap Depth', spec.magnetic_gap_depth, "mm", specHf.magnetic_gap_depth, "mm"),
      createData('Flux Density', spec.flux_density, "T", specHf.flux_density, "T"),
      createData('Magnet', spec.magnet, "", specHf.magnet, ""),
      createData('Basket Material', spec.basket_material, "", specHf.basket_material, ""),
      createData('Demodulation', spec.demodulation, "", specHf.demodulation, ""),
      createData('Cone Surround', spec.cone_surround, "", specHf.cone_surround, ""),
      createData('Net Air Volume Filled by Driver', spec.net_air_volume_filled_by_driver, "liters", "", ""),
      createData('Spider Profile', spec.spider_profile, "", "", ""),
      createData('Weather Resistant', spec.weather_resistant, "", "", ""),
      createData('RDC', spec.rdc, "Ω", "", ""),
      createData('Recommended Crossover Frequency', spec.recommended_crossover_frequency, "Hz", "", ""),
      createData('Diaphragm Material', spec.diaphragm_material, "", "", ""),
      createData('Phase Plug Design', spec.phase_plug_design, "", "", ""),
      createData('Total Exit Angle', spec.total_exit_angle, "°", "", ""),
      createData('Net Air Volume Filled by HF Driver', spec.net_air_volume_filled_by_hf_driver, "liters", "", ""),
      createData('Nominal Throat Diameter', spec.nominal_throat_diameter, "mm", "", ""),
      createData('Overall Diameter', spec.overall_diameter, "mm", "", ""),
      createData('Ninety Degrees Mounting Holes Diameter', spec.ninety_degrees_mounting_holes_diameter, "mm", "", ""),
      createData('Depth', spec.depth, "mm", "", ""),
      createData('Net Weight', spec.net_weight, "kg", "", ""),
      createData('Shipping Box', spec.shipping_box, "mm", "", ""),
      createData('Gross Weight', spec.gross_weight, "kg", "", ""),
      createData('Replacement Diaphragm', spec.replacement_diaphragm, "", "", ""),
      createData('Bolt Circle Diameter', spec.bolt_circle_diameter, "mm", "", ""),
      createData('Baffle Cutout Diameter', spec.baffle_cutout_diameter, "mm", "", ""),
      createData('Mounting Depth', spec.mounting_depth, "mm", "", ""),
      createData('Flange and Gasket Thickness', spec.flange_and_gasket_thickness, "mm", "", ""),
      createData('Recone Kit', spec.recone_kit, "", "", ""),
      createData('Note', spec.custom_note, "", "", ""),
    ];
  return (
    <>
      <Table>
        <TableBody>
            {rows.map((row, index) => ( row.value?
            <TableRow key={index}>
              <TableCell className={`${styling}`}><h3>{row.specs}</h3></TableCell>
              <TableCell className={`${styling} text-right`}><h4>{row.value ? row.value + " " + row.unit : '-'}</h4></TableCell>
              <TableCell className={`${styling} text-right`}><h4>{row.valuehf ? row.valuehf + " " + row.unithf : '-'}</h4></TableCell>
            </TableRow>
            :
            null
          ))}
        </TableBody>
      </Table>  

    </>
  );
}