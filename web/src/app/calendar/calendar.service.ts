import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { combineLatest, timer, BehaviorSubject } from 'rxjs';

export interface CalendarDay {
  label: string;
  items: CalendarItem[];
  active: boolean;
}

export interface CalendarItem {
  title: string;
  description: string;
  start: Date;
  end: Date;
  showStart: boolean;
  showEnd: boolean;
  active: boolean;
  passed: boolean;
  location: string;
}

@Injectable({
  providedIn: 'root'
})
export class CalendarService {
  private calendarSubject$: BehaviorSubject<CalendarDay[]> = new BehaviorSubject<CalendarDay[]>(null);
  private calendarWithActiveSubject$: BehaviorSubject<CalendarDay[]> = new BehaviorSubject<CalendarDay[]>(null);
  public calendar$ = this.calendarWithActiveSubject$.asObservable();

  constructor(private http: HttpClient) {
    this.update();
    combineLatest(this.calendarSubject$, timer(0, 10000), (calendar, _) => {
      if (!calendar) {
        return calendar;
      }

      const current = new Date();
      calendar.forEach(day => {
        day.items.forEach(item => {
          item.active = item.start <= current && current < item.end;
          item.passed = current >= item.end;
          if (item.active) {
            day.active = true;
          }
        });
      });
      return calendar;
    }).subscribe(x => this.calendarWithActiveSubject$.next(x));
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
