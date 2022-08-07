import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-matchday-standalone-game-icon',
  templateUrl: './matchday-standalone-game-icon.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MatchdayStandaloneGameIconComponent {
  constructor() {}
}
