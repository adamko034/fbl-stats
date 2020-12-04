import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SelectTeamsFromTableComponent } from 'src/app/layout/content/components/players-filters/components/players-filter-teams/components/select-teams-from-table/select-teams-from-table.component';

@Component({
  selector: 'app-select-more-form-dialog',
  templateUrl: './select-more-form-dialog.component.html',
  styleUrls: ['./select-more-form-dialog.component.scss']
})
export class SelectMoreFormDialogComponent implements OnInit {
  public min = 6;
  public value = 6;

  constructor(
    private matDialogRef: MatDialogRef<SelectTeamsFromTableComponent, number>,
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
