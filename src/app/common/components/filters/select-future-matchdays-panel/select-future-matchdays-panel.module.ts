import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SpanAsLinkModule } from 'src/app/common/directives/span-as-link/span-as-link.module';
import { DropdownModule } from '../../ui/dropdown/dropdown.module';
import { FormFieldModule } from '../../ui/form-field/form-field.module';
import { SelectFutureMatchdaysModule } from '../select-future-matchdays/select-future-matchdays.module';
import { SelectMatchdaysBetweenModule } from '../select-matchdays-between/select-matchdays-between.module';
import { SelectFutureMatchdaysPanelComponent } from './select-future-matchdays-panel.component';

@NgModule({
  declarations: [SelectFutureMatchdaysPanelComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    FormFieldModule,
    DropdownModule,
    SpanAsLinkModule,
    SelectFutureMatchdaysModule,
    SelectMatchdaysBetweenModule
  ],
  exports: [SelectFutureMatchdaysPanelComponent]
})
export class SelectFutureMatchdaysPanelModule {}
