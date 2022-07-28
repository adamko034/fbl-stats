import { ChangeDetectorRef, Component, Input, OnChanges } from '@angular/core';
import { ArrayStream } from 'src/app/services/array-stream.service';
import { MathHelper } from 'src/app/shared/helpers/math.helper';
import { MatrixTableCell } from './models/internal/matrix-table-cell.model';
import { MatrixTableColor } from './models/matrix-table-color.enum';
import { MatrixTableColumn } from './models/matrix-table-column.model';
import { MatrixTableConfig } from './models/matrix-table-config.model';
import { MatrixTableRow } from './models/matrix-table-row.model';

@Component({
  selector: 'app-matrix-table',
  templateUrl: './matrix-table.component.html',
  styleUrls: ['./matrix-table.component.scss']
})
export class MatrixTableComponent implements OnChanges {
  @Input() rows: MatrixTableRow[];
  @Input() config: MatrixTableConfig;

  private _internal: { [key: string]: MatrixTableCell } = {};
  public get internal(): { [key: string]: MatrixTableCell } {
    return this._internal;
  }

  constructor(private changeDetection: ChangeDetectorRef) {}

  ngOnChanges(): void {
    const max = this.config?.max ?? 0;
    this._internal = {};

    const rowsOrdered = new ArrayStream(this.rows).orderBy('order', 'asc').collect();
    rowsOrdered.forEach((row) => {
      const columnsOrdered = new ArrayStream(row.columns).orderBy('order', 'asc').collect();

      columnsOrdered.forEach((col) => {
        if (col.id === row.id) {
          this._internal[row.id + col.id] = { cssClass: '', value: '--' };
        } else {
          const key = col.id + row.id;
          const reflectionKey = row.id + col.id;

          const allKeys = Object.keys(this._internal);

          if (!allKeys.includes(key)) {
            this._internal[key] = { value: col.text, cssClass: this.getColorClass(col) };
          }

          if (!allKeys.includes(reflectionKey)) {
            this._internal[reflectionKey] = {
              value: this.config.showReflection ? col.text : '',
              cssClass: this.config.showReflection ? this.getColorClass(col) : ''
            };
          }
        }
      });
    });

    this.changeDetection.detectChanges();
  }

  private getColorClass(column: MatrixTableColumn): string {
    let colorIndex = column.color;
    if (this.config.autoSetColor) {
      colorIndex = this.calculateColorIndex(column.text);
    }

    switch (colorIndex) {
      case MatrixTableColor.GREEN_DARK:
        return 'column-greendark';
      case MatrixTableColor.GREEN_LIGHT:
        return 'column-greenlight';
      case MatrixTableColor.ORANGE:
        return 'column-orange';
      case MatrixTableColor.RED:
        return 'column-red';
      case MatrixTableColor.YELLOW:
        return 'column-yellow';
      default:
        return '';
    }
  }

  private calculateColorIndex(value: string): MatrixTableColor {
    if (value !== '' && !isNaN(+value) && this.config.max > 0) {
      return MathHelper.normalizeTo(+value, 0, this.config.max, 5);
    }

    return MatrixTableColor.WHITE;
  }
}
