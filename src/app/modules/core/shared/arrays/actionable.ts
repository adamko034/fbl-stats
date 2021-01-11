export abstract class Actionable<T> {
  public abstract exec(items: T[]): T[];
}
