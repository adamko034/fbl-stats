import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { TeamsSelectState } from './models/teams-select-state';
import { TeamsSelectTeam } from './models/teams-select-team.model';
import { TeamsSelectDialogComponent } from './teams-select-dialog/teams-select-dialog.component';

@UntilDestroy()
@Component({
  selector: 'app-teams-select',
  templateUrl: './teams-select.component.html',
  styleUrls: ['./teams-select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TeamsSelectComponent implements OnInit {
  @Input() set state(state: TeamsSelectState) {
    this._allTeams = [...state.teams];
    this.setSelectedTeams(state.teams);

    this._minSelected = state.minSelected;
  }
  @Output() change = new EventEmitter<string[]>();

  private _allTeams: TeamsSelectTeam[];
  private _minSelected: number = 1;

  public get allTeamsSelected(): boolean {
    return this._allTeams.every((t) => t.selected);
  }

  public get someTeamsSelected(): boolean {
    return this._allTeams.filter((t) => t.selected).length != 18;
  }

  public get selectedTeamsCount(): number {
    return this._allTeams.filter((t) => t.selected).length;
  }

  constructor(private _matDialog: MatDialog) {}

  ngOnInit(): void {}

  public openDialog(): void {
    this._matDialog
      .open(TeamsSelectDialogComponent, {
        data: { teams: [...this._allTeams], minSelected: this._minSelected }
      })
      .afterClosed()
      .pipe(untilDestroyed(this))
      .subscribe((selectedTeams: TeamsSelectTeam[]) => {
        this.sendSelectedTeams(selectedTeams);
      });
  }

  public clearSelection(): void {
    this.sendSelectedTeams([]);
  }

  private setSelectedTeams(allTeams: TeamsSelectTeam[]): void {
    const allSelected = allTeams.every((t) => !t.selected);
    if (allSelected) {
      this._allTeams.forEach((t) => (t.selected = true));
    }
  }

  private sendSelectedTeams(selectedTeams: TeamsSelectTeam[]): void {
    if (selectedTeams) {
      const toSend = selectedTeams.length === this._allTeams.length ? [] : selectedTeams.map((t) => t.shortName);
      this.change.emit(toSend);
    }
  }
}
