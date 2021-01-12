import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, map, take, withLatestFrom } from 'rxjs/operators';
import { TeamScheduleGame } from 'src/app/modules/core/teams/schedules/models/team-schedule-game.model';
import { TeamSchedule } from 'src/app/modules/core/teams/schedules/models/team-schedule.model';
import { TeamsSchedulesState } from 'src/app/modules/core/teams/schedules/models/teams-schedules.state';
import { TeamScheduleColorsService } from 'src/app/modules/core/teams/schedules/services/team-schedule-colors.service';
import { PropertiesService } from 'src/app/services/properties.service';
import { Fixture } from 'src/app/store/teams/models/fixture.model';
import { Team } from 'src/app/store/teams/models/team.model';
import { TeamsStore } from 'src/app/store/teams/teams.store';
import { Logger } from 'src/app/utils/logger';

@Injectable({ providedIn: 'root' })
export class TeamsSchedulesLoader {
  constructor(
    private teamsFileStoreService: TeamsStore,
    private propertiesService: PropertiesService,
    private teamScheduleColors: TeamScheduleColorsService
  ) {}

  public load(): Observable<TeamsSchedulesState> {
    Logger.logDev('teams schedules loader, loading');
    return this.teamsFileStoreService.selectAll().pipe(
      withLatestFrom(this.propertiesService.selectLastMatchday()),
      filter(([teams]) => !!teams),
      map(([teams, lastMatchday]) => {
        Logger.logDev('teams schedules loader, got teams, converting to teams schedules');
        const teamsSchedules = this.convertToTeamSchedule([...teams], lastMatchday);

        let mdsHeader = [];
        if (!!teamsSchedules[0]) {
          mdsHeader = Object.keys(teamsSchedules[0].games);
        }

        return { teams: teamsSchedules, mdsHeader };
      }),
      take(1)
    );
  }

  private convertToTeamSchedule(teams: Team[], lastMatchday: number): TeamSchedule[] {
    return teams.map((team) => ({
      shortName: team.shortName,
      longName: team.name,
      rank: team.rank,
      next2GamesIndex: this.calculateIndex(team, lastMatchday, 2),
      next3GamesIndex: this.calculateIndex(team, lastMatchday, 3),
      next5GamesIndex: this.calculateIndex(team, lastMatchday, 5),
      games: this.convertToTeamScheduleGames(team, lastMatchday)
    }));
  }

  private convertToTeamScheduleGames(team: Team, lastMatchday): { [key: string]: TeamScheduleGame } {
    const game: { [key: string]: TeamScheduleGame } = {};
    team.games
      .filter((g) => g.matchday > lastMatchday && g.matchday <= lastMatchday + 5)
      .map((g) => ({
        color: this.teamScheduleColors.getColor(g.opponentRank),
        matchday: g.matchday,
        opponent: g.opponent,
        opponentRank: g.opponentRank,
        gameIndex: this.calculateGameIndex(g),
        isHome: g.isHome
      }))
      .forEach((g: TeamScheduleGame) => (game[g.matchday] = g));

    return game;
  }

  private calculateIndex(team: Team, lastMatchday: number, matchdays: number): number {
    const games = team.games.filter((g) => g.matchday > lastMatchday && g.matchday <= lastMatchday + matchdays);
    let index = 0;

    games.forEach((g) => (index += this.calculateGameIndex(g)));

    return index;
  }

  private calculateGameIndex(game: Fixture): number {
    let index = this.indexBasedOnPosition(game.opponentRank);
    game.isHome ? (index += 1) : (index -= 1);

    return index;
  }

  public indexBasedOnPosition(opponentRank: number): number {
    if (opponentRank >= 16) {
      return 10;
    }

    if (opponentRank < 16 && opponentRank >= 13) {
      return 8;
    }

    if (opponentRank < 13 && opponentRank >= 10) {
      return 6;
    }

    if (opponentRank < 10 && opponentRank >= 7) {
      return 4;
    }

    if (opponentRank < 7 && opponentRank >= 4) {
      return 2;
    }

    return 0;
  }
}
