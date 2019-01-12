import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Feature, GeometryObject } from 'geojson';
import { circle, divIcon, geoJSON, icon, marker, polygon, FeatureGroup, LatLng, Layer, LayerGroup } from 'leaflet';
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

      const layerGroup = new LayerGroup();


      const labelClassName = 'map-label';
      const iconClassName = 'map-icon';
      const iconRectClassName = 'map-icon-rect';

      const styles = {
        'podium': {
          fillColor: '#f07d00',
          fillOpacity: 1,
          stroke: false
        },
        'podiumgrond': {
          fillColor: '#006f93',
          fillOpacity: 1,
          stroke: false
        },
        'pavilioen': {
          fillColor: '#e2afc4',
          fillOpacity: 1,
          stroke: false
        },
        'loods': {
          fillColor: '#dae283',
          fillOpacity: 1,
          stroke: false
        },
        'kampeergrond': {
          fillColor: '#51af31',
          fillOpacity: 1,
          stroke: false,
          lineJoin: 'round'
        },
        'kampeergrond-ongebruikt': {
          fillColor: '#fdf7f4',
          fillOpacity: 1,
          stroke: false,
          lineJoin: 'round'
        },
        'aanbod': {
          fillColor: '#da0c25',
          fillOpacity: 1,
          stroke: false,
          lineJoin: 'round'
        },
        'vijver': {
          fillColor: '#009fe3',
          fillOpacity: 0.6,
          stroke: false,
          lineJoin: 'round'
        },
        'bos': {
          fillColor: '#7e216e',
          fillOpacity: 1,
          weight: 1,
          color: '37af6b'
        },
        'weg-hard': {
          weight: 4,
          opacity: 1,
          color: 'white',
          lineCap: 'square'
        },
        'weg-hard-2': {
          weight: 3,
          opacity: 1,
          color: 'white',
          lineCap: 'square'
        },
        'weg-halfhard': {
          weight: 3,
          opacity: 1,
          color: 'white',
          lineCap: 'square'
        },
        'weg-zand': {
          weight: 1,
          opacity: 1,
          color: '#f0a68f',
          dashArray: '5'
        },
        'faciliteit': {
          stroke: false,
          radius: 4,
          fillColor: '#0e7594',
          fillOpacity: 1
        },
        'border': {
          fillColor: '#fcefe9',
          weight: 5,
          color: '#f0a68f',
          fillOpacity: 1,
          opacity: 1
        },
        'default': {
          fillColor: 'black',
          weight: 1,
          opacity: 1,
          color: 'white',
          fillOpacity: 0.7
        }
      };

      const icons = {
        'ehboIcon': icon({
          iconUrl: 'assets/kaart/ehbo.png',
          iconSize: [24, 24],
          className: iconClassName
        }),
        'infoIcon': icon({
          iconUrl: 'assets/kaart/infopunt.png',
          iconSize: [24, 24],
          className: iconClassName
        }),
        'sisIcon': icon({
          iconUrl: 'assets/kaart/sis.png',
          iconSize: [24, 24],
          className: iconClassName
        }),
        'onthaalIcon': icon({
          iconUrl: 'assets/kaart/onthaapng',
          iconSize: [24, 24],
          className: iconClassName
        }),
        'sanitair': icon({
          iconUrl: 'assets/kaart/sanitair.png',
          iconSize: [24, 24],
          className: iconClassName
        }),
        'afwasbatterij': icon({
          iconUrl: 'assets/kaart/afwasbatterij.png',
          iconSize: [24, 24],
          className: iconClassName
        }),
        'evacuatiepunt': icon({
          iconUrl: 'assets/kaart/evacuatiepunt.png',
          iconSize: [24, 24],
          className: iconClassName
        }),
        'bar': icon({
          iconUrl: 'assets/kaart/bar.png',
          iconSize: [24, 24],
          className: iconClassName
        }),
        'eten': icon({
          iconUrl: 'assets/kaart/eten.png',
          iconSize: [24, 24],
          className: iconClassName
        }),
        'tent': icon({
          iconUrl: 'assets/kaart/tent.png',
          iconSize: [128, 64],
          className: iconRectClassName
        }),
        'locationIcon': icon({
          iconUrl: 'assets/kaart/marker-location.png',
          iconRetinaUrl: 'assets/kaart/marker-location-2x.png',
          shadowUrl: 'assets/kaart/marker-shadow.png',
          shadowRetinaUrl: 'assets/kaart/marker-shadow.png',
          iconSize: [25, 41],
          iconAnchor: [12, 41],
          popupAnchor: [1, -34],
          shadowSize: [41, 41]
        })
      };

      function style(feature: Feature<GeometryObject, any>) {
        return styles[feature.properties.style] || styles.default;
      }

      function markerIcon(feature: Feature<GeometryObject, any>, latlng: LatLng) {
        if (feature.properties.name) {
          switch (feature.properties.name.toLowerCase()) {
            case 'ehbo': return marker(latlng, { icon: icons.ehboIcon });
            case 'infopunt': return marker(latlng, { icon: icons.infoIcon });
            case 'sis': return marker(latlng, { icon: icons.sisIcon });
            case 'onthaal': return marker(latlng, { icon: icons.onthaalIcon });
            case 'sanitair': return marker(latlng, { icon: icons.sanitair });
            case 'afwasbatterij': return marker(latlng, { icon: icons.afwasbatterij });
            case 'evacuatiepunt': return marker(latlng, { icon: icons.evacuatiepunt });
            case 'centrale bar': return marker(latlng, { icon: icons.bar });
            case 'bar': return marker(latlng, { icon: icons.bar });
            case 'eten': return marker(latlng, { icon: icons.eten });
          }
        }
        return circle(latlng, 7);
      }

      function mapFilter(feature: Feature<GeometryObject, any>): boolean {
        return feature.properties.show_on_map !== false;
      }

      function onEachFeature(feature: Feature<GeometryObject, any>, layer: Layer) {
        addLabel(feature, layer);
      }

      function addLabel(feature: Feature<GeometryObject, any>, layer: Layer) {
        if (feature.geometry.type === 'Polygon') {
          const featurePolygon = polygon(layer['_latlngs']);
          if (feature.properties.style === 'kampeergrond') {
            marker(featurePolygon.getBounds().getCenter(), { icon: icons.tent }).addTo(layerGroup);
          }
          if (feature.properties.name) {
            const labelIcon = divIcon({
              className: labelClassName,
              html: feature.properties.name
            });
            marker(featurePolygon.getBounds().getCenter(), { icon: labelIcon }).addTo(layerGroup);
          }
        }
      }

      layerGroup.addLayer(geoJSON(data,
        {
          style: style,
          pointToLayer: markerIcon,
          filter: mapFilter,
          onEachFeature: onEachFeature,
        }));
      this.geoJsonSubject$.next(layerGroup);
    });
  }
}
