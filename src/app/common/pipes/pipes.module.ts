import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ArrayIncludesPipe } from './array-includes.pipe';
import { NumeralsPipe } from './numerals.pipe';
import { ReverseBooleanPipe } from './reverse-boolean.pipe';

@NgModule({
  declarations: [ArrayIncludesPipe, ReverseBooleanPipe, NumeralsPipe],
  imports: [CommonModule],
  exports: [ArrayIncludesPipe, ReverseBooleanPipe, NumeralsPipe]
})
export class PipesModule {}
