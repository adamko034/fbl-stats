import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SwitcherModule } from '../../ui/switcher/switcher.module';
import { VenueSwitchComponent } from './components/venue-switch.component';

@NgModule({
  declarations: [VenueSwitchComponent],
  imports: [CommonModule, SwitcherModule],
  exports: [VenueSwitchComponent]
})
export class VenueSwitchModule {}
