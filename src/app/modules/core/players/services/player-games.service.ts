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

  public getHomePlayedGames(player: Player, onlyValid: boolean): Game[] {
    return this.getPlayedGames(player, onlyValid).filter((g) => g.isHome);
  }

  public getAwayPlayedGames(player: Player, onlyValid: boolean) {
    return this.getPlayedGames(player, onlyValid).filter((g) => !g.isHome);
  }

  public getVsBottomPlayedGames(player: Player, onlyValid: boolean, bottomN: number = 6): Game[] {
    return this.getPlayedGames(player, onlyValid).filter((g) => g.opponentRank > 18 - bottomN);
  }

  public getVsTopPlayedGames(player: Player, onlyValid: boolean, topN: number = 6): Game[] {
    return this.getPlayedGames(player, onlyValid).filter((g) => g.opponentRank <= topN);
  }

  public getPlayedGames(player: Player, onlyValid: boolean): Game[] {
    return this.validGames(player.games, onlyValid).filter((g) => g.hasPlayed);
  }

  public getStartedGames(player: Player, venue: 'all' | 'h' | 'a', onlyValid: boolean): Game[] {
    const gamesStarted = player.games.filter((g) => g.started);
    return this.getGamesByVenue(gamesStarted, venue, onlyValid);
  }

  public get70PlusGames(player: Player, venue: 'all' | 'h' | 'a', onlyValid: boolean): Game[] {
    const games = player.games.filter((g) => g.hasPlayedMoreThan70Min);
    return this.getGamesByVenue(games, venue, onlyValid);
  }

  public getPlayedGamesByVenue(player: Player, venue: 'all' | 'h' | 'a', onlyValid: boolean): Game[] {
    return this.getGamesByVenue(this.getPlayedGames(player, onlyValid), venue, onlyValid);
  }

  public getGamesByVenue(games: Game[], venue: 'all' | 'h' | 'a', onlyValid: boolean): Game[] {
    const gamesValid = this.validGames(games, onlyValid);
    if (venue === 'all') {
      return gamesValid;
    }

    return gamesValid.filter((g) => (venue === 'h' ? g.isHome : !g.isHome));
  }

  public getGamesPlayedWonByVenue(player: Player, venue: 'all' | 'h' | 'a', onlyValid: boolean) {
    return this.gamesWon(this.getPlayedGamesByVenue(player, venue, onlyValid));
  }

  public getGamesWonByVenue(player: Player, venue: 'all' | 'h' | 'a', onlyValid: boolean) {
    return this.gamesWon(this.getGamesByVenue(player.games, venue, onlyValid));
  }

  private gamesWon(games: Game[]): Game[] {
    return games.filter((g) => g.result > 0);
  }

  private validGames(games: Game[], onlyValid: boolean): Game[] {
    return onlyValid ? games.filter((g) => g.gameValid) : games;
  }
}
