import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TeamService } from 'src/app/modules/core/teams/services/team.service';
import { Player } from 'src/app/store/players/models/player.model';
import { Team } from 'src/app/store/teams/models/team.model';
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

  private _posstibleNextMatchdays: number[];
  public get possibleNextMatchdays(): number[] {
    return this._posstibleNextMatchdays;
  }

  public includeMatchdays$: Observable<number>;

  constructor(private fixturesService: PlayersCompareFixturesService, private teamService: TeamService) {}

  public ngOnInit(): void {
    this.setPossibleNextMatchdays();
    this.includeMatchdays$ = this.fixturesService.selectFilters().pipe(
      map((filters) => {
        const maxMatchdays = Math.max(...this._posstibleNextMatchdays);

        return filters?.includeMatchdays > maxMatchdays ? 0 : filters.includeMatchdays;
      })
    );
  }

  public onMatchdaysCountChange(count: number): void {
    this.fixturesService.changeMatchdays(count);
  }

  private setPossibleNextMatchdays(): void {
    const nextUnknownMatchday = this.teamService.getFirstMatchdayWithMissingDate(Object.values(this.teams)[0]);
    const nextMatchday = this.lastMatchday + 1;

    const matchdays = [];
    for (let i = 1; i <= nextUnknownMatchday - nextMatchday; i++) {
      matchdays.push(i);
    }

    this._posstibleNextMatchdays = matchdays;
  }
}
