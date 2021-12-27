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
    const homeMatchdays = this.teamService.getPlayedMatchdaysByVenue(team, 'h');
    return playedGames.filter((g) => homeMatchdays.includes(g.matchday));
  }

  public getAwayPlayedGames(player: Player, team: Team) {
    const playedGames = player.games.filter((g) => g.hasPlayed);
    const homeMatchdays = this.teamService.getPlayedMatchdaysByVenue(team, 'a');
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

  public getPlayedGames(player: Player): Game[] {
    return player.games.filter((g) => g.hasPlayed);
  }

  public getStartedGames(player: Player, team: Team, venue: 'all' | 'h' | 'a'): Game[] {
    const gamesStarted = player.games.filter((g) => g.started);
    const teamGames = this.teamService.getPlayedMatchdaysByVenue(team, venue);

    return gamesStarted.filter((g) => teamGames.includes(g.matchday));
  }

  public get70PlusGames(player: Player, team: Team, venue: 'all' | 'h' | 'a'): Game[] {
    const games = player.games.filter((g) => g.hasPlayedMoreThan70Min);
    const teamGames = this.teamService.getPlayedMatchdaysByVenue(team, venue);

    return games.filter((g) => teamGames.includes(g.matchday));
  }
}
