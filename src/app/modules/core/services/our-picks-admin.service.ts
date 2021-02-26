import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FirebaseService } from 'src/app/services/firebase.service';
import { OurPicks } from 'src/app/store/our-picks/models/our-picks.model';

@Injectable({ providedIn: 'root' })
export class OurPicksAdminService {
  constructor(private firebaseService: FirebaseService) {}

  public insert(playerId: number, matchday: number): void {
    this.firebaseService.addOurPick(playerId, matchday);
  }

  public save(ourPicks: OurPicks): Observable<void> {
    return this.firebaseService.saveOurPicks(ourPicks);
  }

  public publish(matchday: number): Observable<void> {
    return this.firebaseService.publishOurPicks(matchday);
  }
}
