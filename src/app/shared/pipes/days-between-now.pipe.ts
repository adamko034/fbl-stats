import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({ name: 'daysBetweenNow' })
export class DaysBetweenNowPipe implements PipeTransform {
  public transform(value: Date) {
    const now = moment();
    const date = moment(value);

    return `${date.diff(now, 'days')} days`;
  }
}
