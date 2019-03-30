import { Component, OnInit } from '@angular/core';
import { FoundWord, GeocacheService } from './geocache.service';

@Component({
  selector: 'app-geocache',
  templateUrl: './geocache.component.html',
  styleUrls: ['./geocache.component.scss']
})
export class GeocacheComponent implements OnInit {

  public foundWords: FoundWord[];

  constructor(private geocacheService: GeocacheService) {
    this.foundWords = geocacheService.getFoundWords()
      .sort((a, b, ) => a.location.localeCompare(b.location));
  }

  ngOnInit() {
  }

  public clearFoundWords() {
    this.geocacheService.clearFoundWords();
    this.foundWords = [];
  }
}
