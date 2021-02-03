import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable({ providedIn: 'root' })
export class DateService {
  public format(date: Date, format: string): string {
    return moment(date).format(format);
  }

  public formatOrDefault(date: Date, format: string, textIfDateNull: string) {
    if (!!date) {
      return this.format(date, format);
    }

    return textIfDateNull;
  }

  public isDate(obj: any): boolean {
    return moment.isDate(new Date(obj));
  }
}
