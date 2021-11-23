import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { firestore } from 'firebase/app';
import { from, Observable } from 'rxjs';
import { MatchdayTipsOurPick } from 'src/app/store/matchday-tips/our-picks/models/matchday-tips-our-picks.model';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class OurPicksAdminService {
  constructor(private firestore: AngularFirestore) {}

  public insert(playerId: number, matchday: number): Observable<void> {
    return from(
      this.firestore
        .collection('our-picks')
        .doc(this.getDevProdMatchday(matchday).toString())
        .set(
          {
            players: firestore.FieldValue.arrayUnion({ order: 1, playerId }),
            published: false,
            matchday: this.getDevProdMatchday(matchday)
          },
          { merge: true }
        )
    );
  }

  public save(ourPicks: MatchdayTipsOurPick): Observable<void> {
    const matchday = this.getDevProdMatchday(ourPicks.matchday);
    return from(
      this.firestore
        .collection('our-picks')
        .doc(matchday.toString())
        .set({ ...ourPicks, matchday })
    );
  }

  public setPublish(value: boolean, matchday: number): Observable<void> {
    return from(
      this.firestore
        .collection('our-picks')
        .doc(this.getDevProdMatchday(matchday).toString())
        .set({ published: value }, { merge: true })
    );
  }

  private getDevProdMatchday(matchday: number): number {
    return environment.production ? matchday : 100;
  }
}
