import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { LegendComponent } from './legend.component';

@NgModule({
  declarations: [LegendComponent],
  imports: [CommonModule, MatIconModule],
  exports: [LegendComponent]
})
export class LegendModule {}
