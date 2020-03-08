import { HttpClientModule } from '@angular/common/http';
import { Injectable, NgModule } from '@angular/core';
import { BrowserModule, HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';

import { environment } from '../environments/environment';
import { AnnualSongComponent } from './annual-song/annual-song.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CalendarItemComponent } from './calendar/calendar-item/calendar-item.component';
import { CalendarResolverService } from './calendar/calendar-resolver.service';
import { CalendarComponent } from './calendar/calendar.component';
import { CalendarService } from './calendar/calendar.service';
import { ContactComponent } from './contact/contact.component';
import { MaterialModule } from './core/material.module';
import { HomeComponent } from './home/home.component';
import { EmergencyInfoComponent } from './info/emergency-info/emergency-info.component';
import { InfoComponent } from './info/info.component';
import { LeefregelsComponent } from './info/leefregels/leefregels.component';
import { PraktischComponent } from './info/praktisch/praktisch.component';
import { TijdVoorInspiratieComponent } from './info/tijd-voor-inspiratie/tijd-voor-inspiratie.component';
import { LocationDialogComponent } from './map/location-dialog/location-dialog.component';
import { MapComponent } from './map/map.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PloegItModule } from './ploeg-it/ploeg-it.module';

@Injectable()
export class CustomHammerConfig extends HammerGestureConfig {
  overrides = <any>{
    'pinch': { enable: false },
    'rotate': { enable: false }
  };
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MapComponent,
    InfoComponent,
    PageNotFoundComponent,
    CalendarComponent,
    CalendarItemComponent,
    ContactComponent,
    EmergencyInfoComponent,
    AnnualSongComponent,
    PraktischComponent,
    LeefregelsComponent,
    TijdVoorInspiratieComponent,
    LocationDialogComponent
  ],
  entryComponents: [
    LocationDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    LeafletModule.forRoot(),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    PloegItModule,
    AppRoutingModule
  ],
  providers: [
    CalendarService,
    CalendarResolverService,
    {
      provide: HAMMER_GESTURE_CONFIG,
      useClass: CustomHammerConfig
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
