import { Component, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { SwipeHelper } from '../core/swipe.helper';
import { CalendarDay, CalendarService } from './calendar.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnDestroy {
  public onDestroy$ = new Subject();

  public selectedIndex: number;
  public calendar: CalendarDay[];

  constructor(calendarService: CalendarService) {
    calendarService.calendar$.pipe(takeUntil(this.onDestroy$))
      .subscribe(x => {
        const activeDay = x && x.findIndex(y => y.active);
        const previousActiveDay = this.calendar && this.calendar.findIndex(y => y.active);
        if (activeDay !== previousActiveDay) {
          this.selectedIndex = activeDay;
          if (this.selectedIndex < 0) {
            this.selectedIndex = 0;
          }
        }
        this.calendar = x;
      });
  }

  public onSwipeLeft(event) {
    if (this.selectedIndex + 1 <= this.calendar.length - 1) {
      this.selectedIndex += 1;
    }
  }

  public onSwipeRight(event) {
    if (!SwipeHelper.IsFromLeftBorder(event) && this.selectedIndex - 1 >= 0) {
      this.selectedIndex -= 1;
    }
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
