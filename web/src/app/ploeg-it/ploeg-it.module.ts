import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MaterialModule } from '../core/material.module';
import { GeocacheFoundComponent } from './geocache-found/geocache-found.component';
import { GeocacheComponent } from './geocache/geocache.component';
import { GeocacheService } from './geocache/geocache.service';
import { PloegItRoutingModule } from './ploeg-it-routing.module';
import { PloegItComponent } from './ploeg-it.component';

@NgModule({
  declarations: [
    GeocacheComponent,
    PloegItComponent,
    GeocacheFoundComponent
  ],
  imports: [
    MaterialModule,
    CommonModule,
    PloegItRoutingModule
  ],
  providers: [
    GeocacheService,
  ]
})
export class PloegItModule { }
