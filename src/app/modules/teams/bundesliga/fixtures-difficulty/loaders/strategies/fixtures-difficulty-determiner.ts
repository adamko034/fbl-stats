import { Fixture } from 'src/app/store/teams/models/fixture.model';
import { Team } from 'src/app/store/teams/models/team.model';
import { FixtureDifficultyGame } from '../../models/fixture-difficulty-game.model';
import { FixtureDifficulty } from '../../models/fixture-difficulty.model';
import { FixtureDifficultyColorsService } from '../../services/fixture-difficulty-colors.service';

export abstract class FixturesDifficultyDeterminer {
  constructor(
    private includeVenueCalculation: boolean,
    private fixtureDifficultyColorsService: FixtureDifficultyColorsService
  ) {}

  public get(teams: Team[], lastMatchday: number): FixtureDifficulty[] {
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

  private convertToTeamsSchedulesGames(team: Team, lastMatchday: number): { [key: string]: FixtureDifficultyGame } {
    const game: { [key: string]: FixtureDifficultyGame } = {};
    team.games
      .filter((g) => g.matchday > lastMatchday && g.matchday <= lastMatchday + 5)
      .map((g) => {
        const gameIndex = this.calculateSingleGame(g);
        return {
          color: this.fixtureDifficultyColorsService.getColor(gameIndex),
          matchday: g.matchday,
          opponent: g.opponent,
          opponentRank: g.opponentRank,
          gameIndex,
          isHome: g.isHome,
          displayedInfo: this.getDisplayedInfoForGame(g)
        };
      })
      .forEach((g: FixtureDifficultyGame) => (game[g.matchday] = g));

    return game;
  }
}
