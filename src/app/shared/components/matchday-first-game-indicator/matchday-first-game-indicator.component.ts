import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-matchday-first-game-indicator',
  templateUrl: './matchday-first-game-indicator.component.html',
  styleUrls: ['./matchday-first-game-indicator.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MatchdayFirstGameIndicatorComponent {
  @Input() size: 'small' | 'medium' = 'medium';

  constructor() {}
}
