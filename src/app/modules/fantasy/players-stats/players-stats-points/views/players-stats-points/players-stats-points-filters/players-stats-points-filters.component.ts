import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SwitchItem } from 'src/app/shared/components/switch/models/switch-item.model';
import { CalculationsType } from 'src/app/shared/models/calculations-type.enum';
import { PlayersStatsPointsFilters } from '../../../models/players-stats-points-filters.model';
import { PlayersStatsPointsType } from '../../../models/players-stats-points-type.enum';

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
    { value: 'fantasy', description: 'Fantasy Bundesliga' }
  ];

  private _fantasyTypes: SwitchItem[] = [
    { value: 'general', description: 'General' },
    { value: 'offensive', description: 'Offensive' },
    { value: 'defensive', description: 'Defensive' }
  ];

  private _calcs: SwitchItem[] = [
    { value: CalculationsType.OVERALL, description: 'Overall' },
    { value: CalculationsType.LAST5, description: 'Last 5 games' }
  ];

  public get types(): SwitchItem[] {
    return this._types;
  }

  public get fantasyTypes(): SwitchItem[] {
    return this._fantasyTypes;
  }

  public get calculations(): SwitchItem[] {
    return this._calcs;
  }

  constructor(private route: ActivatedRoute, private router: Router) {}

  public ngOnInit(): void {}

  public onTypeChange(newType: string): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { type: newType, calc: this.filters.calculations }
    });
  }

  public onSubTypeChange(newType: string): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { sub: newType },
      queryParamsHandling: 'merge'
    });
  }

  public onCalcChange(newCalc: string): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { calc: newCalc },
      queryParamsHandling: 'merge'
    });
  }

  public isFantasy(): boolean {
    return this.filters.type !== PlayersStatsPointsType.BUNDESLIGA;
  }
}
