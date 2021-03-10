import { Injectable } from '@angular/core';
import { ReplaySubject, Observable } from 'rxjs';
import { map, distinctUntilChanged } from 'rxjs/operators';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { FILTERS_MATCHDAYS_STORAGEKEY } from '../../players/models/players-filters';
import { MyTeamPlayersFilters } from '../models/my-team-players-filters.model';

@Injectable()
export class MyTeamPlayersFitlersService {
  private filters: MyTeamPlayersFilters;
  private filters$: ReplaySubject<MyTeamPlayersFilters> = new ReplaySubject<MyTeamPlayersFilters>(1);

  constructor(private localStorageService: LocalStorageService) {
    this.filters = this.initialData();
    this.send();
  }

  public select(): Observable<MyTeamPlayersFilters> {
    return this.filters$.pipe();
  }

  public selectPosition(): Observable<string> {
    return this.select().pipe(
      map((f) => f.position),
      distinctUntilChanged()
    );
  }

  public selectMatchdays(): Observable<number> {
    return this.select().pipe(
      map((f) => f.matchdays),
      distinctUntilChanged()
    );
  }

  public updateMatchdays(matchdays: number) {
    this.filters.matchdays = matchdays;
    this.localStorageService.upsert<number>(FILTERS_MATCHDAYS_STORAGEKEY, matchdays);
    this.send();
  }

  public updatePosition(position: string): void {
    this.filters.position = position;
    this.send();
  }

  private initialData(): MyTeamPlayersFilters {
    const matchdays = this.localStorageService.get<number>(FILTERS_MATCHDAYS_STORAGEKEY) || 3;
    return { matchdays, position: 'all' };
  }

  private send(): void {
    this.filters$.next({ ...this.filters });
  }
}
