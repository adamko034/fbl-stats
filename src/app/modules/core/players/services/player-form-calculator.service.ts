import { Injectable } from '@angular/core';
import { Game } from 'src/app/models/game.model';
import { ArrayStream } from 'src/app/services/array-stream.service';

@Injectable({ providedIn: 'root' })
export class PlayerFormCalculatorService {
  public calculate(games: Game[]): number {
    let form = 0;
    games.forEach((g) => (form += g.points));

    return form;
  }

  public calculateLastN(games: Game[], n: number) {
    const lastNGames = new ArrayStream<Game>(games).orderBy('matchday', 'dsc').take(n).collect();
    return this.calculate(lastNGames);
  }
}
