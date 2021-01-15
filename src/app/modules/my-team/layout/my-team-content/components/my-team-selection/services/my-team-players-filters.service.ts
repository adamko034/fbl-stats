import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';
import { MyTeamPlayersFilters } from 'src/app/modules/my-team/models/my-team-players-filters.model';
import { FILTERS_MATCHDAYS_STORAGEKEY } from 'src/app/modules/players/views/players-fantasy/models/players-filters';
import { LocalStorageService } from 'src/app/services/local-storage.service';

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
