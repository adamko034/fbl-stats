import { Injectable } from '@angular/core';
import { BoldableValuesCalculator } from './boldable-values-calculator';
import { BoldableValuesData } from './boldable-values-data';

@Injectable()
export class BoldableValuesService {
  private _values: { [key: string]: { boldValue: number; items: { id: string; value: number }[] } };

  public calculateValues<T>(data: BoldableValuesData<T>, calculator: BoldableValuesCalculator<T>): void {
    this._values = {};

    data.keys.forEach((key: string) => {
      data.items.forEach((item: T) => {
        const value = calculator.calculateValue(key, item);
        const id = calculator.getItemId(item);
        const shouldCalculateMin = this.shouldCalculateMin(key, data.minBoldForKeys);

        if (!this._values[key]) {
          const boldValue = shouldCalculateMin ? 1000000 : 0;
          this._values[key] = { items: [], boldValue };
        }

        this._values[key].items.push({ id, value });

        const currentBoldValue = this._values[key].boldValue;
        if (shouldCalculateMin && value < currentBoldValue) {
          this._values[key].boldValue = value;
        }

        if (!shouldCalculateMin && value > currentBoldValue) {
          this._values[key].boldValue = value;
        }
      });
    });
  }

  public getBoldableValue(key: string, id: string): string {
    if (!this._values) {
      return '';
    }

    const boldValue = this._values[key].boldValue;
    const items = this._values[key].items;

    if (items.every((p) => p.value === items[0].value)) {
      return boldValue.toString();
    }

    const value = items.find((p) => p.id === id)?.value;
    if (value === boldValue) {
      return `<b>${value}</b>`;
    }

    return value.toString();
  }

  private shouldCalculateMin(key: string, minKeys: string[]): boolean {
    return minKeys.includes(key);
  }
}
