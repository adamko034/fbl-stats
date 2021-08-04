import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { map } from 'rxjs/operators';
import { BundesligaTableConfig } from 'src/app/shared/components/bundesliga-table/models/bundesliga-table-config.model';
import { BundesligaTableFilterType } from 'src/app/shared/components/bundesliga-table/models/bundesliga-table-filter-type.enum';
import { BundesligaTableFilters } from 'src/app/shared/components/bundesliga-table/models/bundesliga-table-filters.model';
import { BundesligaTableTeam } from 'src/app/shared/components/bundesliga-table/models/bundesliga-table-team.model';
import { HistoryBundesligaTeam } from 'src/app/store/history/models/history-bundesliga-team.model';

@UntilDestroy()
@Component({
  selector: 'app-history-bundesliga',
  templateUrl: './history-bundesliga.component.html',
  styleUrls: ['./history-bundesliga.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HistoryBundesligaComponent implements OnInit {
  private _config: BundesligaTableConfig = {
    showIncludedGames: false,
    showTeamForm: false
  };
  private filters: BundesligaTableFilters = { type: BundesligaTableFilterType.OVERALL };

  private _historyTeams: HistoryBundesligaTeam[];
  private _tableTeams: BundesligaTableTeam[];

  public get config(): BundesligaTableConfig {
    return this._config;
  }

  public get teams(): BundesligaTableTeam[] {
    return this._tableTeams;
  }

  constructor(private route: ActivatedRoute) {}

  public ngOnInit(): void {
    this.route.data
      .pipe(
        map((data) => data.teams),
        untilDestroyed(this)
      )
      .subscribe((historyTeams: HistoryBundesligaTeam[]) => {
        this._historyTeams = historyTeams;
        this.filterTeamsAndConvert();
      });
  }

  public onFiltersChange(newFilters: BundesligaTableFilters): void {
    this.filters = newFilters;
    this.filterTeamsAndConvert();
  }

  private filterTeamsAndConvert(): void {
    if (!this._historyTeams) {
      this._tableTeams = [];
      return;
    }

    this._tableTeams = this._historyTeams.map((historyTeam: HistoryBundesligaTeam) => {
      const { teamShort, teamLong, rank } = historyTeam;
      const {
        wins,
        draws,
        losses,
        goalsScored,
        goalsConceded,
        gamesPlayed,
        points,
        cleanSheets,
        gspg,
        gcpg,
        goalsDiff,
        failedToScore
      } = historyTeam[this.filters.type];

      return {
        teamShort,
        teamLong,
        wins,
        draws,
        losses,
        goalsConceded,
        goalsScored,
        gamesPlayed,
        points,
        rank,
        cleanSheets,
        gspg,
        gcpg,
        goalsDiff,
        failedToScore
      };
    });
  }
}
