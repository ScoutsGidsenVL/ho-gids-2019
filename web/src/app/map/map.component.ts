import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { circle, latLng, tileLayer, Circle, LatLng, LayerGroup } from 'leaflet';
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

  constructor(mapService: MapService,
    route: ActivatedRoute) {
    mapService.geoJson$.pipe(takeUntil(this.onDestroy$))
      .subscribe(geoJson => {
        this.geoJsonLayer = geoJson;
        this.viewLocation();
      });

    route.queryParams.pipe(takeUntil(this.onDestroy$))
      .subscribe(queryParams => {
        this.options.zoom = 25;
        this.locationName = queryParams.location;
        this.viewLocation();
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
  public locationName: string;
  public locationLayer: Circle;
  public geoJsonLayer: LayerGroup<any>;

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
      if (!this.center) {
        navigator.geolocation.getCurrentPosition(position => {
          this.center = latLng(position.coords.latitude, position.coords.longitude);
        });
      }

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

  private viewLocation(): LatLng {
    if (!this.locationName || !this.geoJsonLayer) {
      return;
    }
    const location = this.parseLayersAndFindCenter(this.geoJsonLayer, this.locationName);
    if (location) {
      this.center = location;
      this.options.center = location;
    }
  }

  private parseLayersAndFindCenter(layer: any, name: string): LatLng {
    if (layer._layers) {
      const keys = Object.keys(layer._layers);
      for (const key of keys) {
        const child = layer._layers[key];
        const result = this.parseLayersAndFindCenter(child, name);
        if (result) {
          return result;
        }
      }
    }
    if (layer.feature && layer.feature.properties && layer.feature.properties.name) {
      if (layer.feature.properties.name === name) {
        return layer._bounds.getCenter();
      }
    }
    return;
  }
}
