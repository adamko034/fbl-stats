import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-matchday-tips',
  templateUrl: './matchday-tips.component.html',
  styleUrls: ['./matchday-tips.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MatchdayTipsComponent {
  constructor() {}
}
