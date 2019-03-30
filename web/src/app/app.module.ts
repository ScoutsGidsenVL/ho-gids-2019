import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';

import { environment } from '../environments/environment';
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
import { MapComponent } from './map/map.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PloegItModule } from './ploeg-it/ploeg-it.module';

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
    EmergencyInfoComponent
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
    CalendarResolverService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
