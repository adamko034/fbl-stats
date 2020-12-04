import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, ReplaySubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { PlayerPosition } from 'src/app/layout/content/models/players-filters';
import { Player } from 'src/app/models/player.model';
import { LoadingService } from 'src/app/services/loading.service';
import { IPlayersStore } from 'src/app/store/players/impl/players-store.interface';
import { PlayersFilesStoreService } from 'src/app/store/players/impl/players.files-store';
import { PlayersFirebaseStoreService } from 'src/app/store/players/impl/players.firebase-store';
import { PlayersState } from 'src/app/store/players/players-state.model';
import { StoreSourceDeciderService } from 'src/app/store/utils/store-source-decider.service';
import { Logger } from 'src/app/utils/logger';

@Injectable({ providedIn: 'root' })
export class PlayersStore {
  private destroyed$: Subject<void> = new Subject<void>();
  private state: PlayersState = {};
  private players$: ReplaySubject<PlayersState> = new ReplaySubject(1);

  private firebaseStore: IPlayersStore;
  private filesStore: IPlayersStore;

  constructor(
    private firestore: AngularFirestore,
    private http: HttpClient,
    private loadingService: LoadingService,
    private storeSourceDecider: StoreSourceDeciderService
  ) {}

  public update(position: PlayerPosition) {
    this.state = {};
    this.loadByPosition(position);
  }

  public loadAll(): void {
    Logger.logDev('players store, loading all players');
    const store = this.getStore();

    this.loadGoalkeepers(store);
    this.loadDefenders(store);
    this.loadMidfielders(store);
    this.loadForwards(store);
  }

  public loadByPosition(position: PlayerPosition): void {
    Logger.logDev('players store, loading players by position');
    const store = this.getStore();
    if (position) {
      switch (position) {
        case PlayerPosition.GK: {
          this.loadGoalkeepers(store);
          return;
        }
        case PlayerPosition.DEF: {
          this.loadDefenders(store);
          return;
        }
        case PlayerPosition.MID: {
          this.loadMidfielders(store);
          return;
        }
        default:
          this.loadForwards(store);
      }
    }
  }

  private loadMidfielders(store: IPlayersStore): void {
    if (!this.state.midfielders) {
      this.loadingService.startLoading('players-midfielders');
      store
        .loadMidfielders()
        .pipe(takeUntil(this.destroyed$))
        .subscribe((midfielders: Player[]) => {
          this.loadingService.endLoading('players-midfielders');
          this.state.midfielders = midfielders;
          this.players$.next({ ...this.state });
        });
    }
  }

  private loadForwards(store: IPlayersStore): void {
    if (!this.state.forwards) {
      this.loadingService.startLoading('players-forwards');
      store
        .loadForwards()
        .pipe(takeUntil(this.destroyed$))
        .subscribe((forwards: Player[]) => {
          this.loadingService.endLoading('players-forwards');
          this.state.forwards = forwards;
          this.players$.next({ ...this.state });
        });
    }
  }

  private loadGoalkeepers(store: IPlayersStore) {
    if (!this.state.goalkeepers) {
      this.loadingService.startLoading('players-goalkeepers');
      store
        .loadGoalkeepers()
        .pipe(takeUntil(this.destroyed$))
        .subscribe((goalkeepers: Player[]) => {
          this.loadingService.endLoading('players-goalkeepers');
          this.state.goalkeepers = goalkeepers;
          this.players$.next({ ...this.state });
        });
    }
  }

  private loadDefenders(store: IPlayersStore) {
    if (!this.state.defenders) {
      this.loadingService.startLoading('players-defenders');
      store
        .loadDefenders()
        .pipe(takeUntil(this.destroyed$))
        .subscribe((defenders: Player[]) => {
          this.loadingService.endLoading('players-defenders');
          this.state.defenders = defenders;
          this.players$.next({ ...this.state });
        });
    }
  }

  public selectPlayers(): Observable<PlayersState> {
    return this.players$.asObservable();
  }

  public close(): void {
    this.destroyed$.next();
  }

  private getStore(): IPlayersStore {
    const isFirebase = this.storeSourceDecider.isFirebase();

    if (isFirebase) {
      if (!this.firebaseStore) {
        this.firebaseStore = new PlayersFirebaseStoreService(this.firestore);
      }

      return this.firebaseStore;
    }

    if (!this.filesStore) {
      this.filesStore = new PlayersFilesStoreService(this.http);
    }

    return this.filesStore;
  }
}
