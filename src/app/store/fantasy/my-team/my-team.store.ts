import { Injectable } from '@angular/core';
import { combineLatest, Observable, ReplaySubject } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { Player } from 'src/app/store/players/models/player.model';
import { PlayersStore } from 'src/app/store/players/players.store';
import { Logger } from 'src/app/utils/logger';
import { GuiConfigStore } from '../../gui-config/gui-config.store';

interface MyTeamStoreState {
  loaded: boolean;
  allPlayers: Player[];
  myTeamPlayers: Player[];
  kickOffTimesMatchdays: number;
}

@Injectable({ providedIn: 'root' })
export class MyTeamStore {
  private state: MyTeamStoreState = { loaded: false, kickOffTimesMatchdays: 3, myTeamPlayers: [], allPlayers: [] };
  private state$ = new ReplaySubject<MyTeamStoreState>(1);

  constructor(private guiConfigStore: GuiConfigStore, private playersStore: PlayersStore) {
    this.send();
  }

  public loaded(): Observable<boolean> {
    return this.state$.pipe(map((state) => state.loaded));
  }

  public load(): void {
    if (!this.state.loaded) {
      Logger.logDev('my team store, data not loaded, loading from local storage');
      combineLatest([
        this.playersStore.selectPlayers(),
        this.guiConfigStore.selectMyTeamPlayerIds(),
        this.guiConfigStore.selectMyTeamKickOffTimesMatchdays()
      ])
        .pipe(first())
        .subscribe(([allPlayers, myTeamPlayersIds, kickOffTimesMatchdays]) => {
          let myTeamPlayers = [];

          if (!!myTeamPlayersIds) {
            myTeamPlayersIds.forEach((id) => {
              const player = allPlayers.find((p) => p.id === id);
              if (player) {
                myTeamPlayers.push(player);
              }
            });
          }

          Logger.logDev(`my team store, loaded, players count ${myTeamPlayers.length}`);
          this.state = { loaded: true, allPlayers, myTeamPlayers, kickOffTimesMatchdays: kickOffTimesMatchdays ?? 3 };
          this.send();
        });
    }
  }

  public select(): Observable<{ players: Player[]; kickOffTimesMatchdays: number }> {
    return this.state$.pipe(
      map((state) => ({ players: state.myTeamPlayers, kickOffTimesMatchdays: state.kickOffTimesMatchdays }))
    );
  }

  public selectPlayers(): Observable<Player[]> {
    return this.state$.pipe(map((state) => state.myTeamPlayers));
  }

  public selectKickOffTimesMatchdays(): Observable<number> {
    return this.state$.pipe(map((state) => state.kickOffTimesMatchdays));
  }

  public add(playerId: string) {
    Logger.logDev(`my team store, adding player, player id: ${playerId}`);
    const player = this.state.allPlayers.find((p) => p.id.toString() === playerId);

    if (player) {
      Logger.logDev(`my team store, adding player, player name: ${player.name}`);
      this.state.myTeamPlayers = [...this.state.myTeamPlayers, player];
      this.store();
      this.send();
    }
  }

  public remove(playerId: string) {
    this.state.myTeamPlayers = [...this.state.myTeamPlayers.filter((p) => p.id.toString() !== playerId.toString())];
    this.store();
    this.send();
  }

  public clear(): void {
    this.state.myTeamPlayers = [];
    this.store();
    this.send();
  }

  public changeKickOffTimesMatchdays(matchdaysCount: number): void {
    this.state.kickOffTimesMatchdays = matchdaysCount;
    this.guiConfigStore.changeMyTeamKickOffMatchdays(matchdaysCount);
    this.send();
  }

  private store(): void {
    this.guiConfigStore.changeMyTeamPlayerIds(this.state.myTeamPlayers.map((p) => p.id));
  }

  private send() {
    this.state$.next({ ...this.state });
  }
}
