import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Player } from 'src/app/store/players/models/player.model';
import { PlayersFiltersBuilder } from '../../filter/players-filters.builder';
import { PlayersFromStoreFilterService } from '../../filter/players-from-store-filter.service';
import { PlayerPicker } from '../models/player-picker.model';
import { PlayersPickerFilters } from '../models/players-picker-fitlers.model';

@Injectable({ providedIn: 'root' })
export class PlayerPickerService {
  constructor(private filtersService: PlayersFromStoreFilterService) {}

  public search(pickerFilters: PlayersPickerFilters, term: string): Observable<PlayerPicker[]> {
    let filtersBuilder = PlayersFiltersBuilder.instance();
    if (pickerFilters.position) {
      filtersBuilder.withPosition(pickerFilters.position);
    }

    if (pickerFilters.excludedIds) {
      filtersBuilder.withExcludedIds(pickerFilters.excludedIds);
    }

    filtersBuilder.withName(term);
    const filters = filtersBuilder.build();

    return this.filtersService.filter(filters).pipe(map((players) => this.convert(players)));
  }

  private convert(players: Player[]): PlayerPicker[] {
    return players.map((p) => ({ id: p.id, name: p.name, teamShort: p.teamShort, position: p.position }));
  }
}
