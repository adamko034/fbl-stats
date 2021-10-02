import { Component, EventEmitter, Output } from '@angular/core';
import { SwitchItem } from 'src/app/shared/components/switch/models/switch-item.model';
import { BundesligaTableFilters } from '../../../models/bundesliga-table-filters.model';

@Component({
  selector: 'app-bundesliga-teams-table-filters',
  templateUrl: './bundesliga-teams-table-filters.component.html',
  styleUrls: ['./bundesliga-teams-table-filters.component.scss']
})
export class BundesligaTeamsTableFiltersComponent {
  @Output() filtersChange = new EventEmitter<BundesligaTableFilters>();

  public filters: BundesligaTableFilters = {
    games: 0,
    venue: 'all'
  };

  public venues: SwitchItem[] = [
    { value: 'all', description: 'Overall' },
    { value: 'h', description: 'Home' },
    { value: 'a', description: 'Away' }
  ];

  public games: SwitchItem[] = [
    { value: 0, description: 'All' },
    { value: 2, description: 'Last 2' },
    { value: 3, description: 'Last 3' },
    { value: 4, description: 'Last 4' },
    { value: 5, description: 'Last 5' }
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
