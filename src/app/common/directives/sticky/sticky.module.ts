import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { StickyWrapperDirective } from './sticky-wrapper.directive';
import { StickyDirective } from './sticky.directive';

@NgModule({
  declarations: [StickyDirective, StickyWrapperDirective],
  imports: [CommonModule],
  exports: [StickyDirective, StickyWrapperDirective]
})
export class StickyModule {}
