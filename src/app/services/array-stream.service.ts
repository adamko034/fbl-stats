import { OrderByPipe } from 'ngx-pipes';
import { Actionable } from 'src/app/modules/core/shared/arrays/actionable';
import { Convertable } from 'src/app/modules/core/shared/convertable/convertable';
import { Filterable } from 'src/app/modules/core/shared/filterable/filterable';
import { DateService } from 'src/app/services/date.service';

export class ArrayStream<T> {
  private array: any[];

  constructor(array: T[], deepClone = true) {
    this.array = deepClone ? this.cloneDeep(array) : array;
  }

  public filter(filterable: Filterable<T>) {
    this.array = filterable.filter(this.array);
    return this;
  }

  public filterQuick(func: (obj: T) => boolean): ArrayStream<T> {
    this.array = this.array.filter(func);
    return this;
  }

  public forEachQuick(func: (obj: T) => void): ArrayStream<T> {
    this.array.forEach(func);
    return this;
  }

  public orderBy(field: string, order: 'asc' | 'dsc' = 'asc'): ArrayStream<T> {
    if (this.array.length > 0) {
      if (isNaN(Number(this.array[0][field])) || field.includes('.')) {
        if (order === 'dsc') {
          field = `-${field}`;
        }

        this.array = new OrderByPipe().transform<T[]>(this.array, field);
      } else {
        const predicate = order === 'dsc' ? (a, b) => +b[field] - +a[field] : (a, b) => +a[field] - +b[field];
        this.array = this.array.sort(predicate);
      }
    }

    return this;
  }

  public orderByDate(field: string, order: 'asc' | 'desc' = 'asc'): ArrayStream<T> {
    const dateService = new DateService();
    if (this.array.every((item) => dateService.isDate(item[field]))) {
      const predicate =
        order === 'desc'
          ? (a, b) => new Date(b[field]).getTime() - new Date(a[field]).getTime()
          : (a, b) => new Date(a[field]).getTime() - new Date(b[field]).getTime();
      this.array = this.array.sort(predicate);
    }

    return this;
  }

  public forEach(action: Actionable<T>) {
    this.array = action.exec(this.array);
    return this;
  }

  public takeFirst(): T {
    return this.array[0];
  }

  public take(n: number): ArrayStream<T> {
    this.array = this.array.slice(0, n);
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

  public convertQuick<R>(convertFunc: (item: T) => R): ArrayStream<R> {
    this.array = this.array.map(convertFunc);
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
