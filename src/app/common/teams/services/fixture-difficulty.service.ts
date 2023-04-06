import { Injectable } from '@angular/core';
import { Range } from 'src/app/shared/models/range.model';

@Injectable()
export class FixtureDifficultyService {
  private colors: { [color: string]: Range } = {
    'game-green': { min: 10, max: 11 },
    'game-green-light': { min: 8, max: 9 },
    'game-yellow': { min: 6, max: 7 },
    'game-orange': { min: 4, max: 5 },
    'game-red': { min: 2, max: 3 },
    'game-dark-red': { min: -1, max: 1 }
  };

  public cssClassByRank(opponentRank: number): string {
    const index = this.difficultyIndexByRank(opponentRank);
    return this.cssClassByIndex(index);
  }

  public difficultyIndexByRank(rank: number): number {
    if (rank >= 16) {
      return 10;
    }

    if (rank < 16 && rank >= 13) {
      return 8;
    }

    if (rank < 13 && rank >= 10) {
      return 6;
    }

    if (rank < 10 && rank >= 7) {
      return 4;
    }

    if (rank < 7 && rank >= 4) {
      return 2;
    }

    return 0;
  }

  public cssClassByIndex(indexValue: number): string {
    return Object.keys(this.colors).find(
      (key) => this.colors[key].min <= indexValue && this.colors[key].max >= indexValue
    );
  }
}
