import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SwitchItem } from '../../switch/models/switch-item.model';
import { BundesligaTableConfig } from '../models/bundesliga-table-config.model';
import { BundesligaTableFilterType } from '../models/bundesliga-table-filter-type.enum';
import { BundesligaTableFilters } from '../models/bundesliga-table-filters.model';

@Component({
  selector: 'app-bundesliga-table-filters',
  templateUrl: './bundesliga-table-filters.component.html',
  styleUrls: ['./bundesliga-table-filters.component.scss']
})
export class BundesligaTableFiltersComponent implements OnInit {
  @Input() filters: BundesligaTableFilters;
  @Input()
  set config(value: BundesligaTableConfig) {
    this._config = value;
  }
  get config(): BundesligaTableConfig {
    return this._config;
  }

  @Output() filtersChange = new EventEmitter<BundesligaTableFilters>();

  private _types: SwitchItem[] = [];
  private _config: BundesligaTableConfig;

  public games: SwitchItem[] = [
    { value: 0, description: 'all' },
    { value: 2, description: 'last 2' },
    { value: 3, description: 'last 3' },
    { value: 4, description: 'last 4' },
    { value: 5, description: 'last 5' }
  ];

  public get types(): SwitchItem[] {
    return this._types;
  }

  constructor() {}

  public ngOnInit(): void {
    this.setTypes();
  }

  public onTypeChange(type: BundesligaTableFilterType): void {
    this.filters.type = type;
    this.filtersChange.emit({ ...this.filters, type });
  }

  public onGamesChange(includedGames: number): void {
    this.filters.includedGames = includedGames;
    this.filtersChange.emit({ ...this.filters, includedGames });
  }

  private setTypes(): void {
    if (!this._config?.types) {
      this._types = [];
      return;
    }

    if (this._config.types.includes(BundesligaTableFilterType.OVERALL)) {
      this._types.push({ value: BundesligaTableFilterType.OVERALL, description: 'Overall' });
    }

    if (this._config.types.includes(BundesligaTableFilterType.HOME)) {
      this._types.push({ value: BundesligaTableFilterType.HOME, description: 'Home' });
    }

    if (this._config.types.includes(BundesligaTableFilterType.AWAY)) {
      this._types.push({ value: BundesligaTableFilterType.AWAY, description: 'Away' });
    }

    if (this._config.types.includes(BundesligaTableFilterType.FIRST_LEG)) {
      this._types.push({ value: BundesligaTableFilterType.FIRST_LEG, description: '1st leg' });
    }

    if (this._config.types.includes(BundesligaTableFilterType.SECOND_LEG)) {
      this._types.push({ value: BundesligaTableFilterType.SECOND_LEG, description: '2nd leg' });
    }
  }
}
