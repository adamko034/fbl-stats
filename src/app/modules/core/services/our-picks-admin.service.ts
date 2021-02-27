import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { firestore } from 'firebase';
import { from, Observable } from 'rxjs';
import { ErrorService } from 'src/app/services/error.service';
import { OurPicks } from 'src/app/store/our-picks/models/our-picks.model';

@Injectable({ providedIn: 'root' })
export class OurPicksAdminService {
  constructor(private firestore: AngularFirestore, private errorService: ErrorService) {}

  public insert(playerId: number, matchday: number): void {
    this.firestore
      .collection('our-picks')
      .doc(matchday.toString())
      .set(
        { players: firestore.FieldValue.arrayUnion({ order: 1, playerId }), published: false, matchday: matchday },
        { merge: true }
      );
  }

  public save(ourPicks: OurPicks): Observable<void> {
    return from(this.firestore.collection('our-picks').doc(ourPicks.matchday.toString()).set(ourPicks));
  }

  public publish(matchday: number): Observable<void> {
    return from(
      this.firestore.collection('our-picks').doc(matchday.toString()).set({ published: true }, { merge: true })
    );
  }
}
