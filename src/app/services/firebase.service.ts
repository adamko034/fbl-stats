import { Injectable } from '@angular/core';
import { AngularFirestore, Query } from '@angular/fire/firestore';
import { from, Observable } from 'rxjs';
import { catchError, first, map } from 'rxjs/operators';
import { ErrorService } from 'src/app/services/error.service';
import { OurPicks } from '../store/our-picks/models/our-picks.model';
import { FantasyTips } from '../store/tips/models/fantasy-tips.model';
import { Logger } from '../utils/logger';

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

  public getFantasyTips(matchday: number): Observable<any> {
    Logger.logDev(`firebase service, loading fantasy tips from firebase for doc ${matchday}`);
    return this.firestore.collection('tips').doc(matchday.toString()).valueChanges().pipe(first());
  }

  public saveFantasyTips(tips: FantasyTips): Observable<void> {
    return from(this.firestore.collection('tips').doc(tips.matchday.toString()).set(tips));
  }
}
