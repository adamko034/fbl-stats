import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SpanAsLinkDirective } from './span-as-link.directive';

@NgModule({
  declarations: [SpanAsLinkDirective],
  imports: [CommonModule],
  exports: [SpanAsLinkDirective]
})
export class SpanAsLinkModule {}
