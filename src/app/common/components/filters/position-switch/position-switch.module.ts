import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormFieldModule } from '../../ui/form-field/form-field.module';
import { SwitcherModule } from '../../ui/switcher/switcher.module';
import { PositionSwitchComponent } from './position-switch.component';

@NgModule({
  declarations: [PositionSwitchComponent],
  imports: [CommonModule, SwitcherModule, FormFieldModule],
  exports: [PositionSwitchComponent]
})
export class PositionSwitchModule {}
