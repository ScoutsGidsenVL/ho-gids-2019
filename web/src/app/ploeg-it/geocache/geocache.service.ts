import { Injectable } from '@angular/core';

export class FoundWord {
  location: string;
  word: string;
  time: Date;
}

@Injectable({
  providedIn: 'root'
})
export class GeocacheService {

  constructor() {
    const foundWordsString = localStorage.getItem('foundWords');
    if (!foundWordsString) {
      this.clearFoundWords();
    } else {
      this.foundWords = JSON.parse(foundWordsString);
    }

  }
  private foundWords: FoundWord[];

  public getFoundWords(): FoundWord[] {
    return this.foundWords;
  }

  public clearFoundWords() {
    this.foundWords = [];
    this.storeFoundWords();
  }

  public addWord(location: string, word: string): FoundWord {
    let foundWord = this.foundWords.find(x => x.location === location);
    if (!foundWord) {
      foundWord = {
        location: location,
        word: null,
        time: null,
      };
      this.foundWords.push(foundWord);
    }
    foundWord.word = word;
    foundWord.time = new Date();
    this.storeFoundWords();
    return foundWord;
  }

  private storeFoundWords() {
    const foundWordsString = JSON.stringify(this.foundWords);
    localStorage.setItem('foundWords', foundWordsString);
  }

}
