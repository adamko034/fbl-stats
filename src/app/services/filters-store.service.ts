import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';
import { PlayerPosition, PlayersFilters } from '../modules/fantasy/players/overall/models/players-filters';
import { SelectableTeam } from '../modules/fantasy/players/overall/models/selectable-team.model';
import { GuiConfigStore } from '../store/gui-config/gui-config.store';

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

  private filters: ReplaySubject<PlayersFilters> = new ReplaySubject(1);

  constructor(private guiConfigStore: GuiConfigStore) {
    this.state = { ...this.initialData };
    this.guiConfigStore.selectPlayersFiltersMatchdays().subscribe((matchdays) => {
      if (!!matchdays) {
        this.state.matchdays = matchdays;
        this.sendFilters();
      }
    });

    this.sendFilters();
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
    this.guiConfigStore.changePlayersFiltersMatchdays(matchdays);
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

  private sendFilters(): void {
    this.filters.next({ ...this.state });
  }
}
