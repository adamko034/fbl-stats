import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IfScreenDirective } from './if-screen.directive';

@NgModule({
  declarations: [IfScreenDirective],
  imports: [CommonModule],
  exports: [IfScreenDirective]
})
export class IfScreenModule {}
