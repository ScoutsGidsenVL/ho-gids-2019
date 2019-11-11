import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

export interface DialogData {
  message: string;
}

@Component({
  selector: 'app-location-dialog',
  templateUrl: './location-dialog.component.html',
  styleUrls: ['./location-dialog.component.scss']
})
export class LocationDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<LocationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  close(): void {
    this.dialogRef.close();
  }
}
