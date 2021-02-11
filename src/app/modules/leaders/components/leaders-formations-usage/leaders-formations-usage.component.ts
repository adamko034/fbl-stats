import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ArrayStream } from 'src/app/services/array-stream.service';
import { TextValue } from 'src/app/shared/components/text-value-card/models/text-value.model';
import { LeadersFormation } from 'src/app/store/leaders/models/leaders-formation.model';
import { LeadersFormationConverter } from '../../converters/leaders-formation.converter';

@Component({
  selector: 'app-leaders-formations-usage',
  templateUrl: './leaders-formations-usage.component.html',
  styleUrls: ['./leaders-formations-usage.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LeadersFormationsUsageComponent {
  @Input() formations: LeadersFormation[];

  public get items(): TextValue[] {
    if (!!this.formations) {
      return new ArrayStream<LeadersFormation>(this.formations)
        .orderBy('usage', 'dsc')
        .take(3)
        .convert(new LeadersFormationConverter())
        .collect();
    }
  }

  constructor() {}
}
