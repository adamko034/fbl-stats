import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { PieChartConfig } from './models/pie-chart-config.model';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PieChartComponent implements OnInit {
  @Input() config: PieChartConfig;

  constructor() {}

  ngOnInit(): void {}
}
