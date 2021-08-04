import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BundesligaTableConfig } from './models/bundesliga-table-config.model';
import { BundesligaTableFilterType } from './models/bundesliga-table-filter-type.enum';
import { BundesligaTableFilters } from './models/bundesliga-table-filters.model';
import { BundesligaTableTeam } from './models/bundesliga-table-team.model';

@Component({
  selector: 'app-bundesliga-table',
  templateUrl: './bundesliga-table.component.html',
  styleUrls: ['./bundesliga-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BundesligaTableComponent implements OnInit {
  @Input() config?: BundesligaTableConfig;
  @Input() filters?: BundesligaTableFilters;
  @Input() data: BundesligaTableTeam[];

  @Output() filtersChange = new EventEmitter<BundesligaTableFilters>();

  public get configInner(): BundesligaTableConfig {
    return { ...this.defaultConfig(), ...this.config };
  }

  public get filtersInner(): BundesligaTableFilters {
    return { ...this.defaultFiltes(), ...this.filters };
  }

  constructor() {}

  public ngOnInit(): void {}

  public onFiltersChange(value: BundesligaTableFilters): void {
    this.filters = value;
    this.filtersChange.emit(value);
  }

  private defaultFiltes(): BundesligaTableFilters {
    return { includedGames: 3, type: BundesligaTableFilterType.OVERALL };
  }

  private defaultConfig(): BundesligaTableConfig {
    return {
      showFilters: true,
      showIncludedGames: true,
      showTypes: true,
      types: [
        BundesligaTableFilterType.AWAY,
        BundesligaTableFilterType.FIRST_LEG,
        BundesligaTableFilterType.HOME,
        BundesligaTableFilterType.OVERALL,
        BundesligaTableFilterType.SECOND_LEG
      ],
      showTeamForm: true
    };
  }
}
