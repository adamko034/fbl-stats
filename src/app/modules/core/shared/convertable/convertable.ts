export abstract class Convertable<T, R> {
  public abstract convert(items: T[]): R[];
}
