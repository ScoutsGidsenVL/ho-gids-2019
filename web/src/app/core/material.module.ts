import { NgModule } from '@angular/core';
import {
    MatButtonModule,
    MatCardModule,
    MatExpansionModule,
    MatIconModule,
    MatListModule,
    MatSidenavModule,
    MatTabsModule,
    MatToolbarModule,
} from '@angular/material';

@NgModule({
    exports: [
        MatButtonModule,
        MatCardModule,
        MatExpansionModule,
        MatIconModule,
        MatListModule,
        MatSidenavModule,
        MatTabsModule,
        MatToolbarModule,
    ]
})
export class MaterialModule { }
