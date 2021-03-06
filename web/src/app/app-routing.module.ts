import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AnnualSongComponent } from './annual-song/annual-song.component';
import { CalendarResolverService } from './calendar/calendar-resolver.service';
import { CalendarComponent } from './calendar/calendar.component';
import { ContactComponent } from './contact/contact.component';
import { HomeComponent } from './home/home.component';
import { InfoComponent } from './info/info.component';
import { LeefregelsComponent } from './info/leefregels/leefregels.component';
import { PraktischComponent } from './info/praktisch/praktisch.component';
import { TijdVoorInspiratieComponent } from './info/tijd-voor-inspiratie/tijd-voor-inspiratie.component';
import { MapComponent } from './map/map.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'info',
    component: InfoComponent
  },
  {
    path: 'leefregels',
    component: LeefregelsComponent
  },
  {
    path: 'praktisch',
    component: PraktischComponent
  },
  {
    path: 'tijd-voor-inspiratie',
    component: TijdVoorInspiratieComponent
  },
  {
    path: 'map',
    component: MapComponent
  },
  {
    path: 'calendar',
    component: CalendarComponent,
    resolve: {
      service: CalendarResolverService
    }
  },
  { path: 'annual-song', component: AnnualSongComponent },
  { path: 'contact', component: ContactComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
