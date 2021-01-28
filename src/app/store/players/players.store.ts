import { Injectable } from '@angular/core';
import { Observable, ReplaySubject, Subject } from 'rxjs';
import { filter, map, take, takeUntil } from 'rxjs/operators';
import { Player } from 'src/app/store/players/models/player.model';
import { PlayersFilesStoreService } from 'src/app/store/players/services/players.files-store.service';
import { Logger } from 'src/app/utils/logger';

@Injectable({ providedIn: 'root' })
export class PlayersStore {
  private destroyed$: Subject<void> = new Subject<void>();
  private state: Player[] = [];
  private players$: ReplaySubject<Player[]> = new ReplaySubject(1);

  constructor(private playersFilesService: PlayersFilesStoreService) {}

  public loadAll(): void {
    Logger.logDev('players store, loading all players');

    this.loadGoalkeepers();
    this.loadDefenders();
    this.loadMidfielders();
    this.loadForwards();
  }

  private loadMidfielders(): void {
    this.playersFilesService
      .loadMidfielders()
      .pipe(take(1))
      .subscribe((midfielders: Player[]) => {
        this.state = this.state.concat(midfielders);
        this.players$.next([...this.state]);
      });
  }

  private loadForwards(): void {
    this.playersFilesService
      .loadForwards()
      .pipe(take(1))
      .subscribe((forwards: Player[]) => {
        this.state = this.state.concat(forwards);
        this.players$.next([...this.state]);
      });
  }

  private loadGoalkeepers() {
    this.playersFilesService
      .loadGoalkeepers()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((goalkeepers: Player[]) => {
        this.state = this.state.concat(goalkeepers);
        this.players$.next([...this.state]);
      });
  }

  private loadDefenders() {
    this.playersFilesService
      .loadDefenders()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((defenders: Player[]) => {
        this.state = this.state.concat(defenders);
        this.players$.next([...this.state]);
      });
  }

  public selectPlayers(): Observable<Player[]> {
    return this.players$.asObservable();
  }

  public selectAllByTeam(teamShort: string): Observable<Player[]> {
    return this.players$.pipe(
      map((players) => players.filter((p) => p.teamShort.toLocaleLowerCase() === teamShort.toLocaleLowerCase()))
    );
  }

  public searchPlayers(term: string): Observable<Player[]> {
    return this.players$.pipe(
      filter(() => !!term),
      map((players) => {
        return players
          .filter((p) => p.name.replace(' ', '').toLowerCase().includes(term.replace(' ', '').toLowerCase()))
          .slice(0, 20);
      })
    );
  }

  public getById(id: string): Player {
    return this.state.find((p) => p.id.toString() === id.toString());
  }

  public close(): void {
    this.destroyed$.next();
  }
}
