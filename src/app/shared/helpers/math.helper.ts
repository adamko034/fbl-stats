export class MathHelper {
  public static divideAndRound(a: number, b: number): number {
    if (a === null || b === null || b === 0) {
      return 0;
    }

    return Math.round((a / b) * 10) / 10;
  }

  public static divideAndRoundPercentage(a: number, b: number): number {
    if (a === null || b === null || b === 0) {
      return 0;
    }

    return Math.round((a / b) * 100);
  }
}
