import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import { Specification, SpecificationSBAudience } from '@prisma/client';

function createData(
  specs: string,
  value: string,
  unit: string,
) {
  return { specs, value, unit };
}

export default function SpecificationSBAudienceTable(spec: SpecificationSBAudience, styling: string) {
    let customNote = spec.custom_note
    const notesArray = customNote
      .split(/\r?\n/) // split by newline
      .map(n => n.trim())
      .filter(n => n);
    const rows = [
        createData('Nominal Impedance', spec.nominal_impedance, ""),
        createData('Minimum Impedance', spec.minimum_impedance, ""),
        createData('AES Power Handling', spec.aes_power_handling, ""),
        createData('Maximum Power Handling', spec.maximum_power_handling, ""),
        createData('Sensitivity', spec.sensitivity, ""),
        createData('Frequency Range', spec.frequency_range, ""),
        createData('Voice Coil Diameter', spec.voice_coil_diameter, ""),
        createData('Winding Material', spec.winding_material, ""),
        createData('Former Material', spec.former_material, ""),
        createData('Winding Depth', spec.winding_depth, ""),
        createData('Magnetic Gap Depth', spec.magnetic_gap_depth, ""),
        createData('Flux Density', spec.flux_density, ""),
        createData('Magnet', spec.magnet, ""),
        createData('Basket Material', spec.basket_material, ""),
        createData('Demodulation', spec.demodulation, ""),
        createData('Cone Surround', spec.cone_surround, ""),
        createData('Net Air Volume Filled by Driver', spec.net_air_volume_filled_by_driver, ""),
        createData('Spider Profile', spec.spider_profile, ""),
        createData('Weather Resistant', spec.weather_resistant, ""),
        createData('RDC', spec.rdc, ""),
        createData('Recommended Crossover Frequency', spec.recommended_crossover_frequency, ""),
        createData('Diaphragm Material', spec.diaphragm_material, ""),
        createData('Phase Plug Design', spec.phase_plug_design, ""),
        createData('Total Exit Angle', spec.total_exit_angle, ""),
        createData('Net Air Volume Filled by HF Driver', spec.net_air_volume_filled_by_hf_driver, ""),
        createData('Nominal Throat Diameter', spec.nominal_throat_diameter, ""),
        createData('Overall Diameter', spec.overall_diameter, ""),
        createData('Ninety Degrees Mounting Holes Diameter', spec.ninety_degrees_mounting_holes_diameter, ""),
        createData('Depth', spec.depth, ""),
        createData('Net Weight', spec.net_weight, ""),
        createData('Shipping Box', spec.shipping_box, ""),
        createData('Gross Weight', spec.gross_weight, ""),
        createData('Replacement Diaphragm', spec.replacement_diaphragm, ""),
        createData('Bolt Circle Diameter', spec.bolt_circle_diameter, ""),
        createData('Baffle Cutout Diameter', spec.baffle_cutout_diameter, ""),
        createData('Mounting Depth', spec.mounting_depth, ""),
        createData('Flange and Gasket Thickness', spec.flange_and_gasket_thickness, ""),
        createData('Recone Kit', spec.recone_kit, ""),
        createData('Note', spec.custom_note, ""),
      ];
  return (
    <>
      <Table>
        <TableBody>
            {rows.map((row, index) => ( row.value? row.specs === "Note"?      
              <TableRow key={index}>
                <TableCell colSpan={2} className={`${styling}`}>
                  {notesArray.map((note, index) => 
                    <h3 key={index} className='pt-2 text-xs'>
                      {note}
                    </h3>
                  )}
                </TableCell>
              </TableRow>
            :
            <TableRow key={index}>
              <TableCell className={`${styling}`}><h3>{row.specs}</h3></TableCell>
              <TableCell className={`${styling} text-right`}><h4>{row.value ? row.value + " " + row.unit : '-'}</h4></TableCell>
            </TableRow>
            :
            null
          ))}
        </TableBody>
      </Table>  

    </>
  );
}