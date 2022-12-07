import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-players-stats-content',
  templateUrl: './players-stats-content.component.html',
  styleUrls: ['./players-stats-content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlayersStatsContentComponent {
  constructor() {}
}
