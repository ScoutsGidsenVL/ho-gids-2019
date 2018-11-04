import { Component, Input, OnInit } from '@angular/core';
import { CalendarItem } from '../calendar.service';

@Component({
  selector: 'app-calendar-item',
  templateUrl: './calendar-item.component.html',
  styleUrls: ['./calendar-item.component.scss']
})
export class CalendarItemComponent implements OnInit {

  @Input() item: CalendarItem;

  constructor() { }

  ngOnInit() {
  }

}
