import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { filter, takeUntil, withLatestFrom } from 'rxjs/operators';
import { ArrayStream } from 'src/app/services/array-stream.service';
import { FiltersStoreService } from 'src/app/services/filters-store.service';
import { TeamProperty } from 'src/app/store/teams/models/team-property.model';
import { TeamsStore } from 'src/app/store/teams/teams.store';
import { SelectableTeam } from '../../models/selectable-team.model';
import { SelectTeamsDialogComponent } from './select-teams-dialog/select-teams-dialog.component';

@Component({
  selector: 'app-players-filter-teams',
  templateUrl: './players-filter-teams.component.html',
  styleUrls: ['./players-filter-teams.component.scss']
})
export class PlayersFilterTeamsComponent implements OnInit {
  private destroyed$ = new Subject<void>();
  public selectedTeams: SelectableTeam[] = [];

  public get selectedTeamsCount(): number {
    return this.getSelectedTeams().length;
  }

  constructor(
    private fitlersStoreService: FiltersStoreService,
    private teamsStore: TeamsStore,
    private matDialog: MatDialog
  ) {}

  public ngOnInit(): void {
    this.fitlersStoreService
      .selectTeams()
      .pipe(withLatestFrom(this.teamsStore.selectAllNames()), takeUntil(this.destroyed$))
      .subscribe(([selectedTeamsFilter, allTeams]) => {
        this.selectedTeams = !selectedTeamsFilter ? [] : [...selectedTeamsFilter];
        const notSelectedTeams = allTeams.filter(
          (team) => this.selectedTeams.findIndex((selectedTeam) => selectedTeam.short === team.short) < 0
        );

        notSelectedTeams.forEach(({ name, short }) => {
          this.selectedTeams.push({ name, short, selected: false });
        });
      });
  }

  public isTeamSelected(): boolean {
    return this.selectedTeams.filter((t) => t.selected).length > 0;
  }

  public openDialog(): void {
    this.matDialog
      .open(SelectTeamsDialogComponent, {
        data: { teams: new ArrayStream(this.selectedTeams).collect() }
      })
      .afterClosed()
      .pipe(
        filter((teams) => !!teams),
        takeUntil(this.destroyed$)
      )
      .subscribe((chosenTeams: TeamProperty[]) => {
        for (const selectedTeam of this.selectedTeams) {
          selectedTeam.selected = chosenTeams.some((chosenTeam) => chosenTeam.name === selectedTeam.name);
        }

        this.sendSelectedTeams();
      });
  }

  private sendSelectedTeams(): void {
    const teamsToSend = this.getSelectedTeams();
    this.fitlersStoreService.updateTeams(teamsToSend.length > 0 ? teamsToSend : null);
  }

  private getSelectedTeams(): SelectableTeam[] {
    return this.selectedTeams.filter((t) => t.selected);
  }
}
