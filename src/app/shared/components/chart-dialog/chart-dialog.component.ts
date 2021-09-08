import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ScreenSize, ScreenSizeService } from 'src/app/services/screen-size.service';
import { ChartConfig } from '../chart/models/chart-config.model';

interface TableData {
  columns: TableColumn[];
  rows: TableRow[];
}

interface TableColumn {
  display: string;
  order: number;
}

interface TableRow {
  id: string;
  cells: TableCell[];
}

interface TableCell {
  columnOrder: number;
  value: string | number;
  displayValue: string;
  isDiffCell?: boolean;
}

@UntilDestroy()
@Component({
  selector: 'app-chart-dialog',
  templateUrl: './chart-dialog.component.html',
  styleUrls: ['./chart-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChartDialogComponent implements OnInit {
  public get chartDialogConfig(): ChartConfig {
    return {
      ...this.chart.chartConfig,
      data: this.chart.chartConfig.dialogConfig?.data,
      showDialog: false,
      showLegend: this.chart.chartConfig.dialogConfig.showLegend,
      width: 600,
      height: 250,
      title: '',
      legendPosition: 'below'
    };
  }

  public get isMobile(): boolean {
    return this.screenSize <= ScreenSize.XS;
  }

  public get showChart(): boolean {
    return this.screenSize > ScreenSize.SM;
  }

  public get showDiff(): boolean {
    return this.chartDialogConfig.dialogConfig.showDiff === undefined
      ? true
      : this.chartDialogConfig.dialogConfig.showDiff;
  }

  public data: TableData;
  private screenSize: ScreenSize;

  constructor(@Inject(MAT_DIALOG_DATA) public chart, private screenSizeService: ScreenSizeService) {}

  public ngOnInit(): void {
    this.screenSizeService
      .onResize()
      .pipe(untilDestroyed(this))
      .subscribe((size) => (this.screenSize = size));
    this.createTableData();
  }

  private createTableData(): void {
    if (this.chartDialogConfig.data.length === 1) {
      this.createSingleSeriesData();
    } else {
      this.createMultipleSeriesData();
    }
  }

  private createMultipleSeriesData() {
    // const columns = this.createInitialColumns();
    // columns.push({ display: `${this.chartDialogConfig.data[1].tableColumnName}`, order: 3 });
    // columns.push({ display: 'Diff', order: 4 });
    const columns: TableColumn[] = [];
    for (let i = 0; i < this.chartDialogConfig.dialogConfig.columns.length; i++) {
      columns.push({ display: this.chartDialogConfig.dialogConfig.columns[i], order: i });
    }
    if (this.showDiff) {
      columns.push({ display: 'Diff', order: this.chartDialogConfig.dialogConfig.columns.length });
    }

    const rows: TableRow[] = [];

    this.chartDialogConfig.data.forEach((chartData) => {
      chartData.series.forEach((point) => {
        var existingRow = rows.find((x) => x.id === point.name);

        if (!!existingRow) {
          const valueCell: TableCell = {
            columnOrder: 3,
            value: point.value,
            displayValue: `${point.value}${point.valueSuffix || ''}`
          };
          existingRow.cells.push(valueCell);

          if (this.showDiff) {
            const previousColumnValue = existingRow.cells.find((x) => x.columnOrder == 2).value;
            const diff = Math.round((+previousColumnValue - point.value) * 10) / 10;
            const diffCell: TableCell = {
              columnOrder: 4,
              isDiffCell: true,
              displayValue: diff.toString(),
              value: diff
            };
            existingRow.cells.push(diffCell);
          }
        } else {
          const row: TableRow = {
            id: point.name,
            cells: [
              { columnOrder: 1, value: point.name, displayValue: point.name },
              { columnOrder: 2, value: point.value, displayValue: `${point.value}${point.valueSuffix || ''}` }
            ]
          };
          rows.push(row);
        }
      });
    });

    this.data = { columns, rows };
  }

  private createSingleSeriesData(): void {
    const columns = this.createInitialColumns();
    columns.push({ display: `${this.chartDialogConfig.yAxisLabel} diff`, order: 3 });

    const rows: TableRow[] = [];

    this.chartDialogConfig.data[0].series.forEach((point) => {
      const row: TableRow = {
        id: point.name,
        cells: [
          { columnOrder: 1, displayValue: point.name, value: point.name },
          { columnOrder: 2, displayValue: `${point.value}${point.valueSuffix || ''}`, value: point.value },
          { columnOrder: 3, isDiffCell: true, value: point.valueDiff, displayValue: point.valueDiff.toString() }
        ]
      };

      rows.push(row);
    });

    this.data = { columns, rows };
  }

  private createInitialColumns(): TableColumn[] {
    const displayX = this.isMobile ? this.chartDialogConfig.xAxisLabelShort : this.chartDialogConfig.xAxisLabel;
    const columns: TableColumn[] = [
      { display: displayX, order: 1 },
      { display: this.chartDialogConfig.yAxisLabel, order: 2 }
    ];

    return columns;
  }
}
