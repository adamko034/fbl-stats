import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatchdayFixture } from 'src/app/modules/core/matchday/models/matchday-fixture.model';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-matchday-fixture',
  templateUrl: './matchday-fixture.component.html',
  styleUrls: ['./matchday-fixture.component.scss']
})
export class MatchdayFixtureComponent {
  @Input() matchdayFixture: MatchdayFixture;

  public clickable = false;

  constructor() {}
}
