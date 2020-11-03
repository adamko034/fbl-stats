import { Injectable } from '@angular/core';
import { Observable, ReplaySubject, Subscription } from 'rxjs';
import { PlayerPosition } from 'src/app/layout/content/models/players-filters';
import { PlayersState } from 'src/app/layout/content/models/players-state.model';
import { Player } from 'src/app/models/player.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Logger } from 'src/app/utils/logger';

@Injectable({ providedIn: 'root' })
export class StoreService {
  private state: PlayersState = {};
  private players$: ReplaySubject<PlayersState> = new ReplaySubject(1);

  private firebaseGoalkeepersSubscription$: Subscription;
  private firebaseDefendersSubscription$: Subscription;
  private firebaseMidfieldersSubscription$: Subscription;
  private firebaseForwardsSubscription$: Subscription;

  constructor(private firebaseService: FirebaseService) {}

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
    if (!this.firebaseMidfieldersSubscription$) {
      Logger.logDev('store service, createing firebase midfielders subscription');
      this.firebaseMidfieldersSubscription$ = this.firebaseService
        .getMidfielders()
        .subscribe((midfielders: Player[]) => {
          this.state.midfielders = midfielders;
          this.players$.next({ ...this.state });
        });
    }
  }

  private loadForwards(): void {
    if (!this.firebaseForwardsSubscription$) {
      Logger.logDev('store service, createing firebase forwards subscription');
      this.firebaseForwardsSubscription$ = this.firebaseService.getForwards().subscribe((forwards: Player[]) => {
        this.state.forwards = forwards;
        this.players$.next({ ...this.state });
      });
    }
  }

  private loadGoalkeepers() {
    if (!this.firebaseGoalkeepersSubscription$) {
      Logger.logDev('store service, creating firebase goalkeepers subscription');
      this.firebaseGoalkeepersSubscription$ = this.firebaseService
        .getGoalkeepers()
        .subscribe((goalkeepers: Player[]) => {
          this.state.goalkeepers = goalkeepers;
          this.players$.next({ ...this.state });
        });
    }
  }

  private loadDefenders() {
    if (!this.firebaseDefendersSubscription$) {
      Logger.logDev('store service, creating firebase defenders subscription');
      this.firebaseDefendersSubscription$ = this.firebaseService.getDefenders().subscribe((defenders: Player[]) => {
        this.state.defenders = defenders;
        this.players$.next({ ...this.state });
      });
    }
  }

  public selectPlayers(): Observable<PlayersState> {
    return this.players$.asObservable();
  }

  public close(): void {
    if (this.firebaseMidfieldersSubscription$) {
      this.firebaseMidfieldersSubscription$.unsubscribe();
      this.firebaseMidfieldersSubscription$ = null;
    }

    if (this.firebaseForwardsSubscription$) {
      this.firebaseForwardsSubscription$.unsubscribe();
      this.firebaseForwardsSubscription$ = null;
    }

    if (this.firebaseDefendersSubscription$) {
      this.firebaseDefendersSubscription$.unsubscribe();
      this.firebaseDefendersSubscription$ = null;
    }

    if (this.firebaseGoalkeepersSubscription$) {
      this.firebaseGoalkeepersSubscription$.unsubscribe();
      this.firebaseGoalkeepersSubscription$ = null;
    }
  }
}
