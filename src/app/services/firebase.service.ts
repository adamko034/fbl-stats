import { Injectable } from '@angular/core';
import { AngularFirestore, Query } from '@angular/fire/compat/firestore';
import { from, Observable } from 'rxjs';
import { catchError, first, map } from 'rxjs/operators';
import { ErrorService } from 'src/app/services/error.service';
import { CompareBestGks } from '../store/compare/models/compare-best-gks.model';
import { MatchdaysTipsLinks } from '../store/matchday-tips/links/models/matchday-tips-links.model';
import { MatchdayTipsOurPick } from '../store/matchday-tips/our-picks/models/matchday-tips-our-picks.model';
import { Logger } from '../utils/logger';

@Injectable({ providedIn: 'root' })
export class FirebaseService {
  constructor(private firestore: AngularFirestore, private errorService: ErrorService) {}

  public getOurPicks(matchday: number, onlyPublished: boolean): Observable<MatchdayTipsOurPick> {
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

  public getCompare(): Observable<any> {
    Logger.logDev('firebase service, loading compare state');
    return this.firestore.collection('compare').doc('general').valueChanges().pipe(first());
  }

  public saveMatchdayTipsLink(links: MatchdaysTipsLinks): Observable<void> {
    return from(this.firestore.collection('tips').doc(links.matchday.toString()).set(links));
  }

  public saveCompareBestGks(bestGks: CompareBestGks) {
    return from(this.firestore.collection('compare').doc('general').set({ bestGks: bestGks }, { merge: true }));
  }
}
