import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconScaleDirective } from './mat-icon-scale.directive';

@NgModule({
  declarations: [MatIconScaleDirective],
  imports: [CommonModule],
  exports: [MatIconScaleDirective]
})
export class MatIconScaleModule {}
