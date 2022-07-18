import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'arrayIncludes' })
export class ArrayIncludesPipe implements PipeTransform {
  public transform(values: any[], value: any) {
    return values.includes(value);
  }
}
