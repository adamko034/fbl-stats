import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ArrayEmptyPipe } from './array-empty.pipe';
import { ArrayIncludesPipe } from './array-includes.pipe';
import { ArrayNotEmptyPipe } from './array-not-empty.pipe';
import { AveragePipe } from './average.pipe';
import { DaysBetweenNowPipe } from './days-between-now.pipe';
import { EpochDatePipe } from './epoch-date.pipe';
import { FieldPipe } from './field.pipe';
import { LengthPipe } from './length.pipe';
import { NullableTextPipe } from './nullable-text.pipe';
import { NumeralsPipe } from './numerals.pipe';
import { ReverseBooleanPipe } from './reverse-boolean.pipe';
import { SumByPipe } from './sum-by.pipe';
import { TakePipe } from './take.pipe';
import { TimeInOrAgoPipe } from './time-in-or-ago.pipe';
import { WherePipe } from './where.pipe';
import { YesNoPipe } from './yes-no.pipe';

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
    DaysBetweenNowPipe,
    EpochDatePipe,
    NullableTextPipe,
    SumByPipe,
    TakePipe,
    WherePipe,
    YesNoPipe,
    TimeInOrAgoPipe
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
    DaysBetweenNowPipe,
    EpochDatePipe,
    NullableTextPipe,
    SumByPipe,
    TakePipe,
    WherePipe,
    YesNoPipe,
    TimeInOrAgoPipe
  ]
})
export class PipesModule {}
