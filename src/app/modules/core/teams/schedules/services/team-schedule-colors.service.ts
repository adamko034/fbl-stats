import { Range } from 'src/app/shared/models/range.model';

export class TeamScheduleColorsService {
  private colors: { [color: string]: Range } = {
    'rgb(92, 177, 98)': { min: 16, max: 18 },
    lightgreen: { min: 13, max: 15 },
    gold: { min: 10, max: 12 },
    'rgb(255, 136, 8)': { min: 7, max: 9 },
    'rgb(255, 85, 32)': { min: 4, max: 6 },
    '#c72626': { min: 1, max: 3 }
  };

  public getColor(opponentRank: number): string {
    return Object.keys(this.colors).find((key) => this.isWithinRange(key, opponentRank));
  }

  public getAllColors(): { [color: string]: Range } {
    return this.colors;
  }

  private isWithinRange(color: string, value: number): boolean {
    return this.colors[color].min <= value && this.colors[color].max >= value;
  }
}
