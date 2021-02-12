import { ArrayStream } from 'src/app/services/array-stream.service';
import { TextValue } from 'src/app/shared/components/text-value-card/models/text-value.model';
import { Convertable } from '../../core/shared/convertable/convertable';

export class LeadersUsageTextValueConverter<T> implements Convertable<T, TextValue> {
  constructor(private textField: string, private style?: any, private showTeamLogo?: boolean) {}

  public convert(items: T[]): TextValue[] {
    const max = new ArrayStream(items).maxBy((p) => p['usage']);

    return items.map((item: T) => ({
      bold: item['usage'] === max,
      text: item[this.textField],
      value: `${item['usage']}%`,
      style: this.style,
      teamShort: !!this.showTeamLogo ? item['teamShort'] : null
    }));
  }
}
