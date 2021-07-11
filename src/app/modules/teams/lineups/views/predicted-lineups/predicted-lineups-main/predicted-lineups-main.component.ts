import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-predicted-lineups-main',
  templateUrl: './predicted-lineups-main.component.html',
  styleUrls: ['./predicted-lineups-main.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PredictedLineupsMainComponent {
  constructor() {}
}
