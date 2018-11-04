import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CalendarDay, CalendarService } from './calendar.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  public calendar$: Observable<CalendarDay[]>;

  constructor(calendarService: CalendarService) {
    this.calendar$ = calendarService.calendar$;
  }

  ngOnInit() {
  }

}
