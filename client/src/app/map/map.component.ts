import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { MapService } from './map.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  /// default settings
  private map: mapboxgl.Map;
  private style = 'mapbox://styles/crejer/cjkgplqv71sg32roypxm25vei';
  private lng = 4.931039;
  private lat = 51.240683;
  private zoom = 13.4;

  constructor(mapService: MapService) {

  }

  ngOnInit() {
    this.initializeMap();
  }

  private initializeMap() {
    /// locate the user
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
        /*this.map.flyTo({
          center: [this.lng, this.lat],
        });*/
      });
    }

    this.buildMap();

  }

  buildMap() {
    this.map = new mapboxgl.Map({
      container: 'map',
      style: this.style,
      zoom: this.zoom,
      center: [this.lng, this.lat]
    });
  }
}
