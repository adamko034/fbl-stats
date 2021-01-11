import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ResultIndicatorService {
  private readonly charToNumber = {
    1: 'D',
    3: 'W',
    0: 'L'
  };

  private readonly resultToChar = {
    '-1': 'l',
    '0': 'd',
    '1': 'w'
  };

  public toCharsArray(formInPoints: string): string[] {
    return formInPoints.split('').map((x) => this.charToNumber[x]);
  }

  public fromResultArray(results: number[]): string {
    return results.map((result) => this.resultToChar[result.toString()]).join('');
  }
}
