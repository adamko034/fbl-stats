import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'yesNo' })
export class YesNoPipe implements PipeTransform {
  public transform(value: any) {
    if (typeof value === 'boolean') {
      return value ? 'TRUE' : 'FALSE';
    }

    return 'FALSE';
  }
}
