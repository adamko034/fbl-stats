import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ScaleModule } from 'src/app/common/directives/scale/scale.module';
import { HasCameFromBenchIconComponent } from './has-came-from-bench-icon.component';

@NgModule({
  declarations: [HasCameFromBenchIconComponent],
  imports: [CommonModule, ScaleModule, MatTooltipModule],
  exports: [HasCameFromBenchIconComponent]
})
export class HasCameFromBenchIconModule {}
