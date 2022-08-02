import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { FixturesFirstGamesFilters } from '../../models/fixtures-first-games-fitlers.model';
import { FixturesFirstGamesTeam } from '../../models/fixtures-first-games-team.model';

@Component({
  selector: 'app-fixtures-first-games-teams',
  templateUrl: './fixtures-first-games-teams.component.html',
  styleUrls: ['./fixtures-first-games-teams.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FixturesFirstGamesTeamsComponent implements OnInit {
  @Input() teams: FixturesFirstGamesTeam[];
  @Input() nextMatchday: number;
  @Input() filters: FixturesFirstGamesFilters;

  public get mdsRangeString(): string {
    if (this.filters.matchdays.from === this.filters.matchdays.to) {
      return `MD${this.filters.matchdays.from}`;
    }

    return `MD${this.filters.matchdays.from} - MD${this.filters.matchdays.to}`;
  }

  constructor() {}

  ngOnInit(): void {}
}
