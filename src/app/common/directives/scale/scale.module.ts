import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ScaleDirective } from './scale.directive';

@NgModule({
  declarations: [ScaleDirective],
  imports: [CommonModule],
  exports: [ScaleDirective]
})
export class ScaleModule {}
