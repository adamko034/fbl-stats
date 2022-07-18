import { IFilterable } from 'src/app/utils/filters/filterable.interface';

export abstract class Filterable<T> implements IFilterable<T> {
  public abstract filter(items: T[]): T[];
}
