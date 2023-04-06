import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Fixture } from 'src/app/store/teams/models/fixture.model';
import { Team } from 'src/app/store/teams/models/team.model';

@Component({
  selector: 'app-bundesliga-fixture-details-title',
  templateUrl: './bundesliga-fixture-details-title.component.html',
  styleUrls: ['./bundesliga-fixture-details-title.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BundesligaFixtureDetailsTitleComponent {
  @Input() homeTeam: Team;
  @Input() awayTeam: Team;
  @Input() matchday: number;
  @Input() fixture: Fixture;
}
