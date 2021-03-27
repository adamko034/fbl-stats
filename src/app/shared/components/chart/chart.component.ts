import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { ChartConfig } from './models/chart-config.model';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChartComponent implements OnInit {
  @Input() config: ChartConfig;

  public get showLabels() {
    return this.config.showLabels || true;
  }

  public get autoScale() {
    return this.config.autoScale || false;
  }

  public get yAxisTicks() {
    return this.config.yAxisTicks || null;
  }

  public get roundDomains() {
    return this.config.roundDomains || false;
  }

  constructor() {}

  ngOnInit(): void {}
}