import { Injectable } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  constructor() {
    mapboxgl.accessToken = environment.mapbox.accessToken;
  }
}
