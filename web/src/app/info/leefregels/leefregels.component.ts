import { Component, OnInit } from '@angular/core';

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
  selector: 'app-leefregels',
  templateUrl: './leefregels.component.html',
  styleUrls: ['./leefregels.component.scss']
})
export class LeefregelsComponent implements OnInit {

  public displayedColumns: string[] = ['wat', 'oke', 'sanctie'];
  public dataSource = Sancties;

  constructor() { }

  ngOnInit() {
  }

}
