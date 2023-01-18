import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Filterable } from 'src/app/modules/core/shared/filterable/filterable';
import { ArrayStream } from 'src/app/services/array-stream.service';
import { Player } from 'src/app/store/players/models/player.model';
import { PlayersStore } from 'src/app/store/players/players.store';
import { PlayersOnSaleFilter } from '../../overall/filters/players-on-sale.filter';
import { PlayersReturningFilter } from '../../overall/filters/players-returning.filter';
import { PlayersSuspensionRiskFilter } from '../../overall/filters/players-suspension-risk.filter';
import { PlayersUnavailableFilter } from '../../overall/filters/players-unavailable.filter';

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

  public getOnSale(): Observable<Player[]> {
    return this.getWithFilter(new PlayersOnSaleFilter());
  }

  private getWithFilter(filter: Filterable<Player>): Observable<Player[]> {
    return this.playersStore.selectPlayers().pipe(
      take(1),
      map((players) => new ArrayStream<Player>(players).filter(filter).collect())
    );
  }
}
