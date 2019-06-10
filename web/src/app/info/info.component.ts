import { Component, OnInit } from '@angular/core';
import { SwipeHelper } from '../core/swipe.helper';

export interface SanctieElement {
  wat: string;
  oke: string;
  sanctie: string;
}

const Sancties: SanctieElement[] = [
  {
    wat: '(alle) drugs', oke: 'NEEN',
    sanctie: 'Naar huis + natraject'
  },
  {
    wat: 'Dronken aankomen op HO', oke: 'Sanctie bij overlast met schade',
    sanctie: 'Overlast: verwittigen ploeg veiligheid\nOverlast met schade: naar huis + natraject'
  },
  {
    wat: 'Eigen drank', oke: 'NEEN',
    sanctie: 'Indien weigering om drank af te geven: toegang tot HO ontzeggen / afnemen + ploeg veiligheid verwittigen'
  },
  {
    wat: 'Pintjes / alcohol', oke: 'Sanctie bij overlast met schade',
    sanctie: 'Overlast: verwittigen ploeg veiligheid\nOverlast met schade: naar huis + natraject'
  }
];


@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {
  public selectedIndex: number;
  public tabsCount = 3;

  public displayedColumns: string[] = ['wat', 'oke', 'sanctie'];
  public dataSource = Sancties;

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
