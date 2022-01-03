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

  public static normalizeTo(x: number, min: number, max: number, to: number): number {
    return Math.round(MathHelper.normalize(x, min, max) * to);
  }

  public static normalize(x: number, min: number, max: number): number {
    if (max - min === 0) {
      return 0;
    }

    return (x - min) / (max - min);
  }
}
