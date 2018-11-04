import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, take } from 'rxjs/operators';
import { CalendarDay, CalendarService } from 'src/app/calendar/calendar.service';

@Injectable({
  providedIn: 'root',
})
export class CalendarResolverService implements Resolve<CalendarDay[]> {
  constructor(private calendarService: CalendarService) { }

  resolve(): Observable<CalendarDay[]> {
    return this.calendarService.calendar$.pipe(
      filter(x => x && x.length > 1),
      take(1));
  }
}
