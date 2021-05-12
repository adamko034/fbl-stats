import { TeamScheduleGame } from 'src/app/modules/teams/bundesliga/teams-schedules/models/team-schedule-game.model';
import { TeamSchedule } from 'src/app/modules/teams/bundesliga/teams-schedules/models/team-schedule.model';
import { TeamScheduleColorsService } from 'src/app/modules/teams/bundesliga/teams-schedules/services/team-schedule-colors.service';
import { Fixture } from 'src/app/store/teams/models/fixture.model';
import { Team } from 'src/app/store/teams/models/team.model';

export abstract class TeamsSchedulesDeterminer {
  private teamScheduleColors: TeamScheduleColorsService;

  constructor(private includeVenueCalculation) {
    this.teamScheduleColors = new TeamScheduleColorsService();
  }

  public get(teams: Team[], lastMatchday: number): TeamSchedule[] {
    this.doForeachTeam(teams);
    return teams.map((team: Team) => ({
      shortName: team.shortName,
      longName: team.name,
      rank: team.rank,
      next2GamesIndex: this.calculateIndex(team, lastMatchday, 2),
      next3GamesIndex: this.calculateIndex(team, lastMatchday, 3),
      next5GamesIndex: this.calculateIndex(team, lastMatchday, 5),
      games: this.convertToTeamsSchedulesGames(team, lastMatchday),
      last2Games: team.last2Games,
      last3Games: team.last3Games,
      last4Games: team.last4Games,
      last5Games: team.last5Games,
      index: this.calculateTeamGameIndex(team)
    }));
  }

  protected abstract calculateSingleGameIndex(game: Fixture): number;
  protected abstract calculateTeamGameIndex(team: Team): number;
  protected abstract doForeachTeam(teams: Team[]): void;
  protected abstract getDisplayedInfoForGame(game: Fixture);

  private calculateIndex(team: Team, lastMatchday: number, nextGamesCount: number): number {
    const gamesIncluded = team.games.filter(
      (g) => g.matchday > lastMatchday && g.matchday <= lastMatchday + nextGamesCount
    );
    let index = 0;

    gamesIncluded.forEach((game) => (index += this.calculateSingleGame(game)));

    return index;
  }

  private calculateSingleGame(game: Fixture): number {
    let index = this.calculateSingleGameIndex(game);

    if (this.includeVenueCalculation) {
      game.isHome ? (index += 1) : (index -= 1);
    }

    return index;
  }

  private convertToTeamsSchedulesGames(team: Team, lastMatchday: number): { [key: string]: TeamScheduleGame } {
    const game: { [key: string]: TeamScheduleGame } = {};
    team.games
      .filter((g) => g.matchday > lastMatchday && g.matchday <= lastMatchday + 5)
      .map((g) => {
        const gameIndex = this.calculateSingleGame(g);
        return {
          color: this.teamScheduleColors.getColor(gameIndex),
          matchday: g.matchday,
          opponent: g.opponent,
          opponentRank: g.opponentRank,
          gameIndex,
          isHome: g.isHome,
          displayedInfo: this.getDisplayedInfoForGame(g)
        };
      })
      .forEach((g: TeamScheduleGame) => (game[g.matchday] = g));

    return game;
  }
}
