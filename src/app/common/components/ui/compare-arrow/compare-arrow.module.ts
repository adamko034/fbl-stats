import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ScaleModule } from 'src/app/common/directives/scale/scale.module';
import { CompareArrowComponent } from './compare-arrow.component';

@NgModule({
  declarations: [CompareArrowComponent],
  imports: [CommonModule, MatIconModule, ScaleModule],
  exports: [CompareArrowComponent]
})
export class CompareArrowModule {}
