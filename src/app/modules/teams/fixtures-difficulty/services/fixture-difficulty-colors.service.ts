import { Injectable } from '@angular/core';
import { Range } from 'src/app/shared/models/range.model';

@Injectable()
export class FixtureDifficultyColorsService {
  private colors: { [color: string]: Range } = {
    'game-green': { min: 10, max: 11 },
    'game-green-light': { min: 8, max: 9 },
    'game-yellow': { min: 6, max: 7 },
    'game-orange': { min: 4, max: 5 },
    'game-red': { min: 2, max: 3 },
    'game-dark-red': { min: -1, max: 1 }
  };

  public getColor(indexValue: number): string {
    return Object.keys(this.colors).find(
      (key) => this.colors[key].min <= indexValue && this.colors[key].max >= indexValue
    );
  }

  public getAllColorsSorted(): string[] {
    return Object.keys(this.colors);
  }
}
