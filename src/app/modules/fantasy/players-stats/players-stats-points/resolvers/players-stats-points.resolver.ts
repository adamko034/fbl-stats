import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { PlayersStore } from 'src/app/store/players/players.store';
import { PlayersStatsPointsConverter } from '../converters/players-stats-points.converter';
import { PlayersStatsPointsPlayer } from '../models/players-stats-points-player.model';

@Injectable()
export class PlayersStatsPointsResolver implements Resolve<Observable<PlayersStatsPointsPlayer[]>> {
  constructor(private store: PlayersStore, private converter: PlayersStatsPointsConverter) {}

  public resolve(): Observable<PlayersStatsPointsPlayer[]> {
    return this.store.selectPlayers().pipe(
      map((players) => this.converter.convert(players)),
      first()
    );
  }
}
