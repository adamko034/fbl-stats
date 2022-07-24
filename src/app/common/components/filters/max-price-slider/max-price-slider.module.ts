import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SliderModule } from '../../ui/slider/slider.module';
import { MaxPriceSliderComponent } from './max-price-slider.component';

@NgModule({
  declarations: [MaxPriceSliderComponent],
  imports: [CommonModule, SliderModule],
  exports: [MaxPriceSliderComponent]
})
export class MaxPriceSliderModule {}
