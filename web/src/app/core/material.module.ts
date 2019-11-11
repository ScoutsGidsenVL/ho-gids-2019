import { NgModule } from '@angular/core';
import {
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatExpansionModule,
    MatIconModule,
    MatListModule,
    MatSidenavModule,
    MatSnackBarModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
} from '@angular/material';

@NgModule({
    exports: [
        MatButtonModule,
        MatCardModule,
        MatDialogModule,
        MatExpansionModule,
        MatIconModule,
        MatListModule,
        MatSidenavModule,
        MatTabsModule,
        MatToolbarModule,
        MatTableModule,
        MatSnackBarModule
    ]
})
export class MaterialModule { }
