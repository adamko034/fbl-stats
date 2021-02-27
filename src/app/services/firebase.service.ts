import { Injectable } from '@angular/core';
import { AngularFirestore, Query } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { catchError, first, map, take } from 'rxjs/operators';
import { LastUpdated } from 'src/app/models/last-updated.model';
import { Properties } from 'src/app/models/properties.model';
import { ErrorService } from 'src/app/services/error.service';
import { environment } from 'src/environments/environment';
import { OurPicks } from '../store/our-picks/models/our-picks.model';

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
}
