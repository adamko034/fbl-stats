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

  public concat(array: T[], pos?: number): ArrayStream<T> {
    if (pos == undefined) {
      this.array = this.array.concat(array);
      return this;
    }

    this.array.splice(pos, 0, array);
    return this;
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

  public orderByThenBy(
    firstBy: { field: string; order: 'asc' | 'dsc' },
    thenBy: { field: string; order: 'asc' | 'dsc' }
  ): ArrayStream<T> {
    this.array = this.array.sort((a, b) => {
      const aFirstNum = +this.getField(a, firstBy.field);
      const bFirstNum = +this.getField(b, firstBy.field);
      const aSecondNum = +this.getField(a, thenBy.field);
      const bSecondNum = +this.getField(b, thenBy.field);

      if (aFirstNum - bFirstNum === 0) {
        return thenBy.order === 'asc' ? aSecondNum - bSecondNum : bSecondNum - aSecondNum;
      }

      return firstBy.order === 'asc' ? aFirstNum - bFirstNum : bFirstNum - aFirstNum;
    });

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

  public distinctFlat<R>(field: string): string[] {
    const distinct: string[] = [];
    this.array.forEach((item: T) => {
      item[field].forEach((field: string) => {
        if (!distinct.includes(field.toLowerCase())) {
          distinct.push(field.toLowerCase());
        }
      });
    });

    return distinct;
  }

  public moveItem(fromIndex: number, toIndex: number): ArrayStream<T> {
    var element = this.array[fromIndex];
    this.array.splice(fromIndex, 1);
    this.array.splice(toIndex, 0, element);

    return this;
  }

  public reorder(orderFieldName: string = 'order'): ArrayStream<T> {
    for (let i = 0; i < this.array.length; i++) {
      this.array[i][orderFieldName] = i + 1;
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

  private getField(obj: any, path: string): any {
    var split = path.split('.');

    if (split.length == 1) {
      return obj[path];
    }

    const shifted = split.shift();
    return this.getField(obj[shifted], split.join('.'));
  }
}
