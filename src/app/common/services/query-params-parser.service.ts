import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class QueryParamsParser {
  public getNumberOrDefault(value: any, defaultValue: number): number {
    if (value && !isNaN(value)) {
      return +value;
    }

    return defaultValue;
  }

  public getStringOrDefault(value: any, defaultValue: string): string {
    return value ?? defaultValue;
  }

  public getEnumNumberOrDefault<T>(value: any, defaultValue: T): T {
    if (!value) {
      return defaultValue;
    }

    return JSON.parse(value) as T;
  }

  public getEnumStringOrDefault<T>(value: any, defaultValue: T): T {
    return value ?? defaultValue;
  }

  public getBooleanOrDefault(value: any, defaultValue: boolean): boolean {
    if (!value) {
      return defaultValue;
    }

    return JSON.parse(value);
  }

  public getArrayOrDefault(value: any, defaultValue: string[]): string[] {
    if (!value) {
      return defaultValue;
    }

    if (value && typeof value === 'string') {
      const array = [];
      array.push(value);

      return array;
    }

    return value;
  }
}
