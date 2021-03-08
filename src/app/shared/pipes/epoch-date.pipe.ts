import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'epochDate' })
export class EpochDatePipe implements PipeTransform {
  public transform(value: number) {
    const date = new Date(0);
    date.setUTCSeconds(value);

    console.log(date);

    return date;
  }
}
