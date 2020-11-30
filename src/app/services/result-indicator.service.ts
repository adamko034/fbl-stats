import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ResultIndicatorService {
  private readonly charToNumber = {
    1: 'D',
    3: 'W',
    0: 'L'
  };

  public toCharsArray(formInPoints: string): string[] {
    return formInPoints.split('').map((x) => this.charToNumber[x]);
  }
}
