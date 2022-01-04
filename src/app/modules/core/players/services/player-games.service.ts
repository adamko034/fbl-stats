import { Injectable } from '@angular/core';
import { ArrayStream } from 'src/app/services/array-stream.service';
import { Game } from 'src/app/store/players/models/game.model';
import { Player } from 'src/app/store/players/models/player.model';
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

  public getHomePlayedGames(player: Player): Game[] {
    return this.getPlayedGames(player).filter((g) => g.isHome);
  }

  public getAwayPlayedGames(player: Player) {
    return this.getPlayedGames(player).filter((g) => !g.isHome);
  }

  public getVsBottomPlayedGames(player: Player, bottomN: number = 6): Game[] {
    return this.getPlayedGames(player).filter((g) => g.opponentRank > 18 - bottomN);
  }

  public getVsTopPlayedGames(player: Player, topN: number = 6): Game[] {
    return this.getPlayedGames(player).filter((g) => g.opponentRank <= topN);
  }

  private getPlayedGames(player: Player): Game[] {
    return player.games.filter((g) => g.hasPlayed);
  }
}
