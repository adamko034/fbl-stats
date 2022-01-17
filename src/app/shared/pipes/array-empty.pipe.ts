import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'arrayEmpty'
})
export class ArrayEmptyPipe implements PipeTransform {
  public transform(value: any[]): boolean {
    if (value == null) {
      return true;
    }

    return value.filter((v) => v != null).length === 0;
  }
}
