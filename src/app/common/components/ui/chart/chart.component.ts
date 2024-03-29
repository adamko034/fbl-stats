import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ChartDialogComponent } from './chart-dialog/chart-dialog.component';
import { ChartConfig } from './models/chart-config.model';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {
  @Input() config: ChartConfig;

  public get showLabels() {
    return this.config.showLabels || false;
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

  public get showLegend() {
    return this.config.showLegend || false;
  }

  public get dimension() {
    return !!this.config.width && !!this.config.height ? [this.config.width, this.config.height] : undefined;
  }

  public get showDialog() {
    return this.config.showDialog === undefined ? true : this.config.showDialog;
  }

  public get colors(): any {
    return this.config.colors === undefined ? 'cool' : { domain: this.config.colors };
  }

  public get animations() {
    return !!this.config.animations ? this.config.animations : false;
  }

  constructor(private matDialog: MatDialog) {}

  public ngOnInit(): void {}

  public onShowMoreClick(): void {
    this.matDialog.open(ChartDialogComponent, { data: { chartConfig: this.config }, minWidth: 320 });
  }
}
