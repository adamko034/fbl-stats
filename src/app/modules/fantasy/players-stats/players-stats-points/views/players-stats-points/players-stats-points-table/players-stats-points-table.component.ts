import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-players-stats-points-table',
  templateUrl: './players-stats-points-table.component.html',
  styleUrls: ['./players-stats-points-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlayersStatsPointsTableComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
