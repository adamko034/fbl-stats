import { Pipe, PipeTransform } from '@angular/core';
import { MathHelper } from 'src/app/shared/helpers/math.helper';

@Pipe({
  name: 'divideAndRound'
})
export class DivideAndRoundPipe implements PipeTransform {
  public transform(value: number, divider: number): number {
    if (isNaN(value) || isNaN(divider) || divider === 0) {
      return value;
    }

    return MathHelper.divideAndRound(value, divider);
  }
}
