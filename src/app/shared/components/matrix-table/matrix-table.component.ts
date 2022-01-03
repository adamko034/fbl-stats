import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { MatrixTableColor } from './models/matrix-table-color.enum';
import { MatrixTableColumn } from './models/matrix-table-column.model';
import { MatrixTableRow } from './models/matrix-table-row.model';

@Component({
  selector: 'app-matrix-table',
  templateUrl: './matrix-table.component.html',
  styleUrls: ['./matrix-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MatrixTableComponent implements OnInit {
  @Input() rows: MatrixTableRow[];

  constructor() {}

  ngOnInit(): void {
    this.rows.forEach((r) => {
      console.log(r.text + ' ' + r.id);
      console.log(r.columns);
    });
  }

  public getColorClass(col: MatrixTableColumn): string {
    switch (col.color) {
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
}
