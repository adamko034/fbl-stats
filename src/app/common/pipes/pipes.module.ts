import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ArrayEmptyPipe } from './array-empty.pipe';
import { ArrayIncludesPipe } from './array-includes.pipe';
import { ArrayNotEmptyPipe } from './array-not-empty.pipe';
import { AveragePipe } from './average.pipe';
import { DaysBetweenNowPipe } from './days-between-now.pipe';
import { FieldPipe } from './field.pipe';
import { LengthPipe } from './length.pipe';
import { NumeralsPipe } from './numerals.pipe';
import { ReverseBooleanPipe } from './reverse-boolean.pipe';

@NgModule({
  declarations: [
    ArrayIncludesPipe,
    ReverseBooleanPipe,
    NumeralsPipe,
    ArrayEmptyPipe,
    ArrayNotEmptyPipe,
    FieldPipe,
    LengthPipe,
    AveragePipe,
    DaysBetweenNowPipe
  ],
  imports: [CommonModule],
  exports: [
    ArrayIncludesPipe,
    ReverseBooleanPipe,
    NumeralsPipe,
    ArrayEmptyPipe,
    ArrayNotEmptyPipe,
    FieldPipe,
    LengthPipe,
    AveragePipe,
    DaysBetweenNowPipe
  ]
})
export class PipesModule {}
