export abstract class BoldableValuesCalculator<T> {
  public abstract getItemId(item: T): string;
  public abstract calculateValue(key: string, item: T): number;
}
