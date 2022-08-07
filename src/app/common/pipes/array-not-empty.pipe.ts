import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'arrayNotEmpty'
})
export class ArrayNotEmptyPipe implements PipeTransform {
  transform(value: any[]): boolean {
    if (value == null) {
      return false;
    }

    return value.filter((v) => v != null).length > 0;
  }
}
