import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { IPlayersStore } from 'src/app/store/players/impl/players-store.interface';
import { Player } from 'src/app/store/players/models/player.model';
import { Logger } from 'src/app/utils/logger';

@Injectable({ providedIn: 'root' })
export class PlayersFirebaseStoreService implements IPlayersStore {
  private readonly midfieldersCollection = 'midfielders';
  private readonly forwardsCollection = 'forwards';
  private readonly defendersCollection = 'defenders';
  private readonly goalkeepersCollection = 'goalkeepers';

  constructor(private firestore: AngularFirestore) {}

  public loadMidfielders(): Observable<Player[]> {
    Logger.logDev('players firebase store, loading midfielders from firebase');
    return this.firestore
      .collection<Player>(this.midfieldersCollection, (ref) => ref.where('disabled', '==', false))
      .valueChanges({ idField: 'id' })
      .pipe(take(1));
  }

  public loadForwards(): Observable<Player[]> {
    Logger.logDev('players firebase store, loading forwards from firebase');
    return this.firestore
      .collection<Player>(this.forwardsCollection, (ref) => ref.where('disabled', '==', false))
      .valueChanges({ idField: 'id' })
      .pipe(take(1));
  }

  public loadDefenders(): Observable<Player[]> {
    Logger.logDev('players firebase store, loading defenders from firebase');
    return this.firestore
      .collection<Player>(this.defendersCollection, (ref) => ref.where('disabled', '==', false))
      .valueChanges({ idField: 'id' })
      .pipe(take(1));
  }

  public loadGoalkeepers(): Observable<Player[]> {
    Logger.logDev('players firebase store, loading goalkeepers from firebase');
    return this.firestore
      .collection<Player>(this.goalkeepersCollection, (ref) => ref.where('disabled', '==', false))
      .valueChanges({ idField: 'id' })
      .pipe(take(1));
  }
}
