import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { TeamPlayersTableConfig } from './team-players-table-config.model';
import { TeamPlayersTablePlayer } from './team-players-table-player.model';

@Component({
  selector: 'app-team-players-table',
  templateUrl: './team-players-table.component.html',
  styleUrls: ['./team-players-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TeamPlayersTableComponent implements OnInit {
  @Input() config: TeamPlayersTableConfig;
  @Input() players: TeamPlayersTablePlayer[];

  constructor() {}

  ngOnInit(): void {}
}
