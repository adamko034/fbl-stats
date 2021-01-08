import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numerals'
})
export class NumeralsPipe implements PipeTransform {
  public transform(value: number): string {
    return `${value.toString()}${this.getSuffix(value)}`;
  }

  private getSuffix(value: number): string {
    let suffix = 'th';

    if (value === 1) {
      suffix = 'st';
    } else if (value === 2) {
      suffix = 'nd';
    } else if (value === 3) {
      suffix = 'rd';
    }

    return suffix;
  }
}
