import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'sumBy' })
export class SumByPipe implements PipeTransform {
  public transform(values: any[], field: string) {
    if (!values || values.length === 0) {
      return 0;
    }

    const value = values.reduce((a, b) => a + Math.round(+b[field] * 10) / 10, 0);
    return Math.round(value * 10) / 10;
  }
}
