import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';
import { MyTeamPlayerConverter } from 'src/app/modules/fantasy/my-team/converters/my-team-player.converter';
import { MyTeamPlayer } from 'src/app/modules/fantasy/my-team/models/my-team-player.model';
import { Player } from 'src/app/store/players/models/player.model';
import { PlayersStore } from 'src/app/store/players/players.store';
import { GuiConfigStore } from '../../gui-config/gui-config.store';

@Injectable({ providedIn: 'root' })
export class MyTeamStore {
  private players: Player[] = [];
  private players$ = new ReplaySubject<Player[]>(1);

  constructor(
    private guiConfigStore: GuiConfigStore,
    private playersStore: PlayersStore,
    private myTeamPlayerConverter: MyTeamPlayerConverter
  ) {
    this.guiConfigStore.selectMyTeamPlayerIds().subscribe((playerIds) => {
      if (!!playerIds) {
        const playersFromStore: Player[] = [];
        playerIds.forEach((id) => playersFromStore.push(this.playersStore.getById(id)));

        this.players = [...playersFromStore];
      }

      this.send();
    });
  }

  public selectMyTeamPlayers(): Observable<MyTeamPlayer[]> {
    return this.select().pipe(map((players) => this.myTeamPlayerConverter.convert(players)));
  }

  public select(): Observable<Player[]> {
    return this.players$.pipe();
  }

  public selectPlayersId(): Observable<string[]> {
    return this.selectMyTeamPlayers().pipe(
      map((p) => p.map((mt) => mt.id)),
      distinctUntilChanged()
    );
  }

  public searchPlayers(term: string): Observable<MyTeamPlayer[]> {
    return this.playersStore.searchPlayers(term).pipe(map((players) => this.myTeamPlayerConverter.convert(players)));
  }

  public add(playerId: string) {
    const player = this.playersStore.getById(playerId);
    this.players.push(player);

    this.store();
    this.send();
  }

  public remove(playerId: string) {
    this.players = this.players.filter((p) => p.id !== playerId);
    this.store();
    this.send();
  }

  public clear(): void {
    this.players = [];
    this.store();
    this.send();
  }

  private store(): void {
    this.guiConfigStore.changeMyTeamPlayerIds(this.players.map((p) => p.id));
  }

  private send() {
    this.players$.next([...this.players]);
  }
}
