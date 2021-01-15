import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Filterable } from 'src/app/modules/core/shared/filterable/filterable';
import { PlayersReturningFilter } from 'src/app/modules/players/filters/players-returning.filter';
import { PlayersSuspensionRiskFilter } from 'src/app/modules/players/filters/players-suspension-risk.filter';
import { PlayersUnavailableFilter } from 'src/app/modules/players/filters/players-unavailable.filter';
import { ArrayStream } from 'src/app/services/array-stream.service';
import { Player } from 'src/app/store/players/models/player.model';
import { PlayersStore } from 'src/app/store/players/players.store';

@Injectable()
export class PlayersListsLoader {
  constructor(private playersStore: PlayersStore) {}

  public getUnavailable(): Observable<Player[]> {
    return this.getWithFilter(new PlayersUnavailableFilter());
  }

  public getReturning(): Observable<Player[]> {
    return this.getWithFilter(new PlayersReturningFilter());
  }

  public getSuspensRisk(): Observable<Player[]> {
    return this.getWithFilter(new PlayersSuspensionRiskFilter());
  }

  private getWithFilter(filter: Filterable<Player>): Observable<Player[]> {
    return this.playersStore.selectPlayers().pipe(
      take(1),
      map((players) => new ArrayStream<Player>(players).filter(filter).collect())
    );
  }
}
