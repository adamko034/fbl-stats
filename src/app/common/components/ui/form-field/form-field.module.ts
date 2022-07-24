import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormFieldComponent } from './form-field.component';

@NgModule({
  declarations: [FormFieldComponent],
  imports: [CommonModule, FlexLayoutModule],
  exports: [FormFieldComponent]
})
export class FormFieldModule {}
