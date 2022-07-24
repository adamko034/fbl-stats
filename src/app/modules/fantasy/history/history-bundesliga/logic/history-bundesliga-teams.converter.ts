import { Injectable } from '@angular/core';
import { BundesligaTableTeam } from 'src/app/common/teams/bundesliga-table/models/state/bundesliga-table-team';
import { BundesligaTableTeamGame } from 'src/app/common/teams/bundesliga-table/models/state/bundesliga-table-team-game.model';
import { HistoryTeamGame } from 'src/app/store/history/models/history-team-game.model';
import { HistoryTeam } from 'src/app/store/history/models/history-team.model';

@Injectable()
export class HistoryBundesligaTeamsConverter {
  public convertToBundesligaTeams(historyTeams: HistoryTeam[]): BundesligaTableTeam[] {
    return historyTeams.map((historyTeam) => this.convertSingle(historyTeam));
  }

  private convertSingle(historyTeam: HistoryTeam): BundesligaTableTeam {
    const { name, shortName, rank, games } = historyTeam;
    const teamGames = games.map((game) => this.convertSingleGame(game));

    return { name, shortName, rank, games: teamGames };
  }

  private convertSingleGame(game: HistoryTeamGame): BundesligaTableTeamGame {
    const { points, goalsConceded, goalsScored, isHome, matchday } = game;
    return { points, goalsConceded, goalsScored, isHome, matchday };
  }
}
