import { Injectable } from '@angular/core';
import { Range } from 'src/app/shared/models/range.model';

@Injectable()
export class FixtureDifficultyColorsService {
  private colors: { [color: string]: Range } = {
    'rgb(92, 177, 98)': { min: 10, max: 11 },
    lightgreen: { min: 8, max: 9 },
    gold: { min: 6, max: 7 },
    'rgb(255, 136, 8)': { min: 4, max: 5 },
    'rgb(255, 85, 32)': { min: 2, max: 3 },
    '#c72626': { min: -1, max: 1 }
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
