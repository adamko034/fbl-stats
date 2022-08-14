import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HorizontalTopScrollbarDirective } from './horizontal-top-scrollbar.directive';

@NgModule({
  declarations: [HorizontalTopScrollbarDirective],
  imports: [CommonModule],
  exports: [HorizontalTopScrollbarDirective]
})
export class HorizontalTopScrollbarModule {}
