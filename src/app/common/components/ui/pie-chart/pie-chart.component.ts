import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { PieChartConfig } from './pie-chart-config.model';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PieChartComponent {
  @Input() config: PieChartConfig;
}
