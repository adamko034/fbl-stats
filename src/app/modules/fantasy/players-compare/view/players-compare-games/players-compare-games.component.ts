import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Player } from 'src/app/store/players/models/player.model';
import { Team } from 'src/app/store/teams/models/team.model';
import { PlayersCompareFixturesFilters } from '../../models/players-compare-fixtures-filters.model';

@Component({
  selector: 'app-players-compare-games',
  templateUrl: './players-compare-games.component.html',
  styleUrls: ['./players-compare-games.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlayersCompareGamesComponent implements OnInit {
  @Input() players: Player[];
  @Input() teams: { [teamShort: string]: Team };
  @Input() lastMatchday: number;
  @Input() filters: PlayersCompareFixturesFilters;

  constructor() {}

  ngOnInit(): void {}
}
