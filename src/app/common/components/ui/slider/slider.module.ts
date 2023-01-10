import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatSliderModule } from '@angular/material/slider';
import { FormFieldModule } from '../form-field/form-field.module';
import { SliderComponent } from './slider.component';

@NgModule({
  declarations: [SliderComponent],
  imports: [CommonModule, MatSliderModule, FormsModule, FormFieldModule],
  exports: [SliderComponent]
})
export class SliderModule {}
