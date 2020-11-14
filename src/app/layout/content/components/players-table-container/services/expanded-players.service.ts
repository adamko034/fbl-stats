import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ExpandedPlayersService {
  private expandedPlayers: { [id: string]: boolean } = {};
  private expandedPlayers$ = new ReplaySubject<{ [id: string]: boolean }>(1);

  constructor() {
    this.send();
  }

  public toggleExpand(playerId: string): void {
    this.expandedPlayers[playerId] = !!this.expandedPlayers[playerId] ? !this.expandedPlayers[playerId] : true;
    this.send();
  }

  public select(): Observable<{ [id: string]: boolean }> {
    return this.expandedPlayers$.asObservable();
  }

  public selectPlayerExpanded(playerId) {
    return this.expandedPlayers$.pipe(
      map((expandedPlayers) => (!!expandedPlayers[playerId] ? expandedPlayers[playerId] : false))
    );
  }

  private send(): void {
    this.expandedPlayers$.next({ ...this.expandedPlayers });
  }
}
