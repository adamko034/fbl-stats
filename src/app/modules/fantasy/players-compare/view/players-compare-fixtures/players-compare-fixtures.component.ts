import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Player } from 'src/app/store/players/models/player.model';
import { Team } from 'src/app/store/teams/models/team.model';

@Component({
  selector: 'app-players-compare-fixtures',
  templateUrl: './players-compare-fixtures.component.html',
  styleUrls: ['./players-compare-fixtures.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlayersCompareFixturesComponent {
  @Input() players: Player[];
  @Input() teams: { [teamShort: string]: Team };
  @Input() lastMatchday: number;
  @Input() includeMatchdays: number;

  constructor() {}
}
