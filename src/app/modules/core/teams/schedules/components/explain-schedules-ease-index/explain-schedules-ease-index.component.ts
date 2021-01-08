import { Component } from '@angular/core';
import { TeamSchedulesStatic } from 'src/app/modules/core/teams/schedules/static/teams-schedules-ranges.static';
import { NumeralsPipe } from 'src/app/shared/pipes/numerals.pipe';

interface DataSource {
  range: string;
  value: number;
}

@Component({
  selector: 'app-explain-schedules-ease-index',
  templateUrl: './explain-schedules-ease-index.component.html',
  styleUrls: ['./explain-schedules-ease-index.component.scss']
})
export class ExplainSchedulesEaseIndexComponent {
  public tableRankColumns = ['range', 'value'];
  public tableData: DataSource[] = TeamSchedulesStatic.indexRanges.map((i) => ({
    range: `${this.constructNumerals(i.min)} - ${this.constructNumerals(i.max)}`,
    value: i.indexValue
  }));

  constructor() {}

  private constructNumerals(value: number): string {
    return new NumeralsPipe().transform(value);
  }
}
