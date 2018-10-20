import { Component, OnInit } from '@angular/core';

interface CalendarItem {
  text: string;
  start: Date;
  end: Date;
}

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  public friday: CalendarItem[] = [
    {
      start: new Date('2018-08-23T19:00:00'),
      end: null,
      text: 'Aankomst'
    },
    {
      start: new Date('2018-08-23T20:00:00'),
      end: new Date('2018-08-23T22:45:00'),
      text: 'Onthaal en instapacitiviteit op de gouwgrond'
    },
    {
      start: new Date('2018-08-23T23:15:00'),
      end: new Date('2018-08-24T00:00:00'),
      text: 'Opening met jaarlied en jaardans'
    },
    {
      start: new Date('2018-08-24T00:00:00'),
      end: new Date('2018-08-24T02:30:00'),
      text: 'Scouteske avond'
    },
    {
      start: new Date('2018-08-24T02:30:00'),
      end: null,
      text: 'Slaapwel'
    },
  ];
  public saturday: CalendarItem[];
  public sunday: CalendarItem[];

  constructor() { }

  ngOnInit() {
  }

}
