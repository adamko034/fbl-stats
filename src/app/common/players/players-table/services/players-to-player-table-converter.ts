import { Injectable } from '@angular/core';
import { Game } from 'src/app/store/players/models/game.model';
import { Player } from 'src/app/store/players/models/player.model';
import { Team } from 'src/app/store/teams/models/team.model';
import { PlayerPredictionCombinedDeterminer } from '../../services/player-prediction-combined-determiner.service';
import { PlayersTablePlayerGame } from '../models/state/players-table-player-game.model';
import { PlayersTablePlayer } from '../models/state/players-table-player.model';
import { PlayersTableTeam } from '../models/state/players-table-team.model';

@Injectable()
export class PlayersToPlayersTableConverter {
  constructor(private _predictionCombinedDeterminer: PlayerPredictionCombinedDeterminer) {}

  public toPlayersTable(players: Player[]): PlayersTablePlayer[] {
    return players.map((p) => this.playerConvertSingle(p));
  }

  public toPlayersTableTeam(teams: Team[]): PlayersTableTeam[] {
    return teams.map((t) => ({ longName: t.name, shortName: t.shortName }));
  }

  private playerConvertSingle(player: Player): PlayersTablePlayer {
    let nextGame = null;
    if (player.nextGame) {
      nextGame = {
        prediction: this._predictionCombinedDeterminer.determine(player.nextGame),
        isHome: player.nextGame.isHome,
        teamShort: player.nextGame.opponent
      };
    }

    return {
      available: player.attendance === 1,
      id: player.id,
      lastName: player.lastName,
      name: player.name,
      popularity: player.popularity,
      position: player.position as any,
      price: player.price,
      priceOriginal: player.priceOriginal,
      teamShort: player.teamShort,
      nextGame,
      games: this.playerConvertGames(player.games),
      top100Popularity: player.top100Popularity,
      top500Popularity: player.top500Popularity,
      totalPoints: player.totalPoints,
      avgPoints: player.avgPoints,
      returning: player.isReturning,
      suspensionRisk: player.isSuspensionRisk,
      gamesStarted: player.gamesStartedPercentage,
      games70Min: player.games70MinPercentage
    };
  }

  private playerConvertGames(games: Game[]): PlayersTablePlayerGame[] {
    return games.map((g) => {
      return {
        matchday: g.matchday,
        points: g.points ?? 0,
        started: g.hasPlayed,
        playedMoreThan70Min: g.hasPlayedMoreThan70Min
      };
    });
  }
}
