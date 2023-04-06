import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'arrayFilterBy'
})
export class ArrayFilterBy implements PipeTransform {
  public transform(value: any[], predicate: (item: any) => boolean): any[] {
    if (value == null) {
      return [];
    }

    return value.filter(predicate);
  }
}
