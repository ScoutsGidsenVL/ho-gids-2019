import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { geoJSON } from 'leaflet';
import { BehaviorSubject } from 'rxjs';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  private geoJsonSubject$: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  public geoJson$ = this.geoJsonSubject$.asObservable().pipe(filter(x => x));

  constructor(http: HttpClient) {
    http.get('./assets/map.geo.json').subscribe((data: any) => {
      this.geoJsonSubject$.next(geoJSON(data));
    });
  }
}
