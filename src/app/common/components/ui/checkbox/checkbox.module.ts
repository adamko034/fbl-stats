import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormFieldModule } from '../form-field/form-field.module';
import { CheckboxComponent } from './checkbox.component';

@NgModule({
  declarations: [CheckboxComponent],
  imports: [CommonModule, FormFieldModule, MatCheckboxModule],
  exports: [CheckboxComponent]
})
export class CheckboxModule {}
