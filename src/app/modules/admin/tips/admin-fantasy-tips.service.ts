import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FirebaseService } from 'src/app/services/firebase.service';
import { MatchdaysTipsLinks } from 'src/app/store/matchday-tips/links/models/matchday-tips-links.model';

@Injectable()
export class AdminFantasyTipsService {
  constructor(private firebaseService: FirebaseService) {}

  public save(tips: MatchdaysTipsLinks): Observable<void> {
    return this.firebaseService.saveFantasyTips(tips);
  }
}
