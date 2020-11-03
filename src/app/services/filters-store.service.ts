import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { PlayerPosition, PlayersFilters } from 'src/app/layout/content/models/players-filters';
import { TeamProperty } from 'src/app/models/properties.model';

@Injectable({ providedIn: 'root' })
export class FiltersStoreService {
  private state: PlayersFilters;
  private initialData: PlayersFilters = {
    position: null,
    matchdays: 3,
    name: '',
    price: null,
    popularity: 100,
    teams: null,
    hideUnavailable: false
  };

  private filters: ReplaySubject<PlayersFilters>;
  private changed: ReplaySubject<boolean>;

  constructor() {
    this.state = this.getInitialData();

    this.filters = new ReplaySubject(1);
    this.changed = new ReplaySubject(1);

    this.sendFilters(false);
  }

  public getInitialData(): PlayersFilters {
    return { ...this.initialData };
  }

  public selectFilters(): Observable<PlayersFilters> {
    return this.filters.asObservable();
  }

  public selectPrice(): Observable<number> {
    return this.filters.pipe(map((filters) => filters.price));
  }

  public selectPopularity(): Observable<number> {
    return this.filters.pipe(map((filters) => filters.popularity));
  }

  public selectMatchdays(): Observable<number> {
    return this.filters.pipe(map((filters) => filters.matchdays));
  }

  public selectTeams(): Observable<TeamProperty[]> {
    return this.filters.pipe(map((filters) => filters.teams));
  }

  public selectPosition(): Observable<PlayerPosition> {
    return this.filters.pipe(map((filters) => filters.position));
  }

  public selectName(): Observable<string> {
    return this.filters.pipe(map((filters) => filters.name));
  }

  public selectHideUnavailable(): Observable<boolean> {
    return this.filters.pipe(map((filters) => filters.hideUnavailable));
  }

  public selectFiltersChanged(): Observable<boolean> {
    return this.changed.asObservable();
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
    this.sendFilters();
  }

  public updateTeams(teams: TeamProperty[]) {
    this.state.teams = teams;
    this.sendFilters();
  }

  public updatePosition(position: PlayerPosition) {
    this.state.position = position;
    this.sendFilters(false);
  }

  public updateName(name: string): void {
    this.state.name = name;
    this.sendFilters(false);
  }

  public updateHideUnavailable(newValue: boolean): void {
    this.state.hideUnavailable = newValue;
    this.sendFilters();
  }

  public clear() {
    const initial = this.getInitialData();
    this.state.popularity = initial.popularity;
    this.state.price = initial.price;
    this.state.teams = null;
    this.state.hideUnavailable = false;

    this.sendFilters(false);
  }

  private sendFilters(markFiltersAsChanged: boolean = true): void {
    this.filters.next({ ...this.state });
    this.changed.next(markFiltersAsChanged);
  }
}
