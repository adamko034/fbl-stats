import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SelectableTeam } from 'src/app/modules/players/views/players-fantasy/components/players-filters/components/players-filter-teams/model/selectable-team.model';
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-select-teams-dialog',
  templateUrl: './select-teams-dialog.component.html',
  styleUrls: ['./select-teams-dialog.component.scss']
})
export class SelectTeamsDialogComponent implements OnInit {
  public searchTerm: string;
  public teams: SelectableTeam[];

  constructor(
    private dialogRef: MatDialogRef<SelectTeamsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { teams: SelectableTeam[] }
  ) {}

  public ngOnInit(): void {
    this.teams = [...this.data.teams];
  }

  public close(): void {
    this.dialogRef.close(this.teams.filter((t) => t.selected));
  }

  public onSearch(): void {
    if (!!this.searchTerm || this.searchTerm === '') {
      this.teams = this.data.teams.filter(
        (t) =>
          t.name.toLocaleLowerCase().includes(this.searchTerm) || t.short.toLocaleLowerCase().includes(this.searchTerm)
      );
    }
  }

  public clearSearch(): void {
    this.searchTerm = '';
    this.teams = [...this.data.teams];
  }

  public trackTeamsBy(index, item: SelectableTeam) {
    return item.short;
  }
}
