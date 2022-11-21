import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SwitcherItem } from 'src/app/common/components/ui/switcher/models/switcher-item.model';
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

  private _types: SwitcherItem[] = [
    { value: 'bundesliga', description: 'Bundesliga' },
    { value: 'fantasy', description: 'Fantasy Bundesliga' }
  ];

  private _fantasyTypes: SwitcherItem[] = [
    { value: 'general', description: 'General' },
    { value: 'offensive', description: 'Offensive' },
    { value: 'defensive', description: 'Defensive' },
    { value: 'all', description: 'All' }
  ];

  private _calcs: SwitcherItem[] = [
    { value: CalculationsType.OVERALL, description: 'Overall' },
    { value: CalculationsType.LAST5, description: 'Last 5 games' }
  ];

  public get types(): SwitcherItem[] {
    return this._types;
  }

  public get fantasyTypes(): SwitcherItem[] {
    return this._fantasyTypes;
  }

  public get calculations(): SwitcherItem[] {
    return this._calcs;
  }

  constructor(private route: ActivatedRoute, private router: Router) {}

  public ngOnInit(): void {}

  public onTypeChange(newType: string): void {
    const sortBy = newType === 'bundesliga' ? 'G' : 'total';
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { type: newType, calc: this.filters.calculations, sortBy, sortOrder: 'desc' }
    });
  }

  public onSubTypeChange(newType: string): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { sub: newType, cols: null, sortBy: 'total', sortOrder: 'desc' },
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
    return this.filters.type === PlayersStatsPointsType.FANTASY;
  }
}
