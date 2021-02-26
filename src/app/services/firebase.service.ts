import { Injectable } from '@angular/core';
import { AngularFirestore, Query, QueryFn } from '@angular/fire/firestore';
import { from, Observable, of } from 'rxjs';
import { catchError, first, flatMap, map, take, tap } from 'rxjs/operators';
import { LastUpdated } from 'src/app/models/last-updated.model';
import { Properties } from 'src/app/models/properties.model';
import { ErrorService } from 'src/app/services/error.service';
import { environment } from 'src/environments/environment';
import { OurPicks } from '../store/our-picks/models/our-picks.model';
import { firestore } from 'firebase/app';

@Injectable({ providedIn: 'root' })
export class FirebaseService {
  constructor(private firestore: AngularFirestore, private errorService: ErrorService) {}

  public getProperties(): Observable<Properties> {
    return this.firestore
      .collection('properties')
      .doc<Properties>('general')
      .valueChanges()
      .pipe(
        take(1),
        catchError(() => {
          this.errorService.sendFirebaseError();
          return [];
        })
      );
  }

  public getLastUpdated(): Observable<LastUpdated> {
    const doc = environment.production ? 'last-updated' : 'last-updated-dev';
    return this.firestore
      .collection('properties')
      .doc<LastUpdated>(doc)
      .valueChanges()
      .pipe(
        catchError(() => {
          this.errorService.sendFirebaseError();
          return [];
        })
      );
  }

  public getOurPicks(matchday: number, onlyPublished: boolean): Observable<OurPicks> {
    return this.firestore
      .collection('our-picks', (ref) => {
        let query: Query = ref.where('matchday', '==', matchday);

        if (onlyPublished) {
          query = query.where('published', '==', true);
        }

        return query.limit(1);
      })
      .valueChanges()
      .pipe(
        first(),
        map((ourPicks) => (!!ourPicks && ourPicks.length === 1 ? ourPicks[0] : {})),
        catchError(() => {
          this.errorService.sendFirebaseError();
          return [];
        })
      );
  }

  public addOurPick(playerId: number, matchday: number): void {
    this.firestore
      .collection('our-picks')
      .doc(matchday.toString())
      .set(
        { players: firestore.FieldValue.arrayUnion({ order: 1, playerId }), published: false, matchday: matchday },
        { merge: true }
      );
  }

  public saveOurPicks(ourPicks: OurPicks): Observable<void> {
    return from(this.firestore.collection('our-picks').doc(ourPicks.matchday.toString()).set(ourPicks));
  }

  public publishOurPicks(matchday: number): Observable<void> {
    return from(
      this.firestore.collection('our-picks').doc(matchday.toString()).set({ published: true }, { merge: true })
    );
  }
}
