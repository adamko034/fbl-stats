import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'reverseBoolean'
})
export class ReverseBooleanPipe implements PipeTransform {
  public transform(value: boolean): boolean {
    return !value;
  }
}
