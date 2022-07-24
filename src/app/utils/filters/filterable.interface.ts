export interface IFilterable<T> {
  filter(items: T[]): T[];
}
