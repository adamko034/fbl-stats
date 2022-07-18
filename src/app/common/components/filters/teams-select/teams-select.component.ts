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
  @Input() state: TeamsSelectState;
  @Output() change = new EventEmitter<string[]>();

  public get selectedTeamsCount(): number {
    return this.state.teams.filter((t) => t.selected).length;
  }

  constructor(private _matDialog: MatDialog) {}

  ngOnInit(): void {}

  public isTeamSelected(): boolean {
    return this.state.teams.some((t) => t.selected);
  }

  public openDialog(): void {
    this._matDialog
      .open(TeamsSelectDialogComponent, {
        data: { teams: [...this.state.teams] }
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

  private sendSelectedTeams(selectedTeams: TeamsSelectTeam[]): void {
    if (selectedTeams.length === 0) {
      this.change.emit(null);
    }

    const shortNames = [];
    selectedTeams.forEach((t) => shortNames.push(t.shortName));

    this.change.emit(shortNames);
  }
}
