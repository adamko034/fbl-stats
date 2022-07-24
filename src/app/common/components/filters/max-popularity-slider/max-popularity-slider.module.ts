import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SliderModule } from '../../ui/slider/slider.module';
import { MaxPopularitySliderComponent } from './max-popularity-slider.component';

@NgModule({
  declarations: [MaxPopularitySliderComponent],
  imports: [CommonModule, SliderModule],
  exports: [MaxPopularitySliderComponent]
})
export class MaxPopularitySliderModule {}
