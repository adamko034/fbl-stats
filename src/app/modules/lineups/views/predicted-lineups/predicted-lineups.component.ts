import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-predicted-lineups',
  templateUrl: './predicted-lineups.component.html',
  styleUrls: ['./predicted-lineups.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PredictedLineupsComponent {
  constructor() {}
}
