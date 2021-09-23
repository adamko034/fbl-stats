import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { SwitchItem } from 'src/app/shared/components/switch/models/switch-item.model';
import { PlayersStatsPointsFilters } from '../../../models/players-stats-points-filters.model';

@Component({
  selector: 'app-players-stats-points-filters',
  templateUrl: './players-stats-points-filters.component.html',
  styleUrls: ['./players-stats-points-filters.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlayersStatsPointsFiltersComponent implements OnInit {
  @Input() filters: PlayersStatsPointsFilters;

  private _types: SwitchItem[] = [
    { value: 'bundesliga', description: 'Bundesliga' },
    { value: 'main', description: 'Main' },
    { value: 'defence', description: 'Defence' },
    { value: 'goalkeeping', description: 'Goalkeeping' },
    { value: 'attacking', description: 'Attacking' }
  ];

  private _calcs: SwitchItem[] = [
    { value: 'overall', description: 'Overall' },
    { value: 'last5', description: 'Last 5' }
  ];

  public get types(): SwitchItem[] {
    return this._types;
  }

  public get calculations(): SwitchItem[] {
    return this._calcs;
  }

  constructor() {}

  public ngOnInit(): void {}
}
