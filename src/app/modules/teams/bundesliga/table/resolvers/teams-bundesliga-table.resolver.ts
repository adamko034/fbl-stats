import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { TeamsFormSetAction } from 'src/app/modules/core/teams/actions/teams-form-set.action';
import { TeamsGamesFitlerAndCalculate as TeamsGamesFilterAndCalculate } from 'src/app/modules/core/teams/actions/teams-games-filter-and-calculate.action';
import { TeamsGamesFilters } from 'src/app/modules/core/teams/models/teams-games-filters';
import { ArrayStream } from 'src/app/services/array-stream.service';
import { ResultIndicatorService } from 'src/app/services/result-indicator.service';
import { Team } from 'src/app/store/teams/models/team.model';
import { TeamsStore } from 'src/app/store/teams/teams.store';
import { Logger } from 'src/app/utils/logger';
import { TeamsBundesligaTableTeamsConverter } from '../converters/teams-bundesliga-table-teams.converter';
import { TeamsBundesligaTableTeam } from '../models/teams-bundesliga-table-team.model';
import { TeamsBundesligaTableQueryParamsService } from './teams-bundesliga-table-query-params.service';
import { TeamsBundesligaTableRankFilteredSetAction } from './teams-bundesliga-table-rank-filtered-set.action';

@Injectable()
export class TeamsBundesligaTableResolver implements Resolve<Observable<TeamsBundesligaTableTeam[]>> {
  constructor(
    private queryParmasService: TeamsBundesligaTableQueryParamsService,
    private teamsStore: TeamsStore,
    private resultIndicatorService: ResultIndicatorService,
    private converter: TeamsBundesligaTableTeamsConverter
  ) {}

  public resolve(route: ActivatedRouteSnapshot): Observable<TeamsBundesligaTableTeam[]> {
    Logger.logDev('teams bundesliga table resolver: resolving...');
    const filters = this.queryParmasService.getFilters(route.queryParams);
    const config: TeamsGamesFilters = { games: filters.games, venue: filters.venue };
    const formCount = filters.games === 0 ? 6 : filters.games;

    Logger.logDev(
      `teams bundesliga table resolver: with filters ${JSON.stringify(filters)} and formCount ${formCount}`
    );

    return this.teamsStore.selectAll().pipe(
      map((teams: Team[]) => this.prepareRecords(teams, config, formCount)),
      first()
    );
  }

  private prepareRecords(teams: Team[], gamesFilters: TeamsGamesFilters, formCount: number) {
    let stream = new ArrayStream<Team>(teams)
      .forEach(new TeamsGamesFilterAndCalculate(this.resultIndicatorService, gamesFilters))
      .forEach(new TeamsFormSetAction(this.resultIndicatorService, formCount))
      .convert(this.converter);

    if (gamesFilters.games > 0 || gamesFilters.venue !== 'all') {
      stream = stream.forEach(new TeamsBundesligaTableRankFilteredSetAction());
    }

    return stream.collect();
  }
}
