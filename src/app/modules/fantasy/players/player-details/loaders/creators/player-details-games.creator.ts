import { Injectable } from '@angular/core';
import { Game } from 'src/app/store/players/models/game.model';
import { Player } from 'src/app/store/players/models/player.model';
import { Fixture } from 'src/app/store/teams/models/fixture.model';
import { Team } from 'src/app/store/teams/models/team.model';
import { PlayerDetailsGame } from '../../models/player-details-game.model';

@Injectable()
export class PlayerDetailsGamesCreator {
  public from(player: Player, team: Team): PlayerDetailsGame[] {
    const playerGames = player.games;
    const teamGames = team.games;

    const games: PlayerDetailsGame[] = [];
    teamGames.forEach((fixture) => {
      games.push(this.createGame(playerGames, fixture));
    });

    return games;
  }

  private createGame(playerGames: Game[], fixture: Fixture): PlayerDetailsGame {
    const {
      matchday,
      date,
      isHome,
      opponent,
      wasPlayed,
      result,
      resultText,
      opponentRank,
      wasPostponed,
      isMatchdayFirstGame
    } = fixture;
    const playerGame = playerGames.find((g) => g.matchday === matchday);
    const { hasPlayed, points, hasPlayedMoreThan70Min, started, goals, assists } = playerGame || {};

    return {
      matchday,
      date,
      isHome,
      opponent,
      opponentRank,
      wasPlayed,
      wasPostponed,
      resultText,
      points,
      result,
      hasPlayed,
      hasPlayedMoreThan70Min,
      isFirstGame: isMatchdayFirstGame,
      started,
      goals,
      assists
    };
  }
}
