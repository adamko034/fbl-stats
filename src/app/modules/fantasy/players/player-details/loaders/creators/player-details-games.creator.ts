import { Injectable } from '@angular/core';
import { ArrayStream } from 'src/app/services/array-stream.service';
import { Game } from 'src/app/store/players/models/game.model';
import { Player } from 'src/app/store/players/models/player.model';
import { Fixture } from 'src/app/store/teams/models/fixture.model';
import { Team } from 'src/app/store/teams/models/team.model';
import { PlayerDetailsGame } from '../../models/player-details-game.model';

@Injectable()
export class PlayerDetailsGamesCreator {
  public from(player: Player, teams: { [teamShort: string]: Team }, lastMatchday: number): PlayerDetailsGame[] {
    const playerGamesOrdered = new ArrayStream<Game>(player.games).orderBy('matchday', 'dsc').collect();

    const games: PlayerDetailsGame[] = [];
    for (const game of playerGamesOrdered) {
      games.push(this.createPreviousGame(game, teams));
    }

    const nextFixtures = teams[player.teamShort].games.filter((g) => g.matchday > lastMatchday);
    for (const game of nextFixtures) {
      games.push(this.createNextGame(player.teamShort, game));
    }

    return games;
  }

  private createPreviousGame(game: Game, teams: { [teamShort: string]: Team }): PlayerDetailsGame {
    const {
      matchday,
      isHome,
      opponentRank,
      hasPlayed,
      points,
      hasPlayedMoreThan70Min,
      started,
      goals,
      assists,
      teamShort
    } = game;
    const team = teams[game.teamShort];
    const teamFixture = team.games.find((g) => g.matchday === game.matchday);

    const { date, opponent, wasPlayed, result, resultText, wasPostponed, isMatchdayFirstGame } = teamFixture;

    return {
      assists,
      goals,
      hasPlayed,
      hasPlayedMoreThan70Min,
      isHome,
      matchday,
      opponentRank,
      started,
      points,
      date,
      opponent,
      wasPlayed,
      wasPostponed,
      result,
      resultText,
      teamShort,
      isFirstGame: isMatchdayFirstGame
    };
  }

  private createNextGame(teamShort: string, fixture: Fixture): PlayerDetailsGame {
    const {
      matchday,
      date,
      opponent,
      wasPlayed,
      result,
      resultText,
      wasPostponed,
      isMatchdayFirstGame,
      isHome,
      opponentRank
    } = fixture;

    return {
      matchday,
      teamShort,
      date,
      isHome,
      opponent,
      opponentRank,
      wasPlayed,
      wasPostponed,
      resultText,
      result,
      hasPlayed: false,
      hasPlayedMoreThan70Min: false,
      isFirstGame: isMatchdayFirstGame,
      started: false,
      goals: 0,
      assists: 0
    };
  }
}
