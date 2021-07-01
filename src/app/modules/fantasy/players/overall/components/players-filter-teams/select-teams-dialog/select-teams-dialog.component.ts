import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SelectableTeam } from '../../../models/selectable-team.model';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-select-teams-dialog',
  templateUrl: './select-teams-dialog.component.html',
  styleUrls: ['./select-teams-dialog.component.scss']
})
export class SelectTeamsDialogComponent implements OnInit {
  public searchTerm: string;
  public teams: SelectableTeam[];

  public get isTeamSelected(): boolean {
    return this.teams?.some((team) => team.selected);
  }

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

  public onUnselectAll(): void {
    this.teams.forEach((team) => (team.selected = false));
  }

  public clearSearch(): void {
    this.searchTerm = '';
    this.teams = [...this.data.teams];
  }

  public trackTeamsBy(index, item: SelectableTeam) {
    return item.short;
  }
}
