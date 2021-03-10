import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-select-more-matchdays-dialog',
  templateUrl: './select-more-matchdays-dialog.component.html',
  styleUrls: ['./select-more-matchdays-dialog.component.scss']
})
export class SelectMoreMatchdaysDialogComponent implements OnInit {
  public min = 6;
  public value = 6;

  constructor(
    private matDialogRef: MatDialogRef<SelectMoreMatchdaysDialogComponent, number>,
    @Inject(MAT_DIALOG_DATA) public data: { matchdays: number; lastMatchday: number }
  ) {}

  public ngOnInit(): void {
    if (!!this.data) {
      this.value = this.data.matchdays;
    }
  }

  public confirm(): void {
    this.matDialogRef.close(this.value);
  }
}
