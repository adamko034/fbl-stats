import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ArrayStream } from 'src/app/services/array-stream.service';
import { TextValue } from 'src/app/shared/components/text-value-card/models/text-value.model';
import { LeadersFormation } from 'src/app/store/leaders/models/leaders-formation.model';
import { LeadersTextValueDialgComponent } from '../../../../components/leaders-text-value-dialg/leaders-text-value-dialg.component';
import { LeadersUsageTextValueConverter } from '../../../../converters/leaders-usage-text-value.converter';

@Component({
  selector: 'app-leaders-formations-usage',
  templateUrl: './leaders-formations-usage.component.html',
  styleUrls: ['./leaders-formations-usage.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LeadersFormationsUsageComponent {
  @Input() formations: LeadersFormation[];

  private converter = new LeadersUsageTextValueConverter({
    textField: 'formation',
    valueType: 'usage',
    style: { 'letter-spacing': '2px' }
  });

  public get items(): TextValue[] {
    if (!!this.formations) {
      return new ArrayStream<LeadersFormation>(this.formations)
        .orderBy('usagePercentage', 'dsc')
        .take(3)
        .convert(this.converter)
        .collect();
    }
  }

  constructor(private matDialog: MatDialog) {}

  public onShowMoreClick(): void {
    const values = new ArrayStream<LeadersFormation>(this.formations)
      .orderBy('usagePercentage', 'dsc')
      .convert(this.converter)
      .collect();
    const data = { values, title: 'Formations' };

    this.matDialog.open(LeadersTextValueDialgComponent, { data });
  }
}
