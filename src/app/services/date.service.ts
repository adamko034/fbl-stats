import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { EpochDatePipe } from '../shared/pipes/epoch-date.pipe';

@Injectable({ providedIn: 'root' })
export class DateService {
  public format(date: Date, format: string): string {
    return moment(date).format(format);
  }

  public formatOrDefault(date: number, format: string, textIfDateNull: string) {
    if (!!date) {
      return this.format(new EpochDatePipe().transform(date), format);
    }

    return textIfDateNull;
  }

  public isDate(obj: any): boolean {
    return moment.isDate(new Date(obj));
  }

  public fromEpochSeconds(seconds: number): Date {
    const date = new Date(0);
    date.setUTCSeconds(seconds);

    return date;
  }
}
