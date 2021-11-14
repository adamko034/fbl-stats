import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { SwitchItem } from 'src/app/shared/components/switch/models/switch-item.model';
import { TeamsBundesligaTableFilters } from '../../../models/teams-bundesliga-table-filters.model';

@Component({
  selector: 'app-bundesliga-teams-table-filters',
  templateUrl: './bundesliga-teams-table-filters.component.html',
  styleUrls: ['./bundesliga-teams-table-filters.component.scss']
})
export class BundesligaTeamsTableFiltersComponent {
  @Input() filters: TeamsBundesligaTableFilters;

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

  constructor(private router: Router) {}

  public onVenueChange(newValue: 'all' | 'h' | 'a') {
    this.router.navigate([], { queryParams: { venue: newValue }, queryParamsHandling: 'merge' });
  }

  public onGamesChange(newValue: number): void {
    this.router.navigate([], { queryParams: { games: newValue }, queryParamsHandling: 'merge' });
  }
}
