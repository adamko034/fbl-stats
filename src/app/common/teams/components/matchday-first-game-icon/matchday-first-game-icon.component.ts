import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-matchday-first-game-icon',
  templateUrl: './matchday-first-game-icon.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MatchdayFirstGameIconComponent {
  @Input() small = true;

  constructor() {}
}
