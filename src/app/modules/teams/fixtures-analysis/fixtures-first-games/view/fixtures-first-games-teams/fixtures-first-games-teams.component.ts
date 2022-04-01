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
    if (this.nextMatchday === this.filters.matchdays + this.nextMatchday - 1) {
      return `MD${this.nextMatchday}`;
    }

    return `MD${this.nextMatchday} - MD${this.nextMatchday + this.filters.matchdays - 1}`;
  }

  constructor() {}

  ngOnInit(): void {}
}
