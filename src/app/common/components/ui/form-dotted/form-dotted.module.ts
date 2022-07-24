import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormDottedComponent } from './form-dotted.component';

@NgModule({
  declarations: [FormDottedComponent],
  imports: [CommonModule, FlexLayoutModule],
  exports: [FormDottedComponent]
})
export class FormDottedModule {}
