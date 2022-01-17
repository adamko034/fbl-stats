import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { GuiConfigStore } from 'src/app/store/gui-config/gui-config.store';
import { Logger } from 'src/app/utils/logger';
import { PlayersCompareFixturesFilters } from '../models/players-compare-fixtures-filters.model';

@Injectable()
export class PlayersCompareFixturesService {
  private _default: PlayersCompareFixturesFilters = {
    includeMatchdays: 0
  };

  constructor(private guiConfigStore: GuiConfigStore) {}

  public selectFilters(): Observable<PlayersCompareFixturesFilters> {
    return this.guiConfigStore.selectComparePlayersConfig().pipe(
      map((config) => {
        return {
          includeMatchdays: config?.includeMatchdays ?? this._default.includeMatchdays
        };
      }),
      tap((filters) => Logger.logDev('players compare fixtures filters: ' + JSON.stringify(filters)))
    );
  }

  public changeMatchdays(matchdaysCount: number): void {
    this.guiConfigStore.changeComparePlayersMatchdaysCount(matchdaysCount);
  }
}
