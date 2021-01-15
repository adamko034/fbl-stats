import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';
import { SelectableTeam } from 'src/app/modules/players/views/players-fantasy/components/players-filters/components/players-filter-teams/model/selectable-team.model';
import {
  FILTERS_MATCHDAYS_STORAGEKEY,
  PlayerPosition,
  PlayersFilters
} from 'src/app/modules/players/views/players-fantasy/models/players-filters';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Injectable({ providedIn: 'root' })
export class FiltersStoreService {
  private state: PlayersFilters;
  private initialData: PlayersFilters = {
    position: PlayerPosition.ALL,
    matchdays: 3,
    name: '',
    price: null,
    popularity: 100,
    teams: null
  };

  private filters: ReplaySubject<PlayersFilters>;

  constructor(private localStorageService: LocalStorageService) {
    this.filters = new ReplaySubject(1);

    this.state = this.getInitialData();
    this.sendFilters();
  }

  private getInitialData(): PlayersFilters {
    const fromLocalStorage = this.localStorageService.get<number>(FILTERS_MATCHDAYS_STORAGEKEY);
    const matchdays = fromLocalStorage || this.initialData.matchdays;

    return { ...this.initialData, matchdays };
  }

  public selectFilters(): Observable<PlayersFilters> {
    return this.filters.asObservable().pipe(distinctUntilChanged());
  }

  public selectPrice(): Observable<number> {
    return this.filters.pipe(
      map((filters) => filters.price),
      distinctUntilChanged()
    );
  }

  public selectPopularity(): Observable<number> {
    return this.filters.pipe(
      map((filters) => filters.popularity),
      distinctUntilChanged()
    );
  }

  public selectMatchdays(): Observable<number> {
    return this.filters.pipe(
      map((filters) => filters.matchdays),
      distinctUntilChanged()
    );
  }

  public selectTeams(): Observable<SelectableTeam[]> {
    return this.filters.pipe(
      map((filters) => filters.teams),
      distinctUntilChanged()
    );
  }

  public selectPosition(): Observable<PlayerPosition> {
    return this.filters.pipe(
      map((filters) => filters.position),
      distinctUntilChanged()
    );
  }

  public selectName(): Observable<string> {
    return this.filters.pipe(map((filters) => filters.name));
  }

  public updatePrice(newPrice: number) {
    this.state.price = newPrice;
    this.sendFilters();
  }

  public updatePopularity(newPopularity: number) {
    this.state.popularity = newPopularity;
    this.sendFilters();
  }

  public updateMatchdays(matchdays: number) {
    this.state.matchdays = matchdays;
    this.localStorageService.upsert<number>(FILTERS_MATCHDAYS_STORAGEKEY, matchdays);
    this.sendFilters();
  }

  public updateTeams(teams: SelectableTeam[]) {
    this.state.teams = teams;
    this.sendFilters();
  }

  public updatePosition(position: PlayerPosition) {
    this.state.position = position;
    this.sendFilters();
  }

  public updateName(name: string): void {
    this.state.name = name;
    this.sendFilters();
  }

  public getCurrentState(): PlayersFilters {
    return { ...this.state };
  }

  private sendFilters(): void {
    this.filters.next({ ...this.state });
  }
}
