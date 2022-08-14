import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'take'
})
export class TakePipe implements PipeTransform {
  transform(array: any[], n: number): any[] {
    return array.slice(0, n);
  }
}
