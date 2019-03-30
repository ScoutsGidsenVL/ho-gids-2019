import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FoundWord, GeocacheService } from '../geocache/geocache.service';

@Component({
  selector: 'app-geocache-found',
  templateUrl: './geocache-found.component.html',
  styleUrls: ['./geocache-found.component.scss']
})
export class GeocacheFoundComponent implements OnInit {

  public foundWord: FoundWord;

  constructor(geocacheService: GeocacheService,
    activatedRoute: ActivatedRoute) {
    const location = activatedRoute.snapshot.params['location'];
    const word = activatedRoute.snapshot.params['word'];
    this.foundWord = geocacheService.addWord(location, word);
  }

  ngOnInit() {
  }

}
