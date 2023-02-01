import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';
import { dateFormat } from 'src/app/shared/constants';

@Injectable({
  providedIn: 'root'
})
export class DateFormatterService {

  constructor(private datePipe: DatePipe) { }

  getShortDisplayDate(date: Date | undefined) {
    if (date === undefined) {
      return this.datePipe.transform(new Date(0), dateFormat);
    }
    return this.datePipe.transform(date, dateFormat);
  }
}
