import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'timeInOrAgo'
})
export class TimeInOrAgoPipe implements PipeTransform {
  public transform(date: Date): string {
    if (date >= new Date()) {
      return moment(date).toNow();
    }

    return moment(date).fromNow();
  }
}
