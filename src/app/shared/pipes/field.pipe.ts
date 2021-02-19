import { Inject, Injectable, Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'field' })
export class FieldPipe implements PipeTransform {
  public transform(value: any, field: string): any {
    return value[field];
  }
}
