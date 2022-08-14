import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nullableText'
})
export class NullableTextPipe implements PipeTransform {
  transform(value: string, textIfNull: string, suffixIfNotNull): string {
    if (value === null) {
      return textIfNull;
    }

    return `${value}${suffixIfNotNull}`;
  }
}
