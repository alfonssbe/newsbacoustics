import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import { Custom_Specification } from '@prisma/client';

function createData(
  specs: string,
  value: string,
  unit: string,
) {
  return { specs, value, unit };
}

export default function CustomProductTable(spec: Custom_Specification, styling: string) {
    let customNote = spec.custom_note_for_spec
    const notesArray = customNote
      .split(/\r?\n/) // split by newline
      .map(n => n.trim())
      .filter(n => n);
    const rows = [
        createData('Frequency Range (+/-3dB)', spec.frequency_range, "Hz"),
        createData('Sensitivity (2.83V/1m)', spec.sensitivity, "dB"),
        createData('Nominal Impedance', spec.nominal_impedance, "Ω"),
        createData('Max SPL', spec.max_spl, "dB"),
        createData('Recommended Amplifier', spec.recommended_amplifier, "W"),
        createData('Crossover Frequency', spec.crossover_frequency, "Hz"),
        createData('Enclosure Type', spec.enclosure_type, ""),
        createData('Port Tuning Frequency', spec.port_tuning_frequency, "Hz"),
        createData('Driver Units', spec.driver_units, ""),
        createData('Cabinet Material', spec.cabinet_material, ""),
        createData('Speaker Dimension', spec.speaker_dimension, ""),
        createData('Net Weight', spec.net_weight, ""),
        createData('DC Resistance, re', spec.dc_resistance_re, "Ω"),
        createData('Voice Coil Diameter', spec.voice_coil_diameter, "mm"),
        createData('Voice Coil Height', spec.voice_coil_height, "mm"),
        createData('Air Gap Height', spec.air_gap_height, "mm"),
        createData('Free Air Resonance, FS', spec.free_air_resonance_fs, "Hz"),
        createData('Rated Power Handling*', spec.rated_power_handling, "W"),
        createData('Magnetic Flux Density', spec.magnetic_flux_density, "T"),
        createData('Magnet Weight', spec.magnet_weight, "kg"),
        createData('Dome Material', spec.dome_material, ""),
        createData('Note', spec.custom_note_for_spec, ""),
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