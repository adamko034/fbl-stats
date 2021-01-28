import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Matchday } from 'src/app/modules/core/matchday/models/matchday.model';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-matchday',
  templateUrl: './matchday.component.html',
  styleUrls: ['./matchday.component.scss']
})
export class MatchdayComponent {
  @Input() matchday: Matchday;
  @Input() displaye: 'long' | 'short' | 'logo' = 'long';

  constructor() {}
}
