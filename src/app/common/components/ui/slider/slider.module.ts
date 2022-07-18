import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { MatSliderModule } from '@angular/material/slider';
import { FormFieldModule } from '../form-field/form-field.module';
import { SliderComponent } from './slider.component';

@NgModule({
  declarations: [SliderComponent],
  imports: [CommonModule, FlexLayoutModule, MatSliderModule, FormsModule, FormFieldModule],
  exports: [SliderComponent]
})
export class SliderModule {}
