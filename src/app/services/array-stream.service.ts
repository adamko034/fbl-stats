import { OrderByPipe } from 'ngx-pipes';
import { Actionable } from 'src/app/modules/core/shared/arrays/actionable';
import { Convertable } from 'src/app/modules/core/shared/convertable/convertable';
import { Filterable } from 'src/app/modules/core/shared/filterable/filterable';

export class ArrayStream<T> {
  private array: any[];

  constructor(array: T[], deepClone = true) {
    this.array = deepClone ? this.cloneDeep(array) : array;
  }

  public filter(filterable: Filterable<T>) {
    this.array = filterable.filter(this.array);
    return this;
  }

  public orderBy(field: string, order: 'asc' | 'dsc' = 'asc'): ArrayStream<T> {
    if (order === 'dsc') {
      field = `-${field}`;
    }

    this.array = new OrderByPipe().transform(this.array, field);
    return this;
  }

  public forEach(action: Actionable<T>) {
    this.array = action.exec(this.array);
    return this;
  }

  public takeWhereFieldValue(n: number, field: string): ArrayStream<T> {
    const minItem = this.array[n - 1];
    if (!!minItem) {
      this.array = this.array.filter((item) => item[field] >= minItem[field]);
    }

    this.array = this.array.slice(0, n);

    return this;
  }

  public convert<R>(converter: Convertable<T, R>): ArrayStream<R> {
    this.array = converter.convert(this.array);
    return new ArrayStream<R>(this.array, false);
  }

  public minBy(predicate: (item: T) => number): number {
    return Math.min(...this.array.map(predicate));
  }

  public maxBy(predicate: (item: T) => number): number {
    return Math.max(...this.array.map(predicate));
  }

  public collect(): T[] {
    return this.array;
  }

  private cloneDeep(array: T[]): T[] {
    const newArray = [];
    array.forEach((a) => newArray.push({ ...a }));
    return newArray;
  }
}
