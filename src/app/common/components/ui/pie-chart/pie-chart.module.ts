import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { PieChartComponent } from './pie-chart.component';

@NgModule({
  declarations: [PieChartComponent],
  imports: [CommonModule, NgxChartsModule],
  exports: [PieChartComponent]
})
export class PieChartModule {}
