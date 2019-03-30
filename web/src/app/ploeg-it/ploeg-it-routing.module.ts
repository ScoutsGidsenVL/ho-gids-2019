import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GeocacheFoundComponent } from './geocache-found/geocache-found.component';
import { GeocacheComponent } from './geocache/geocache.component';
import { PloegItComponent } from './ploeg-it.component';

const routes: Routes = [
  {
    path: 'ploeg-it',
    component: PloegItComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'geocache'
      },
      {
        path: 'geocache',
        component: GeocacheComponent,
      },
      {
        path: 'geocache/:location/:word',
        component: GeocacheFoundComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PloegItRoutingModule { }
