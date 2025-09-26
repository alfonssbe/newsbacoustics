import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import { HornsSpecificationSBAudience, Specification, SpecificationSBAudience } from '@prisma/client';

function createData(
  specs: string,
  value: string,
  unit: string,
) {
  return { specs, value, unit };
}

export default function HornSpecificationSBAudienceTable(spec: HornsSpecificationSBAudience, styling: string) {
    let customNote = spec.custom_note
    const notesArray = customNote
      .split(/\r?\n/) // split by newline
      .map(n => n.trim())
      .filter(n => n);
    const rows = [
        createData('Nominal Coverage Horizontal', spec.nominal_coverage_horizontal, "°"),
        createData('Nominal Coverage Vertical', spec.nominal_coverage_vertical, "°"),
        createData('Directivity factor (Q)', spec.directivity_factor, ""),
        createData('Directivity index (Di)', spec.directivity_index, "dB"),
        createData('Sensitivity on Driver (1W@1m), on axis⁽¹⁾', spec.sensitivity_on_driver, "dB"),
        createData('Frequency Response @-10dB⁽²⁾', spec.frequency_response, "Hz"),
        createData('Throat Diameter', spec.throat_diameter, "mm"),
        createData('Minimum Recommended Crossover⁽³⁾', spec.minimum_recommended_crossover, "Hz"),
        createData('Horn Material', spec.horn_material, ""),
        createData('Horn Finish', spec.horn_finish, ""),
        createData('Overall Dimensions Mouth Height', spec.overall_dimensions_mouth_height, "mm"),
        createData('Overall Dimensions Mouth Width', spec.overall_dimensions_mouth_width, "mm"),
        createData('Overall Dimensions Length', spec.overall_dimensions_length, "mm"),
        createData('Net Weight', spec.net_weight, "kg"),
        createData('Gross Weight', spec.gross_weight, "kg"),
        createData('Carton Dimensions (W x D x H)', spec.carton_dimensions, "mm"),
        createData('Mechanical Connection of Driver', spec.mechanical_connection_of_driver, ""),
        createData('Baffle Cutout Dimensions (front mount) Horizontal', spec.baffle_cutout_dimensions_front_mount_horizontal, "mm"),
        createData('Baffle Cutout Dimensions (front mount) Horizontal', spec.baffle_cutout_dimensions_front_mount_vertical, "mm"),
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