import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-matchday-tips',
  templateUrl: './matchday-tips.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MatchdayTipsComponent {
  constructor() {}
}
