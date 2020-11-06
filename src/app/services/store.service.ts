import { Injectable } from '@angular/core';
import { Observable, ReplaySubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { PlayerPosition } from 'src/app/layout/content/models/players-filters';
import { PlayersState } from 'src/app/layout/content/models/players-state.model';
import { Player } from 'src/app/models/player.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { LoadingService } from 'src/app/services/loading.service';

@Injectable({ providedIn: 'root' })
export class StoreService {
  constructor(private firebaseService: FirebaseService, private loadingService: LoadingService) {}
  private destroyed$: Subject<void> = new Subject<void>();
  private state: PlayersState = {};
  private players$: ReplaySubject<PlayersState> = new ReplaySubject(1);

  public update(position: PlayerPosition) {
    this.state = {};
    this.loadByPosition(position);
  }

  public loadByPosition(position: PlayerPosition): void {
    if (position) {
      switch (position) {
        case PlayerPosition.GK: {
          this.loadGoalkeepers();
          return;
        }
        case PlayerPosition.DEF: {
          this.loadDefenders();
          return;
        }
        case PlayerPosition.MID: {
          this.loadMidfielders();
          return;
        }
        default:
          this.loadForwards();
      }
    }
  }

  private loadMidfielders(): void {
    if (!this.state.midfielders) {
      this.loadingService.startLoadingPlayers();
      this.firebaseService
        .getMidfielders()
        .pipe(takeUntil(this.destroyed$))
        .subscribe((midfielders: Player[]) => {
          this.loadingService.endLoadingPlayers();
          this.state.midfielders = midfielders;
          this.players$.next({ ...this.state });
        });
    }
  }

  private loadForwards(): void {
    if (!this.state.forwards) {
      this.loadingService.startLoadingPlayers();
      this.firebaseService
        .getForwards()
        .pipe(takeUntil(this.destroyed$))
        .subscribe((forwards: Player[]) => {
          this.loadingService.endLoadingPlayers();
          this.state.forwards = forwards;
          this.players$.next({ ...this.state });
        });
    }
  }

  private loadGoalkeepers() {
    if (!this.state.goalkeepers) {
      this.loadingService.startLoadingPlayers();
      this.firebaseService
        .getGoalkeepers()
        .pipe(takeUntil(this.destroyed$))
        .subscribe((goalkeepers: Player[]) => {
          this.loadingService.endLoadingPlayers();
          this.state.goalkeepers = goalkeepers;
          this.players$.next({ ...this.state });
        });
    }
  }

  private loadDefenders() {
    if (!this.state.defenders) {
      this.loadingService.startLoadingPlayers();
      this.firebaseService
        .getDefenders()
        .pipe(takeUntil(this.destroyed$))
        .subscribe((defenders: Player[]) => {
          this.loadingService.endLoadingPlayers();
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
}
