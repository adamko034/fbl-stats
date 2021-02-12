import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MinMaxAvg } from '../../models/minmaxavg-model';
import { TextValue } from '../text-value-card/models/text-value.model';

@Component({
  selector: 'app-min-max-avg',
  templateUrl: './min-max-avg.component.html',
  styleUrls: ['./min-max-avg.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MinMaxAvgComponent {
  @Input() valueSuffix: string;
  @Input() title: string;
  @Input() minMaxAvg: MinMaxAvg;

  public get items(): TextValue[] {
    const _items: TextValue[] = [];

    _items.push({ text: 'AVG', value: this.getValueText('avg'), bold: true });
    _items.push({ text: 'MIN', value: this.getValueText('min') });
    _items.push({ text: 'MAX', value: this.getValueText('max') });
    return _items;
  }

  constructor() {}

  private getValueText(key: string): string {
    if (isNaN(this.minMaxAvg[key])) {
      return '';
    }

    const value = Math.round(+this.minMaxAvg[key] * 10) / 10;
    return !!this.valueSuffix ? `${value.toString()} ${this.valueSuffix}` : value.toString();
  }
}
