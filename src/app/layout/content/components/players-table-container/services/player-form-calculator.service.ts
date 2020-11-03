import { Injectable } from '@angular/core';
import { Game } from 'src/app/models/game.model';

@Injectable({ providedIn: 'root' })
export class PlayerFormCalculatorService {
  public calculate(games: Game[]): number {
    let form = 0;
    games.forEach((g) => (form += g.points));

    return form;
  }
}
