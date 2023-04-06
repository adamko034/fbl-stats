import { Pipe, PipeTransform } from '@angular/core';
import { MathHelper } from 'src/app/shared/helpers/math.helper';

@Pipe({
  name: 'percentageOf'
})
export class PercentageOfPipe implements PipeTransform {
  public transform(value: number, divider: number): string {
    if (isNaN(value) || isNaN(divider) || divider === 0) {
      return '0%';
    }

    return `${MathHelper.divideAndRoundPercentage(value, divider)}%`;
  }
}
