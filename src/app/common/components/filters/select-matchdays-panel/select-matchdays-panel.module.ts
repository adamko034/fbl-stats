import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatRadioModule } from '@angular/material/radio';
import { SpanAsLinkModule } from 'src/app/common/directives/span-as-link/span-as-link.module';
import { DropdownModule } from '../../ui/dropdown/dropdown.module';
import { FormFieldModule } from '../../ui/form-field/form-field.module';
import { SelectLastMatchdaysModule } from '../select-last-matchdays/select-last-matchdays.module';
import { SelectMatchdaysBetweenModule } from '../select-matchdays-between/select-matchdays-between.module';
import { SelectMatchdaysPanelComponent } from './select-matchdays-panel.component';

@NgModule({
  declarations: [SelectMatchdaysPanelComponent],
  imports: [
    CommonModule,
    MatExpansionModule,
    MatDividerModule,
    MatDividerModule,
    MatRadioModule,
    DropdownModule,
    FormsModule,
    SelectLastMatchdaysModule,
    SelectMatchdaysBetweenModule,
    FormFieldModule,
    SpanAsLinkModule
  ],
  exports: [SelectMatchdaysPanelComponent]
})
export class SelectMatchdaysPanelModule {}
