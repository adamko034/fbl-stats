import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ArrayIncludesPipe } from './array-includes.pipe';
import { ReverseBooleanPipe } from './reverse-boolean.pipe';

@NgModule({
  declarations: [ArrayIncludesPipe, ReverseBooleanPipe],
  imports: [CommonModule],
  exports: [ArrayIncludesPipe, ReverseBooleanPipe]
})
export class PipesModule {}
