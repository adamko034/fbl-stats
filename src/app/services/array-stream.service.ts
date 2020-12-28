import { cloneDeep } from 'lodash';
import { OrderByPipe } from 'ngx-pipes';
import { Convertable } from 'src/app/modules/core/shared/convertable/convertable';
import { Filterable } from 'src/app/modules/core/shared/filterable/filterable';

export class ArrayStream<T> {
  private array: any[];

  constructor(array: T[], deepClone = true) {
    this.array = deepClone ? cloneDeep(array) : array;
  }

  public filter(filterable: Filterable<T>) {
    this.array = filterable.filter(this.array);
    return this;
  }

  public orderBy(field: string, order: 'asc' | 'dsc'): ArrayStream<T> {
    if (order === 'dsc') {
      field = `-${field}`;
    }

    this.array = new OrderByPipe().transform(this.array, field);
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

  public collect(): T[] {
    return this.array;
  }
}
