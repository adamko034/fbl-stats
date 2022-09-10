import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ScaleModule } from 'src/app/common/directives/scale/scale.module';
import { HasStartedIconComponent } from './has-started-icon.component';

@NgModule({
  declarations: [HasStartedIconComponent],
  imports: [CommonModule, ScaleModule, MatTooltipModule],
  exports: [HasStartedIconComponent]
})
export class HasStartedIconModule {}
