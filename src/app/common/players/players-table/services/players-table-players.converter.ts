import { Injectable } from '@angular/core';
import { ArrayStream } from 'src/app/services/array-stream.service';
import { MathHelper } from 'src/app/shared/helpers/math.helper';
import { PlayersTablePlayerInnerNextGame } from '../models/internal/players-table-player-inner-next-game.model';
import { PlayersTablePlayerInner } from '../models/internal/players-table-player-inner.model';
import { PlayersTablePlayerNextGame } from '../models/state/players-table-player-next-game.model';
import { PlayersTablePlayer } from '../models/state/players-table-player.model';

@Injectable()
export class PlayersTablePlayersConverter {
  public toInner(players: PlayersTablePlayer[]): PlayersTablePlayerInner[] {
    return players.map((p) => this.convertSingle(p));
  }

  private convertSingle(player: PlayersTablePlayer): PlayersTablePlayerInner {
    const {
      id,
      name,
      lastName,
      teamShort,
      popularity,
      position,
      price,
      available,
      suspensionRisk,
      returning,
      gamesStarted,
      top100Popularity,
      top500Popularity,
      totalPoints,
      avgPoints,
      games70Min,
      nextGame
    } = player;
    const formPoints = new ArrayStream(player.games).sumBy((g) => g.points);
    const formGamesStarted = new ArrayStream(player.games).filterQuick((g) => g.started).size();
    const formGamesMoreThan70Min = new ArrayStream(player.games).filterQuick((g) => g.playedMoreThan70Min).size();

    const inner = {
      id,
      name,
      lastName,
      teamShort,
      totalPoints,
      popularity,
      position,
      price,
      available,
      returning,
      totalAvgPoints: avgPoints,
      suspensionRisk,
      totalGamesStarted: gamesStarted,
      totalGames70Min: games70Min,
      top100Popularity,
      top500Popularity,
      formPoints,
      nextGame: nextGame ? this.convertNextGame(nextGame) : null,
      formAvgPoints: MathHelper.divideAndRound(formPoints, player.games.length),
      formGamesStarted: MathHelper.divideAndRoundPercentage(formGamesStarted, player.games.length),
      formGames70Min: MathHelper.divideAndRoundPercentage(formGamesMoreThan70Min, player.games.length)
    };

    player.games.forEach((game) => (inner[game.matchday] = game.points));

    return inner;
  }

  private convertNextGame(nextGame: PlayersTablePlayerNextGame): PlayersTablePlayerInnerNextGame {
    return { isHome: nextGame.isHome, prediction: nextGame.prediction, teamShort: nextGame.teamShort };
  }
}
