export abstract class Filterable<T> {
  public abstract filter(items: T[]): T[];
}
