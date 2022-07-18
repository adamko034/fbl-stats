import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { FormFieldModule } from '../../ui/form-field/form-field.module';
import { PredictionDropdownComponent } from './prediction-dropdown.component';

@NgModule({
  declarations: [PredictionDropdownComponent],
  imports: [CommonModule, FormFieldModule, MatSelectModule],
  exports: [PredictionDropdownComponent]
})
export class PredictionDropdownModule {}
