import { Injectable } from '@angular/core';
import { PlayersTablePlayerGame } from 'src/app/common/players/players-table/models/state/players-table-player-game.model';
import { PlayersTablePlayer } from 'src/app/common/players/players-table/models/state/players-table-player.model';
import { PlayersTableTeam } from 'src/app/common/players/players-table/models/state/players-table-team.model';
import { HistoryPlayer } from 'src/app/store/history/models/history-player.model';
import { HistoryTeam } from 'src/app/store/history/models/history-team.model';

@Injectable()
export class HistoryConverter {
  public toPlayersTableTeams(teams: HistoryTeam[]): PlayersTableTeam[] {
    return teams.map((team) => ({
      longName: team.name,
      shortName: team.shortName
    }));
  }

  public toPlayersTablePlayers(players: HistoryPlayer[]): PlayersTablePlayer[] {
    return players.map((player) => {
      const {
        avgPoints,
        games,
        games70Min,
        gamesStarted,
        name,
        lastName,
        popularity,
        position,
        price,
        teamShort,
        top100Popularity,
        top500Popularity,
        totalPoints
      } = player;

      const playerTableGames: PlayersTablePlayerGame[] = games.map((game) => ({
        matchday: game.matchday,
        playedMoreThan70Min: game.playedMoreThan70Min,
        points: game.points,
        started: game.started
      }));

      return {
        avgPoints,
        games70Min,
        gamesStarted,
        name,
        lastName,
        popularity,
        position,
        price,
        priceOriginal: 0,
        teamShort,
        top100Popularity,
        top500Popularity,
        totalPoints,
        games: playerTableGames
      };
    });
  }
}
