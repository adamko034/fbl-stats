import { Injectable } from '@angular/core';
import { ArrayStream } from 'src/app/services/array-stream.service';
import { Game } from 'src/app/store/players/models/game.model';

@Injectable({ providedIn: 'root' })
export class PlayersDataService {
  constructor() {}

  public getBestGame(games: Game[]): Game {
    return new ArrayStream<Game>(games).orderBy('points', 'dsc').takeFirst();
  }

  public getWorstGame(games: Game[]): Game {
    return new ArrayStream<Game>(games).orderBy('points', 'asc').takeFirst();
  }

  public getPointsColor(points: number): string {
    if (!points) {
      return 'black';
    }

    if (points <= 0) {
      return 'darkred';
    }

    if (points > 0 && points <= 5) {
      return 'red';
    }

    if (points > 5 && points < 10) {
      return 'orange';
    }

    if (points >= 10 && points < 16) {
      return 'blue';
    }

    return 'green';
  }
}
