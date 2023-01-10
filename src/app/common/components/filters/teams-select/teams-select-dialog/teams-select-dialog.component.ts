import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TeamsSelectTeam } from '../models/teams-select-team.model';

@Component({
  selector: 'app-teams-select-dialog',
  templateUrl: './teams-select-dialog.component.html',
  styleUrls: ['./teams-select-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TeamsSelectDialogComponent implements OnInit {
  private _teams: TeamsSelectTeam[];
  public get teams(): TeamsSelectTeam[] {
    return this._teams;
  }

  public get isTeamSelected(): boolean {
    return this._teams?.some((team) => team.selected);
  }

  public get canSend(): boolean {
    return this._teams.filter((t) => t.selected).length >= this.data.minSelected;
  }

  constructor(
    private dialogRef: MatDialogRef<TeamsSelectDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { teams: TeamsSelectTeam[]; minSelected: number }
  ) {}

  public ngOnInit(): void {
    this._teams = [...this.data.teams];
  }

  public close(): void {
    this.dialogRef.close(this._teams.filter((t) => t.selected));
  }

  public toggleSelectAll(): void {
    const allUnselected = this.teams.every((team) => !team.selected);
    this.teams.forEach((team) => (team.selected = allUnselected ? true : false));
  }

  public trackTeamsBy(index, item: TeamsSelectTeam): string {
    return item.shortName;
  }
}
