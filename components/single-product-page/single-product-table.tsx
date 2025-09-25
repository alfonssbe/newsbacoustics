import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import { Specification } from '@prisma/client';

function createData(
  specs: string,
  value: string,
  unit: string,
) {
  return { specs, value, unit };
}

export default function SingleProductTable(spec: Specification, styling: string) {
    let customNote = spec.custom_note
    const notesArray = customNote
      .split(/\r?\n/) // split by newline
      .map(n => n.trim())
      .filter(n => n);
    const rows = [
        createData('Nominal Impedance', spec.impedance, "Ω"),
        createData('DC Resistance, Re', spec.dc_resistance_re, "Ω"),
        createData('Voice coil inductance, Le', spec.coil_inductance_le, "mH"),
        createData('Effective piston area, Sd', spec.effective_piston_area_sd, "cm²"),
        createData('Voice coil diameter', spec.voice_coil_diameter, "mm"),
        createData('Voice coil height', spec.voice_coil_height, "mm"),
        createData('Air gap height', spec.air_gap_height, "mm"),
        createData('Linear coil travel (p-p)', spec.linear_coil_travel_pp, "mm"),
        createData('Moving mass incl. air, Mms', spec.moving_mass_mms, "g"),
        createData('Free air resonance, Fs', spec.free_air_resonance_fs, "Hz"),
        createData('Sensitivity (2.83 V / 1 m)', spec.sensitivity, "dB"),
        createData('Mechanical Q-factor, Qms', spec.mechanical_q_factor_qms, ""),
        createData('Electrical Q-factor, Qes', spec.electrical_q_factor_qes, ""),
        createData('Total Q-factor, Qts', spec.total_q_factor_qts, ""),
        createData('Force factor, Bl', spec.force_factor_bi, "Tm"),
        createData('Rated power handling*', spec.rated_power_handling, "W"),
        createData('Magnetic flux density', spec.magnetic_flux_density, "T"),
        createData('Magnet weight', spec.magnet_weight, "kg"),
        createData('Net weight', spec.net_weight, "kg"),
        createData('Equivalent volume, VAS', spec.equivalent_volume_vas, "liters"),
        createData('Compliance, Cms', spec.compliance_cms, "mm/N"),
        createData('Mechanical loss, Rms', spec.mechanical_loss_rms, "kg/s"),
        createData('Recommended Frequency Range', spec.recommended_frequency_range, "Hz"),
        createData('Max Mechanical Cone Excursion, Xmech', spec.max_mechanical_cone_excursion_xmech, ""),
        createData('Cone Material', spec.cone_material, ""),
        createData('Dome Material', spec.dome_material, ""),
        // createData('Mounting Diameter', spec.mounting_diameter, "Ø"),
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