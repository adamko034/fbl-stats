import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SwitcherModule } from '../../ui/switcher/switcher.module';
import { LegSwitchComponent } from './components/leg-switch.component';

@NgModule({
  declarations: [LegSwitchComponent],
  imports: [CommonModule, SwitcherModule],
  exports: [LegSwitchComponent]
})
export class LegSwitchModule {}
