import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import { HornsSpecificationSBAudience, Specification, SpecificationSBAudience, ThieleSmallParameters } from '@prisma/client';

function createData(
  specs: string,
  value: string,
  unit: string,
) {
  return { specs, value, unit };
}

export default function ThieleSpecificationSBAudienceTable(spec: ThieleSmallParameters, styling: string) {
    const rows = [
        createData('Fs', spec.fs, "Hz"),
        createData('Re', spec.re, "Ω"),
        createData('Qes', spec.qes, ""),
        createData('Qms', spec.qms, ""),
        createData('Qts', spec.qts, ""),
        createData('Vas', spec.vas, "liters"),
        createData('Sd', spec.sd, "cm²"),
        createData('Xmax', spec.x_max, "mm"),
        createData('Xdamage', spec.xdamage, "mm"),
        createData('Mms', spec.mms, "g"),
        createData('Bl', spec.bi, "Tm"),
        createData('Le', spec.le, "mH"),
        createData('Cms', spec.cms, "mm/N"),
        createData('Rms', spec.rms, "kg/s"),
        createData('Eta Zero', spec.eta_zero, "%"),
        createData('EBP', spec.ebp, ""),
      ];
  return (
    <>
      <Table>
        <TableBody>
            {rows.map((row, index) => ( row.value?
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