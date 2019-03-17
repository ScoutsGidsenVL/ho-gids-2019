import { Component, OnInit } from '@angular/core';
import { SwipeHelper } from '../core/swipe.helper';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {
  public selectedIndex: number;
  public tabsCount = 3;

  constructor() { }

  ngOnInit() {
  }

  public onSwipeLeft(event) {
    if (this.selectedIndex + 1 <= this.tabsCount - 1) {
      this.selectedIndex += 1;
    }
  }

  public onSwipeRight(event) {
    if (!SwipeHelper.IsFromLeftBorder(event) && this.selectedIndex - 1 >= 0) {
      this.selectedIndex -= 1;
    }
  }

}
