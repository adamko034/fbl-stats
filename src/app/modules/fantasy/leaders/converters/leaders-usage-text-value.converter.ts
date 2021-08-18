import { Convertable } from 'src/app/modules/core/shared/convertable/convertable';
import { ArrayStream } from 'src/app/services/array-stream.service';
import { TextValue } from 'src/app/shared/components/text-value-card/models/text-value.model';

export interface LeadersUsageTextValueConfig {
  textField: string;
  valueType: 'usage' | 'difference' | 'both';
  style?: any;
  showTeamLogo?: boolean;
  boldMax?: boolean;
}

export class LeadersUsageTextValueConverter<T> implements Convertable<T, TextValue> {
  constructor(private config: LeadersUsageTextValueConfig) {}

  public convert(items: T[]): TextValue[] {
    const max = new ArrayStream(items).maxBy((p) => p['usagePercentage']);

    return items.map((item: T) => ({
      bold: this.config.boldMax ? item['usagePercentage'] === max : false,
      text: item[this.config.textField],
      value: this.isValueType('usage') ? `${item['usagePercentage']}%` : null,
      textStyle: this.config.style,
      change: this.isValueType('difference') ? item['usageDifference'] : null,
      teamShort: !!this.config.showTeamLogo ? item['teamShort'] : null,
      linkId: item['playerId']
    }));
  }

  private isValueType(expected: 'usage' | 'difference') {
    return this.config.valueType === 'both' || this.config.valueType === expected;
  }
}
