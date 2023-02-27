import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IfNotZeroDirective } from './if-not-zero.directive';

@NgModule({
  declarations: [IfNotZeroDirective],
  imports: [CommonModule],
  exports: [IfNotZeroDirective]
})
export class IfNotZeroModule {}
