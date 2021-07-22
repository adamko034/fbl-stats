import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';
import { PlayerPosition } from '../../../players/overall/models/players-filters';
import { HistoryPlayersFilters } from '../models/history-players-filters.model';

@Injectable()
export class HistoryPlayersFiltersService {
  private filters: HistoryPlayersFilters;
  private filters$: ReplaySubject<HistoryPlayersFilters> = new ReplaySubject(1);

  constructor() {
    this.filters = {
      maxPopularity: 100,
      maxPrice: 26.5,
      position: PlayerPosition.ALL,
      teams: []
    };

    this.send();
  }

  public changeMaxPopularity(value: number): void {
    this.filters.maxPopularity = value;
    this.send();
  }

  public changeMaxPrice(value: number): void {
    this.filters.maxPrice = value;
    this.send();
  }

  public changePosition(value: PlayerPosition): void {
    this.filters.position = value;
    this.send();
  }

  public changeTeams(value: string[]): void {
    this.filters.teams = value;
    this.send();
  }

  public select(): Observable<HistoryPlayersFilters> {
    return this.filters$.pipe(distinctUntilChanged());
  }

  private send(): void {
    this.filters$.next({ ...this.filters });
  }
}
