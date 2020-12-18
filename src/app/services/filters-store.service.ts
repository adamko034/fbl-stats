import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';
import { SelectableTeam } from 'src/app/layout/content/components/players-filters/components/players-filter-teams/model/selectable-team.model';
import { PlayerPosition, PlayersFilters } from 'src/app/layout/content/models/players-filters';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Injectable({ providedIn: 'root' })
export class FiltersStoreService {
  private localStorageKey = 'Filters';
  private state: PlayersFilters;
  private initialData: PlayersFilters = {
    position: PlayerPosition.ALL,
    matchdays: 3,
    name: '',
    price: null,
    popularity: 100,
    teams: null,
    hideUnavailable: false,
    showOnlyReturning: false
  };

  private filters: ReplaySubject<PlayersFilters>;
  private changed: ReplaySubject<boolean>;
  private filtersChanged = {
    shouldSend: false,
    change: false
  };

  constructor(private localStorageService: LocalStorageService) {
    const data = this.getInitialData();

    this.filters = new ReplaySubject(1);
    this.changed = new ReplaySubject(1);

    if (data.fromCache) {
      this.filtersChanged = { change: true, shouldSend: true };
    }

    this.state = { ...data.filters };
    this.sendFilters();
  }

  private getInitialData(): { fromCache: boolean; filters: PlayersFilters } {
    // var fromLocalStorage = this.localStorageService.get<PlayersFilters>(this.localStorageKey);
    // if (!fromLocalStorage) {
    //   return { filters: { ...this.initialData }, fromCache: false };
    // }

    // return { fromCache: true, filters: { ...fromLocalStorage } };

    return { filters: { ...this.initialData }, fromCache: false };
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

  public selectHideUnavailable(): Observable<boolean> {
    return this.filters.pipe(map((filters) => filters.hideUnavailable));
  }

  public selectShowOnlyReturning(): Observable<boolean> {
    return this.filters.pipe(
      map((filters) => filters.showOnlyReturning),
      distinctUntilChanged()
    );
  }

  public selectFiltersChanged(): Observable<boolean> {
    return this.changed.asObservable();
  }

  public updatePrice(newPrice: number) {
    this.state.price = newPrice;
    this.filtersChanged = { change: true, shouldSend: true };
    this.sendFilters();
  }

  public updatePopularity(newPopularity: number) {
    this.state.popularity = newPopularity;
    this.filtersChanged = { change: true, shouldSend: true };
    this.sendFilters();
  }

  public updateMatchdays(matchdays: number) {
    this.state.matchdays = matchdays;
    this.filtersChanged = { change: true, shouldSend: true };
    this.sendFilters();
  }

  public updateTeams(teams: SelectableTeam[]) {
    this.state.teams = teams;
    this.filtersChanged = { change: true, shouldSend: true };
    this.sendFilters();
  }

  public updatePosition(position: PlayerPosition) {
    this.filtersChanged = { change: true, shouldSend: true };
    this.state.position = position;
    this.sendFilters();
  }

  public updateName(name: string): void {
    this.filtersChanged = { change: true, shouldSend: false };
    this.state.name = name;
    this.sendFilters();
  }

  public updateHideUnavailable(newValue: boolean): void {
    this.filtersChanged = { change: true, shouldSend: true };
    this.state.hideUnavailable = newValue;
    this.sendFilters();
  }

  public updateShowOnlyReturning(newValue: boolean): void {
    this.filtersChanged = { change: true, shouldSend: true };
    this.state.showOnlyReturning = newValue;
    this.sendFilters();
  }

  public clear() {
    const initial = { ...this.initialData };
    this.state.popularity = initial.popularity;
    this.state.price = initial.price;
    this.state.teams = null;
    this.state.hideUnavailable = false;
    this.state.matchdays = initial.matchdays;
    this.state.position = initial.position;
    this.state.showOnlyReturning = initial.showOnlyReturning;

    this.filtersChanged = { change: false, shouldSend: true };
    this.sendFilters();
  }

  public getCurrentState(): PlayersFilters {
    return { ...this.state };
  }

  private sendFilters(): void {
    //this.localStorageService.upsert<PlayersFilters>(this.localStorageKey, { ...this.state });
    this.filters.next({ ...this.state });

    if (this.filtersChanged.shouldSend) {
      this.changed.next(this.filtersChanged.change);
    }
  }
}
