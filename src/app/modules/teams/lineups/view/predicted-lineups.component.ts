import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UntilDestroy } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-predicted-lineups',
  templateUrl: './predicted-lineups.component.html',
  styleUrls: ['./predicted-lineups.component.scss']
})
export class PredictedLineupsComponent {
  constructor() {}
}
