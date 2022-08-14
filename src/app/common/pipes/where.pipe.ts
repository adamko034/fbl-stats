import { Pipe, PipeTransform } from '@angular/core';

type Operation = '>' | '>=' | '<' | '<=';

@Pipe({
  name: 'where'
})
export class WherePipe implements PipeTransform {
  public transform(array: any[], field: string, operation: Operation, value: any): any[] {
    if (!array || array.length <= 1 || !field || !operation) {
      return array;
    }

    return array.filter((x) => this.predicate(x, field, operation, value));
  }

  private predicate(item: any, field: string, operation: Operation, value: any): boolean {
    if (operation === '>') {
      return item[field] > value;
    }

    if (operation === '>=') {
      return item[field] >= value;
    }

    if (operation === '<') {
      return item[field] < value;
    }

    if (operation === '<=') {
      return item[field] <= value;
    }
  }
}
