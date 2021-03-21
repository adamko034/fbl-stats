import { Injectable } from '@angular/core';
import { Game } from 'src/app/models/game.model';
import { ArrayStream } from 'src/app/services/array-stream.service';

@Injectable({ providedIn: 'root' })
export class PlayerGamesService {
  public getLastNGames(games: Game[], n: number): Game[] {
    return new ArrayStream<Game>(games).orderBy('matchday', 'dsc').take(n).collect();
  }

  public getGamesCountWithPointsGreaterThan(games: Game[], minPoints: number): Game[] {
    return new ArrayStream<Game>(games).filterQuick((g) => g.points >= minPoints).collect();
  }
}
