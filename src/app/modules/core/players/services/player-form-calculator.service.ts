import { Injectable } from '@angular/core';
import { ArrayStream } from 'src/app/services/array-stream.service';
import { Game } from 'src/app/store/players/models/game.model';

@Injectable({ providedIn: 'root' })
export class PlayerFormCalculatorService {
  public calculate(games: Game[]): number {
    if (!games || games.length === 0) {
      return 0;
    }

    let form = 0;
    games.forEach((g) => (form += g.points));

    return form;
  }

  public calculateLastN(games: Game[], n: number) {
    const lastNGames = new ArrayStream<Game>(games).orderBy('matchday', 'dsc').take(n).collect();
    return this.calculate(lastNGames);
  }

  public getLastMD(games: Game[]): number {
    if (!games || games.length === 0) {
      return 0;
    }

    return new ArrayStream<Game>(games).orderBy('matchday', 'dsc').takeFirst().points;
  }
}
