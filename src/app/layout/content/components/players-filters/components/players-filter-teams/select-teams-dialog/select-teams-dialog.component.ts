import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SelectableTeam } from 'src/app/layout/content/components/players-filters/components/players-filter-teams/model/selectable-team.model';

@Component({
  selector: 'app-select-teams-dialog',
  templateUrl: './select-teams-dialog.component.html',
  styleUrls: ['./select-teams-dialog.component.scss']
})
export class SelectTeamsDialogComponent {
  constructor(
    private dialogRef: MatDialogRef<SelectTeamsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { teams: SelectableTeam[] }
  ) {}

  public close(): void {
    this.dialogRef.close(this.data.teams.filter((t) => t.selected));
  }
}
