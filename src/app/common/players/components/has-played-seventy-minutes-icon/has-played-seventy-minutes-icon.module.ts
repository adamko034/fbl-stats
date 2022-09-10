import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ScaleModule } from 'src/app/common/directives/scale/scale.module';
import { HasPlayedSeventyMinutesIconComponent } from './has-played-seventy-minutes-icon.component';

@NgModule({
  declarations: [HasPlayedSeventyMinutesIconComponent],
  imports: [CommonModule, ScaleModule, MatTooltipModule],
  exports: [HasPlayedSeventyMinutesIconComponent]
})
export class HasPlayedSeventyMinutesIconModule {}
