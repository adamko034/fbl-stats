import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { PlayerGamesService } from 'src/app/modules/core/players/services/player-games.service';
import { TeamService } from 'src/app/modules/core/teams/services/team.service';
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
  @Input() players: Player[];
  @Input() teams: { [teamShort: string]: Team };
  @Input() lastMatchday: number;

  constructor(private playerGamesService: PlayerGamesService, private teamService: TeamService) {}

  ngOnInit(): void {}

  public getPointsTotal(player: Player, mds: number): string {
    return this.getPoints(player.games, mds);
  }

  public getAvgPointsTotal(player: Player, mds: number): number {
    const points = this.getPointsTotal(player, mds);

    return MathHelper.divideAndRound(+points, mds);
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
    let games: Game[];
    if (venue === 'all') {
      games = this.playerGamesService.getPlayedGames(player);
    }

    if (venue === 'h') {
      games = this.playerGamesService.getHomePlayedGames(player, this.getTeam(player));
    }

    if (venue === 'a') {
      games = this.playerGamesService.getAwayPlayedGames(player, this.getTeam(player));
    }

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
    const teamGamesPlayed = this.teamService.getPlayedMatchdaysByVenue(this.getTeam(player), venue);

    return `${MathHelper.divideAndRoundPercentage(gamesPlayed.length, teamGamesPlayed.length)}% (${
      gamesPlayed.length
    }/${teamGamesPlayed.length})`;
  }

  public getGamesStarted(player: Player, venue: 'all' | 'h' | 'a'): string {
    const teamMatchdays = this.teamService.getPlayedMatchdaysByVenue(this.getTeam(player), venue);
    const gamesStarted = this.playerGamesService.getStartedGames(player, this.getTeam(player), venue);

    return `${MathHelper.divideAndRoundPercentage(gamesStarted.length, teamMatchdays.length)}% (${
      gamesStarted.length
    }/${teamMatchdays.length})`;
  }

  public getGames70(player: Player, venue: 'all' | 'h' | 'a'): string {
    const teamMatchdays = this.teamService.getPlayedMatchdaysByVenue(this.getTeam(player), venue);
    const games70 = this.playerGamesService.get70PlusGames(player, this.getTeam(player), venue);

    return `${MathHelper.divideAndRoundPercentage(games70.length, teamMatchdays.length)}% (${games70.length}/${
      teamMatchdays.length
    })`;
  }

  public getGamesWon(player: Player, venue: 'all' | 'h' | 'a', ifPlayed: boolean): string {
    const teamGames = this.teamService.getPlayedGamesByVenue(this.getTeam(player), venue);
    const teamGamesWon = this.teamService.getPlayedWonMatchdaysByVenue(this.getTeam(player), venue);
    const gamesByVenuePlayed = this.getGamesPlayed(player, venue, 0);
    const gamesWon = gamesByVenuePlayed.filter((g) => teamGamesWon.includes(g.matchday));

    if (ifPlayed) {
      return `${MathHelper.divideAndRoundPercentage(gamesWon.length, gamesByVenuePlayed.length)}% (${gamesWon.length}/${
        gamesByVenuePlayed.length
      })`;
    }

    return `${MathHelper.divideAndRoundPercentage(gamesWon.length, teamGames.length)}% (${gamesWon.length}/${
      teamGames.length
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
