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
