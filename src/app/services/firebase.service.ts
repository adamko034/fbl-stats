import { Injectable } from '@angular/core';
import { AngularFirestore, Query } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { catchError, first, map } from 'rxjs/operators';
import { ErrorService } from 'src/app/services/error.service';
import { OurPicks } from '../store/our-picks/models/our-picks.model';

@Injectable({ providedIn: 'root' })
export class FirebaseService {
  constructor(private firestore: AngularFirestore, private errorService: ErrorService) {}

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
