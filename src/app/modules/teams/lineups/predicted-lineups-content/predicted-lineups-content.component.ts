import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-predicted-lineups-content',
  templateUrl: './predicted-lineups-content.component.html',
  styleUrls: ['./predicted-lineups-content.component.scss']
})
export class PredictedLineupsContentComponent {
  constructor() {}
}
