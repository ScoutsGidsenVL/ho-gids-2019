import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface CalendarDay {
  label: string;
  items: CalendarItem[];
}

export interface CalendarItem {
  text: string;
  start: Date;
  end: Date;
}

@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  private calendarSubject$: BehaviorSubject<CalendarDay[]> = new BehaviorSubject<CalendarDay[]>(null);
  public calendar$ = this.calendarSubject$.asObservable();

  constructor(private http: HttpClient) {
    this.update();
  }

  public update() {
    return this.http.get('./assets/calendar.json').subscribe((calendar: CalendarDay[]) => {
      calendar.forEach(day => {
        day.items.forEach(item => {
          if (item.start) {
            item.start = new Date(item.start);
          }
          if (item.end) {
            item.end = new Date(item.end);
          }
        });
      });
      this.calendarSubject$.next(calendar);
    });
  }
}
