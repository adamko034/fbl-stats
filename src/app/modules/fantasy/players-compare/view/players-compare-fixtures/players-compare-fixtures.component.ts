import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TeamService } from 'src/app/modules/core/teams/services/team.service';
import { Player } from 'src/app/store/players/models/player.model';
import { Team } from 'src/app/store/teams/models/team.model';
import { PlayersCompareFixturesFilters } from '../../models/players-compare-fixtures-filters.model';
import { PlayersCompareFixturesService } from '../../services/players-compare-fixtures.service';

@Component({
  selector: 'app-players-compare-fixtures',
  templateUrl: './players-compare-fixtures.component.html',
  styleUrls: ['./players-compare-fixtures.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlayersCompareFixturesComponent implements OnInit {
  @Input() players: Player[];
  @Input() teams: { [teamShort: string]: Team };
  @Input() lastMatchday: number;

  public filters$: Observable<PlayersCompareFixturesFilters>;

  constructor(private fixturesService: PlayersCompareFixturesService, private teamService: TeamService) {}

  public ngOnInit(): void {
    this.filters$ = this.fixturesService.selectFilters();
  }

  public onMatchdaysCountChange(count: number): void {
    this.fixturesService.changeMatchdays(count);
  }
}
