import { Component, EventEmitter, Output } from '@angular/core';
import { TableFilters } from 'src/app/modules/teams/views/teams-table/models/table-filters.model';
import { SwitchItem } from 'src/app/shared/components/switch/models/switch-item.model';

@Component({
  selector: 'app-teams-table-filters',
  templateUrl: './teams-table-filters.component.html',
  styleUrls: ['./teams-table-filters.component.scss']
})
export class TeamsTableFiltersComponent {
  @Output() filtersChange = new EventEmitter<TableFilters>();

  public filters: TableFilters = {
    games: 0,
    venue: 'all'
  };

  public venues: SwitchItem[] = [
    { value: 'all', description: 'overall' },
    { value: 'h', description: 'home' },
    { value: 'a', description: 'away' }
  ];

  public games: SwitchItem[] = [
    { value: 0, description: 'all' },
    { value: 2, description: 'last 2' },
    { value: 3, description: 'last 3' },
    { value: 4, description: 'last 4' },
    { value: 5, description: 'last 5' }
  ];

  constructor() {}

  public onVenueChange(newValue: 'all' | 'h' | 'a') {
    this.filters.venue = newValue;
    this.emit();
  }

  public onGamesChange(newValue: number): void {
    this.filters.games = newValue;
    this.emit();
  }

  private emit(): void {
    this.filtersChange.emit(this.filters);
  }
}
