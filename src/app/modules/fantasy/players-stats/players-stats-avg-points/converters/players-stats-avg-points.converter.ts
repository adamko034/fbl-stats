import { Injectable } from '@angular/core';
import { PlayerGamesService } from 'src/app/modules/core/players/services/player-games.service';
import { ArrayStream } from 'src/app/services/array-stream.service';
import { MathHelper } from 'src/app/shared/helpers/math.helper';
import { Game } from 'src/app/store/players/models/game.model';
import { Player } from 'src/app/store/players/models/player.model';
import { Team } from 'src/app/store/teams/models/team.model';
import { PlayerStatsAvgPoints } from '../models/player-stats-avg-points.model';

@Injectable()
export class PlayersStatsAvgPointsConverter {
  constructor(private playersGamesService: PlayerGamesService) {}

  public fromPlayers(players: Player[], teams: Team[], lastNGames: number): PlayerStatsAvgPoints[] {
    return players.map((player) => {
      const team = teams.filter((t) => t.shortName === player.teamShort)[0];
      return this.fromPlayer(player, team, lastNGames);
    });
  }

  private fromPlayer(player: Player, team: Team, lastNGames: number): PlayerStatsAvgPoints {
    const { id, name, lastName, price, popularity, teamShort, position, totalPoints } = player;
    let gamesPlayed = player.games.filter((g) => g.hasPlayed);
    gamesPlayed = this.filterGames(gamesPlayed, lastNGames);
    const totalGamesPoints = this.getSumPoints(gamesPlayed);

    let homeGames = this.playersGamesService.getHomePlayedGames(player, team);
    homeGames = this.filterGames(homeGames, lastNGames);
    const homeGamesPoints = this.getSumPoints(homeGames);

    let awayGames = this.playersGamesService.getAwayPlayedGames(player, team);
    awayGames = this.filterGames(awayGames, lastNGames);
    const awayGamesPoints = this.getSumPoints(awayGames);

    let vsBottomGames = this.playersGamesService.getVsBottomPlayedGames(player, team);
    vsBottomGames = this.filterGames(vsBottomGames, lastNGames);
    const vsBottomPoints = this.getSumPoints(vsBottomGames);

    let vsTopGames = this.playersGamesService.getVsTopPlayedGames(player, team);
    vsTopGames = this.filterGames(vsTopGames, lastNGames);
    const vsTopPoints = this.getSumPoints(vsTopGames);

    return {
      id,
      name,
      lastName,
      price,
      popularity,
      teamShort,
      position,
      totalPoints,
      avgTotal: this.getAvg(totalGamesPoints, gamesPlayed.length),
      totalGamesPoints,
      avgAway: this.getAvg(awayGamesPoints, awayGames.length),
      avgHome: this.getAvg(homeGamesPoints, homeGames.length),
      avgVsBottom: this.getAvg(vsBottomPoints, vsBottomGames.length),
      avgVsTop: this.getAvg(vsTopPoints, vsTopGames.length),
      awayGamesPlayed: awayGames.length,
      awayGamesPoints,
      gamesPlayedTotal: gamesPlayed.length,
      homeGamesPlayed: homeGames.length,
      homeGamesPoints,
      vsBottomGamesPlayed: vsBottomGames.length,
      vsBottomPoints,
      vsTopGamesPlayed: vsTopGames.length,
      vsTopPoints
    };
  }

  private filterGames(games: Game[], lastNGames: number): Game[] {
    if (lastNGames === 0) {
      return games;
    }

    return this.playersGamesService.getLastNGames(games, lastNGames);
  }

  private getAvg(points: number, gamesCount: number): number {
    return MathHelper.divideAndRound(points, gamesCount);
  }

  private getSumPoints(games: Game[]): number {
    return new ArrayStream<Game>(games).sumBy((g) => g.points);
  }
}
