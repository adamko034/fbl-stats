import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Player } from 'src/app/models/player.model';
import { Properties } from 'src/app/models/properties.model';
import { ErrorService } from 'src/app/services/error.service';

@Injectable({ providedIn: 'root' })
export class FirebaseService {
  private readonly midfieldersCollection = 'midfielders';
  private readonly forwardsCollection = 'forwards';
  private readonly defendersCollection = 'defenders';
  private readonly goalkeepersCollection = 'goalkeepers';

  constructor(private firestore: AngularFirestore, private errorService: ErrorService) {}

  public getMidfielders(): Observable<Player[]> {
    return this.firestore
      .collection<Player>(this.midfieldersCollection)
      .valueChanges()
      .pipe(
        catchError(() => {
          this.errorService.sendFirebaseError();
          return [];
        })
      );
  }

  public getForwards(): Observable<Player[]> {
    return this.firestore
      .collection<Player>(this.forwardsCollection)
      .valueChanges()
      .pipe(
        catchError(() => {
          this.errorService.sendFirebaseError();
          return [];
        })
      );
  }

  public getDefenders(): Observable<Player[]> {
    return this.firestore
      .collection<Player>(this.defendersCollection)
      .valueChanges()
      .pipe(
        catchError(() => {
          this.errorService.sendFirebaseError();
          return [];
        })
      );
  }

  public getGoalkeepers(): Observable<Player[]> {
    return this.firestore
      .collection<Player>(this.goalkeepersCollection)
      .valueChanges()
      .pipe(
        catchError(() => {
          this.errorService.sendFirebaseError();
          return [];
        })
      );
  }

  public getProperties(): Observable<Properties> {
    return this.firestore
      .collection('properties')
      .doc<Properties>('general')
      .valueChanges()
      .pipe(
        catchError(() => {
          this.errorService.sendFirebaseError();
          return [];
        })
      );
  }
}
