import { Injectable } from '@angular/core';
import { ArrayStream } from 'src/app/services/array-stream.service';
import { Game } from 'src/app/store/players/models/game.model';
import { Player } from 'src/app/store/players/models/player.model';
import { Team } from 'src/app/store/teams/models/team.model';
import { TeamService } from '../../teams/services/team.service';

@Injectable({ providedIn: 'root' })
export class PlayerGamesService {
  constructor(private teamService: TeamService) {}

  public getLastNGames<T>(games: T[], n: number): T[] {
    return new ArrayStream<T>(games).orderBy('matchday', 'dsc').take(n).collect();
  }

  public getGamesCountWithPointsGreaterThan(games: Game[], minPoints: number): Game[] {
    return new ArrayStream<Game>(games).filterQuick((g) => g.points >= minPoints).collect();
  }

  public getHomePlayedGames(player: Player, team: Team): Game[] {
    const playedGames = player.games.filter((g) => g.hasPlayed);
    const homeMatchdays = this.teamService.getTeamHomeMatchdays(team);
    return playedGames.filter((g) => homeMatchdays.includes(g.matchday));
  }

  public getAwayPlayedGames(player: Player, team: Team) {
    const playedGames = player.games.filter((g) => g.hasPlayed);
    const homeMatchdays = this.teamService.getTeamAwayMatchdays(team);
    return playedGames.filter((g) => homeMatchdays.includes(g.matchday));
  }

  public getVsBottomPlayedGames(player: Player, team: Team, bottomN: number = 6): Game[] {
    const vsBottomMatchdays = this.teamService.getPlayedMatchdaysVsBottom(team, bottomN);
    return this.getPlayedGames(player).filter((g) => vsBottomMatchdays.includes(g.matchday));
  }

  public getVsTopPlayedGames(player: Player, team: Team, topN: number = 6): Game[] {
    const vsTopMatchdays = this.teamService.getPlayedMatchdyasVsTop(team, topN);
    return this.getPlayedGames(player).filter((g) => vsTopMatchdays.includes(g.matchday));
  }

  private getPlayedGames(player: Player): Game[] {
    return player.games.filter((g) => g.hasPlayed);
  }
}
