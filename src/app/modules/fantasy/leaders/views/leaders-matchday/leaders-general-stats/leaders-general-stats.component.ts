import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { TextValue } from 'src/app/shared/components/text-value-card/models/text-value.model';
import { LeadersMatchday } from 'src/app/store/leaders/models/leaders-matchday.model';

@Component({
  selector: 'app-leaders-general-stats',
  templateUrl: './leaders-general-stats.component.html',
  styleUrls: ['./leaders-general-stats.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LeadersGeneralStatsComponent {
  @Input() matchday: LeadersMatchday;

  public get teamPoints(): TextValue[] {
    return [
      { text: 'AVG', value: this.matchday.points.avg.toString() + 'p' },
      { text: 'MIN', value: this.matchday.points.min.toString() + 'p' },
      { text: 'MAX', value: this.matchday.points.max.toString() + 'p' }
    ];
  }

  public get teamValue(): TextValue[] {
    return [
      { text: 'AVG', value: this.matchday.teamValue.avg.toString() + 'M' },
      { text: 'MIN', value: this.matchday.teamValue.min.toString() + 'M' },
      { text: 'MAX', value: this.matchday.teamValue.max.toString() + 'M' }
    ];
  }

  constructor() {}
}
