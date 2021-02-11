import { ArrayStream } from 'src/app/services/array-stream.service';
import { TextValue } from 'src/app/shared/components/text-value-card/models/text-value.model';
import { LeadersFormation } from 'src/app/store/leaders/models/leaders-formation.model';
import { Convertable } from '../../core/shared/convertable/convertable';

export class LeadersFormationConverter implements Convertable<LeadersFormation, TextValue> {
  public convert(items: LeadersFormation[]): TextValue[] {
    const max = new ArrayStream(items).maxBy((i) => i.usage);
    return items.map((item) => ({
      text: item.formation,
      value: `${item.usage} %`,
      bold: item.usage === max,
      style: { 'letter-spacing': '2px' }
    }));
  }
}
