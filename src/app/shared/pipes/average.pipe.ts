import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'average'
})
export class AveragePipe implements PipeTransform {
  transform(arr: number[]): number {
    const isValid = arr.every((value) => !isNaN(value));

    if (!isValid) {
      return NaN;
    }

    const avg = arr.length ? arr.reduce((sum, value) => sum + value, 0) / arr.length : 0;

    return Math.round(avg * 10) / 10;
  }
}
