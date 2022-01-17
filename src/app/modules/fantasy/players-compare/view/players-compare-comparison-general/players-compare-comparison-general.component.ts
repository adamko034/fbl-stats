import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { PlayerGamesService } from 'src/app/modules/core/players/services/player-games.service';
import { ArrayStream } from 'src/app/services/array-stream.service';
import { TeamGameAgainst } from 'src/app/shared/components/team-game-against/team-game-against.model';
import { MathHelper } from 'src/app/shared/helpers/math.helper';
import { Game } from 'src/app/store/players/models/game.model';
import { PlayerScoringChance } from 'src/app/store/players/models/player-scoring-chance.model';
import { Player } from 'src/app/store/players/models/player.model';
import { Team } from 'src/app/store/teams/models/team.model';

@Component({
  selector: 'app-players-compare-comparison-general',
  templateUrl: './players-compare-comparison-general.component.html',
  styleUrls: ['./players-compare-comparison-general.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlayersCompareComparisonGeneralComponent implements OnInit {
  private _nextFourMatchdays: number[] = [];

  @Input() players: Player[];
  @Input() teams: { [teamShort: string]: Team };
  @Input() lastMatchday: number;

  public get nextFourMatchdays(): number[] {
    return this._nextFourMatchdays;
  }

  constructor(private playerGamesService: PlayerGamesService) {}

  public ngOnInit(): void {
    this._nextFourMatchdays = [
      this.lastMatchday + 1,
      this.lastMatchday + 2,
      this.lastMatchday + 3,
      this.lastMatchday + 4
    ].filter((md) => md <= 34);
  }

  public getPointsTotal(player: Player, mds: number): string {
    return this.getPoints(player.games, mds);
  }

  public getAvgPointsTotal(player: Player, mds: number): string {
    const points = this.getPointsTotal(player, mds);

    if (isNaN(+points)) {
      return 'x';
    }

    return MathHelper.divideAndRound(+points, mds).toString();
  }

  public getPointsByVenue(player: Player, venue: 'h' | 'a' | 'all', mds: number): string {
    const games = this.getGamesPlayed(player, venue, mds);

    return this.getPoints(games, mds);
  }

  public getAvgPointsByVenue(player: Player, venue: 'h' | 'a' | 'all', mds: number): string {
    const points = this.getPointsByVenue(player, venue, mds);
    const gamesByVenue = this.getGamesPlayed(player, venue, mds);

    return MathHelper.divideAndRound(+points, gamesByVenue.length).toString();
  }

  public getGamesPlayed(player: Player, venue: 'h' | 'a' | 'all', mds: number): Game[] {
    const games = this.playerGamesService.getPlayedGamesByVenue(player, venue);
    return mds === 0 ? games : new ArrayStream<Game>(games).orderBy('matchday', 'dsc').take(mds).collect();
  }

  public createGameAgainst(teamShort: string, matchday: number): TeamGameAgainst {
    const game = this.teams[teamShort].games.filter((g) => g.matchday === matchday)[0];
    return {
      md: matchday,
      isHome: game.isHome,
      isFirstGame: game.isMatchdayFirstGame,
      rank: game.opponentRank,
      shortName: game.opponent
    };
  }

  public getEfficiency(player: Player, venue: 'h' | 'a' | 'all', points: string): string {
    if (venue === 'all') {
      return this.getEfficiencyText(player.scoringChances.overall, points);
    }

    if (venue === 'h') {
      return this.getEfficiencyText(player.scoringChances.home, points);
    }

    return this.getEfficiencyText(player.scoringChances.away, points);
  }

  public getEfficiencyText(scoringChance: PlayerScoringChance, points: string) {
    return `${scoringChance[`moreThan${points}ptsPercentage`]}% (${scoringChance[`moreThan${points}ptsGamesCount`]})`;
  }

  public getGamesPlayedPercentage(player: Player, venue: 'all' | 'h' | 'a') {
    const gamesPlayed = this.getGamesPlayed(player, venue, 0);
    const allGames = this.playerGamesService.getGamesByVenue(player.games, venue);

    return `${MathHelper.divideAndRoundPercentage(gamesPlayed.length, allGames.length)}% (${gamesPlayed.length}/${
      allGames.length
    })`;
  }

  public getGamesStarted(player: Player, venue: 'all' | 'h' | 'a'): string {
    const allGames = this.playerGamesService.getGamesByVenue(player.games, venue);
    const gamesStarted = this.playerGamesService.getStartedGames(player, venue);

    return `${MathHelper.divideAndRoundPercentage(gamesStarted.length, allGames.length)}% (${gamesStarted.length}/${
      allGames.length
    })`;
  }

  public getGames70(player: Player, venue: 'all' | 'h' | 'a'): string {
    const allGames = this.playerGamesService.getGamesByVenue(player.games, venue);
    const games70 = this.playerGamesService.get70PlusGames(player, venue);

    return `${MathHelper.divideAndRoundPercentage(games70.length, allGames.length)}% (${games70.length}/${
      allGames.length
    })`;
  }

  public getGamesWon(player: Player, venue: 'all' | 'h' | 'a', ifPlayed: boolean): string {
    const allGamesByVenue = this.playerGamesService.getGamesByVenue(player.games, venue);
    const gamesWon = this.playerGamesService.getGamesWonByVenue(player, venue);

    const allGamesPlayedByVenue = this.playerGamesService.getPlayedGamesByVenue(player, venue);
    const gamesPlayedWon = this.playerGamesService.getGamesPlayedWonByVenue(player, venue);

    if (ifPlayed) {
      return `${MathHelper.divideAndRoundPercentage(gamesPlayedWon.length, allGamesPlayedByVenue.length)}% (${
        gamesPlayedWon.length
      }/${allGamesPlayedByVenue.length})`;
    }

    return `${MathHelper.divideAndRoundPercentage(gamesWon.length, allGamesByVenue.length)}% (${gamesWon.length}/${
      allGamesByVenue.length
    })`;
  }

  private getTeam(player: Player): Team {
    return this.teams[player.teamShort];
  }

  private getPoints(games: Game[], mds: number): string {
    const stream = new ArrayStream<Game>(games).orderBy('matchday', 'dsc');
    const gamesIncluded = mds === 0 ? stream.collect() : stream.take(mds).collect();

    if (!gamesIncluded || (gamesIncluded.length === 1 && gamesIncluded[0].points === null)) {
      return 'x';
    }

    return new ArrayStream<Game>(gamesIncluded).sumBy((g) => g.points).toString();
  }
}
