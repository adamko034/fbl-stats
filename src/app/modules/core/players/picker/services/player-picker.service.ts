import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PlayersStore } from 'src/app/store/players/players.store';
import { PlayerPicker } from '../models/player-picker.model';

@Injectable({ providedIn: 'root' })
export class PlayerPickerService {
  constructor(private store: PlayersStore) {}

  public search(term: string): Observable<PlayerPicker[]> {
    return this.store.searchPlayers(term).pipe(
      map((players) => {
        return players.map((p) => ({ id: p.id, name: p.name, teamShort: p.teamShort, position: p.position }));
      })
    );
  }
}
