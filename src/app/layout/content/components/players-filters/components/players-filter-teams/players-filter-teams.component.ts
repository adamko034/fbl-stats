import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { cloneDeep } from 'lodash';
import { Subject } from 'rxjs';
import { filter, switchMap, takeUntil, tap } from 'rxjs/operators';
import { SelectTeamsDialogComponent } from 'src/app/layout/content/components/players-filters/components/players-filter-teams/components/select-teams-dialog/select-teams-dialog.component';
import { SelectTeamsFromTableComponent } from 'src/app/layout/content/components/players-filters/components/players-filter-teams/components/select-teams-from-table/select-teams-from-table.component';
import { SmartTeamsSelectionDialogResult } from 'src/app/layout/content/components/players-filters/components/players-filter-teams/components/smart-teams-selection-dialog/models/smart-teams-selection-dialog-result';
import { SmartTeamsSelectionDialogComponent } from 'src/app/layout/content/components/players-filters/components/players-filter-teams/components/smart-teams-selection-dialog/smart-teams-selection-dialog.component';
import { SelectableTeam } from 'src/app/layout/content/components/players-filters/components/players-filter-teams/model/selectable-team.model';
import { SelectableSmartTeam } from 'src/app/layout/content/components/players-filters/components/players-filter-teams/model/smart-selects/selectable-smart-team.model';
import { SmartSelectionTeamsService } from 'src/app/layout/content/components/players-filters/components/players-filter-teams/services/smart-selection-teams.service';
import { TeamProperty } from 'src/app/models/properties.model';
import { FiltersStoreService } from 'src/app/services/filters-store.service';
import { LoadingService } from 'src/app/services/loading.service';
import { PropertiesService } from 'src/app/services/properties.service';
import { Logger } from 'src/app/utils/logger';

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
    private matDialog: MatDialog,
    private loadingService: LoadingService,
    private smartSelectionTeamsService: SmartSelectionTeamsService
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
    this.matDialog
      .open(SelectTeamsDialogComponent, {
        data: { teams: cloneDeep(this.selectedTeams) }
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

  public openSmartSelectionsDialog(): void {
    this.matDialog
      .open(SmartTeamsSelectionDialogComponent, { minWidth: '365px' })
      .afterClosed()
      .pipe(
        filter((result: SmartTeamsSelectionDialogResult) => !!result),
        tap((result: SmartTeamsSelectionDialogResult) =>
          Logger.logDev('players filter teams, got new smart selection: ' + result.selection)
        ),
        tap(() => this.loadingService.startLoading('smart-selection')),
        switchMap((result: SmartTeamsSelectionDialogResult) =>
          this.smartSelectionTeamsService.selectTeamsBy(result.selection, result.count)
        ),
        takeUntil(this.destroyed$)
      )
      .subscribe((smartSelects: SelectableSmartTeam[]) => {
        if (smartSelects?.length > 0) {
          Logger.logDev('players filter teams, got new smart selection teams');
          this.swapSelectedTeamsWithSmartSelects(smartSelects);
          this.sendSelectedTeams();
          this.loadingService.endLoading('smart-selection');
        }
      });
  }

  public openSelectTeamsFromTableDialog(): void {
    this.matDialog
      .open(SelectTeamsFromTableComponent, {
        data: { selectedTeams: cloneDeep(this.getSelectedTeams().map((t) => t.short)) }
      })
      .afterClosed()
      .pipe(
        filter((teams: string[]) => !!teams && teams.length > 0),
        takeUntil(this.destroyed$)
      )
      .subscribe((teams: string[]) => {
        Logger.logDev('players filter teams, got new teams from table');
        this.selectedTeams.forEach((selectedTeam: SelectableTeam) => {
          selectedTeam.additionalInfo = null;
          selectedTeam.selected = teams.findIndex((t) => t === selectedTeam.short) >= 0;
        });
      });
  }

  public clearTeamsSelection(): void {
    this.selectedTeams.forEach((s) => (s.selected = false));
    this.sendSelectedTeams();
  }

  public onChipRemove(teamShortName: string) {
    this.selectedTeams.find((t) => t.short === teamShortName).selected = false;
    this.sendSelectedTeams();
  }

  public trackChipsBy(index, chip) {
    return chip.short;
  }

  private swapSelectedTeamsWithSmartSelects(smartSelects: SelectableSmartTeam[]): void {
    this.selectedTeams.forEach((team) => {
      const selected = smartSelects.find((smart) => smart.shortName === team.short);
      team.selected = !!selected;
      team.additionalInfo = !!selected ? selected.smartChoiceInfo : '';
      team.order = !!selected ? selected.order : null;
    });
  }

  private sendSelectedTeams(): void {
    const teamsToSend = this.getSelectedTeams();
    this.fitlersStoreService.updateTeams(teamsToSend.length > 0 ? teamsToSend : null);
  }

  private getSelectedTeams(): TeamProperty[] {
    return this.selectedTeams.filter((t) => t.selected);
  }
}
