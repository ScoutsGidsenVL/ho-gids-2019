import { Component, OnDestroy, OnInit } from '@angular/core';
import { circle, latLng, tileLayer, Circle, LatLng } from 'leaflet';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MapService } from './map.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, OnDestroy {
  public onDestroy$ = new Subject();

  constructor(mapService: MapService) {
    mapService.geoJson$.pipe(takeUntil(this.onDestroy$)).subscribe(geoJson => {
      this.geoJsonLayer = geoJson;
    });
  }

  public options = {
    layers: [
      tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' })
    ],
    zoom: 13.4,
    center: latLng(51.240683, 4.931039)
  };

  public center: LatLng;
  public locationLayer: Circle;
  public geoJsonLayer: Circle;

  private locationWatch: number;

  ngOnDestroy(): void {
    if (this.locationWatch) {
      navigator.geolocation.clearWatch(this.locationWatch);
    }
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  ngOnInit() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.center = latLng(position.coords.latitude, position.coords.longitude);
      });

      const that = this;
      this.locationWatch = navigator.geolocation.watchPosition((position) => {
        const cords = latLng(position.coords.latitude, position.coords.longitude);
        if (that.locationLayer) {
          const oldCords = that.locationLayer.getLatLng();
          const radius = that.locationLayer.getRadius();
          if (oldCords.lat === cords.lat && oldCords.lng === cords.lng && radius === position.coords.accuracy) {
            return;
          }
        }
        that.locationLayer = circle(cords, { radius: position.coords.accuracy });
      }, (err) => {
        that.locationLayer = null;
      }, {
          enableHighAccuracy: true,
          maximumAge: 1000 * 10
        });
    }
  }
}
