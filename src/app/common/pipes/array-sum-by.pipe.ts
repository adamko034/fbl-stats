import { Pipe, PipeTransform } from '@angular/core';
import { ArrayStream } from 'src/app/services/array-stream.service';

@Pipe({
  name: 'arraySumBy'
})
export class ArraySumBy implements PipeTransform {
  public transform(value: any[], predicate: (item: any) => number): number {
    if (value == null) {
      return 0;
    }

    return new ArrayStream(value).sumBy(predicate);
  }
}
