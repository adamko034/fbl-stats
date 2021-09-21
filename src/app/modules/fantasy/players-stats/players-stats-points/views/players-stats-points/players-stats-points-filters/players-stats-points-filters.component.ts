import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-players-stats-points-filters',
  templateUrl: './players-stats-points-filters.component.html',
  styleUrls: ['./players-stats-points-filters.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlayersStatsPointsFiltersComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
