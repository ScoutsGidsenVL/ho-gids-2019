import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CalendarItemComponent } from './calendar/calendar-item/calendar-item.component';
import { CalendarResolverService } from './calendar/calendar-resolver.service';
import { CalendarComponent } from './calendar/calendar.component';
import { CalendarService } from './calendar/calendar.service';
import { MaterialModule } from './core/material.module';
import { HomeComponent } from './home/home.component';
import { InfoComponent } from './info/info.component';
import { MapComponent } from './map/map.component';
import { MapService } from './map/map.service';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MapComponent,
    InfoComponent,
    PageNotFoundComponent,
    CalendarComponent,
    CalendarItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [
    CalendarService,
    CalendarResolverService,
    MapService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
