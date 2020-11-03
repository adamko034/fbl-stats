import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { cloneDeep } from 'lodash';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { SelectableTeam } from 'src/app/layout/content/components/players-filters/components/players-filter-teams/model/selectable-team.model';
import { SelectTeamsDialogComponent } from 'src/app/layout/content/components/players-filters/components/players-filter-teams/select-teams-dialog/select-teams-dialog.component';
import { TeamProperty } from 'src/app/models/properties.model';
import { FiltersStoreService } from 'src/app/services/filters-store.service';
import { PropertiesService } from 'src/app/services/properties.service';

@Component({
  selector: 'app-players-filter-teams',
  templateUrl: './players-filter-teams.component.html',
  styleUrls: ['./players-filter-teams.component.scss']
})
export class PlayersFilterTeamsComponent implements OnInit {
  private destroyed$ = new Subject<void>();
  public selectedTeams: SelectableTeam[] = [];

  constructor(
    private fitlersStoreService: FiltersStoreService,
    private propertiesService: PropertiesService,
    private matDialog: MatDialog
  ) {}

  public ngOnInit(): void {
    this.propertiesService
      .selectTeams()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((teams: TeamProperty[]) => {
        if (teams && this.selectedTeams.length === 0) {
          this.selectedTeams = teams.map(({ name, short }) => ({ name, short, selected: false }));
        }
      });

    this.fitlersStoreService
      .selectTeams()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((teams) => {
        if (!teams) {
          this.selectedTeams.forEach((t) => (t.selected = false));
          return;
        }
      });
  }

  public isTeamSelected(): boolean {
    return this.selectedTeams.filter((t) => t.selected).length > 0;
  }

  public openDialog(): void {
    const dialogRef = this.matDialog.open(SelectTeamsDialogComponent, {
      data: { teams: cloneDeep(this.selectedTeams) }
    });

    dialogRef.afterClosed().subscribe((chosenTeams: TeamProperty[]) => {
      if (chosenTeams) {
        for (const selectedTeam of this.selectedTeams) {
          selectedTeam.selected = chosenTeams.some((chosenTeam) => chosenTeam.name === selectedTeam.name);
        }

        this.sendSelectedTeams();
      }
    });
  }

  public getSelectedTeamsChips(): string[] {
    return this.getSelectedTeams()
      .map((t) => t.short)
      .sort();
  }

  public onChipRemove(teamShortName: string) {
    this.selectedTeams.find((t) => t.short === teamShortName).selected = false;
    this.sendSelectedTeams();
  }

  private sendSelectedTeams(): void {
    const teamsToSend = this.getSelectedTeams();
    this.fitlersStoreService.updateTeams(teamsToSend.length > 0 ? teamsToSend : null);
  }

  private getSelectedTeams(): TeamProperty[] {
    return this.selectedTeams.filter((t) => t.selected);
  }
}
