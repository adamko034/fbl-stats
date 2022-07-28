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
  public searchTerm: string;

  private _teams: TeamsSelectTeam[];
  public get teams(): TeamsSelectTeam[] {
    return this._teams;
  }

  public get isTeamSelected(): boolean {
    return this._teams?.some((team) => team.selected);
  }

  public get allSelected(): boolean {
    return this._teams?.every((t) => t.selected);
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

  public onSearch(): void {
    if (!!this.searchTerm || this.searchTerm === '') {
      this._teams = this.data.teams.filter(
        (t) =>
          t.longName.toLocaleLowerCase().includes(this.searchTerm) ||
          t.shortName.toLocaleLowerCase().includes(this.searchTerm)
      );
    }
  }

  public onUnselectAll(): void {
    this.teams.forEach((team) => (team.selected = false));
  }

  public onSelectAll(): void {
    this.teams.forEach((t) => (t.selected = true));
  }

  public clearSearch(): void {
    this.searchTerm = '';
    this._teams = [...this.data.teams];
  }

  public trackTeamsBy(index, item: TeamsSelectTeam): string {
    return item.shortName;
  }
}
