import { Injectable } from '@angular/core';
import { Observable, ReplaySubject, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Player } from 'src/app/models/player.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Logger } from 'src/app/utils/logger';

@Injectable({ providedIn: 'root' })
export class StoreService {
  private goalkeepers$: ReplaySubject<Player[]> = new ReplaySubject(1);
  private firebaseGoalkeepersSubscription$: Subscription;

  private defenders$: ReplaySubject<Player[]> = new ReplaySubject(1);
  private firebaseDefendersSubscription$: Subscription;

  private midfielders$: ReplaySubject<Player[]> = new ReplaySubject(1);
  private firebaseMidfieldersSubscription$: Subscription;

  private forwards$: ReplaySubject<Player[]> = new ReplaySubject(1);
  private firebaseForwardsSubscription$: Subscription;

  constructor(private firebaseService: FirebaseService) {}

  public loadMidfielders(): void {
    if (!this.firebaseMidfieldersSubscription$) {
      Logger.logDev('store service, createing firebase midfielders subscription');
      this.firebaseMidfieldersSubscription$ = this.firebaseService
        .getMidfielders()
        .pipe(
          tap((players: Player[]) =>
            Logger.logDev('store service, midfelders subscription new players ' + players.length)
          )
        )
        .subscribe((players: Player[]) => this.midfielders$.next(players));
    }
  }

  public loadForwards(): void {
    if (!this.firebaseForwardsSubscription$) {
      Logger.logDev('store service, createing firebase forwards subscription');
      this.firebaseForwardsSubscription$ = this.firebaseService
        .getForwards()
        .pipe(
          tap((players: Player[]) =>
            Logger.logDev('store service, forwards subscription new players ' + players.length)
          )
        )
        .subscribe((players: Player[]) => this.forwards$.next(players));
    }
  }

  public loadGoalkeepers() {
    if (!this.firebaseGoalkeepersSubscription$) {
      Logger.logDev('store service, creating firebase goalkeepers subscription');
      this.firebaseGoalkeepersSubscription$ = this.firebaseService
        .getGoalkeepers()
        .pipe(
          tap((players: Player[]) =>
            Logger.logDev('store service, goalkeepers subscriptions new value ' + players.length)
          )
        )
        .subscribe((players: Player[]) => this.goalkeepers$.next(players));
    }
  }

  public loadDefenders() {
    if (!this.firebaseDefendersSubscription$) {
      Logger.logDev('store service, creating firebase defenders subscription');
      this.firebaseDefendersSubscription$ = this.firebaseService
        .getDefenders()
        .pipe(
          tap((players: Player[]) =>
            Logger.logDev('store service, defenders subscriptions new value ' + players.length)
          )
        )
        .subscribe((players: Player[]) => this.defenders$.next(players));
    }
  }

  public selectMidfielders(): Observable<Player[]> {
    return this.midfielders$.asObservable();
  }

  public selectForwards(): Observable<Player[]> {
    return this.forwards$.asObservable();
  }

  public selectDefenders(): Observable<Player[]> {
    return this.defenders$.asObservable();
  }

  public selectGoalkeepers(): Observable<Player[]> {
    return this.goalkeepers$.asObservable();
  }

  public close(): void {
    if (this.firebaseMidfieldersSubscription$) {
      Logger.logDev('store service, closing firebase midfielders subscription');
      this.firebaseMidfieldersSubscription$.unsubscribe();
      this.firebaseMidfieldersSubscription$ = null;
    }

    if (this.firebaseForwardsSubscription$) {
      Logger.logDev('store service, closing firebase forwards subscription');
      this.firebaseForwardsSubscription$.unsubscribe();
      this.firebaseForwardsSubscription$ = null;
    }

    if (this.firebaseDefendersSubscription$) {
      Logger.logDev('store service, closing firebase defenders subscription');
      this.firebaseDefendersSubscription$.unsubscribe();
      this.firebaseDefendersSubscription$ = null;
    }

    if (this.firebaseGoalkeepersSubscription$) {
      Logger.logDev('store service, closing firebase goalkeepers subscription');
      this.firebaseGoalkeepersSubscription$.unsubscribe();
      this.firebaseGoalkeepersSubscription$ = null;
    }
  }
}
