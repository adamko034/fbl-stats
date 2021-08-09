import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FirebaseService } from 'src/app/services/firebase.service';
import { FantasyTips } from 'src/app/store/tips/models/fantasy-tips.model';

@Injectable()
export class AdminFantasyTipsService {
  constructor(private firebaseService: FirebaseService) {}

  public save(tips: FantasyTips): Observable<void> {
    return this.firebaseService.saveFantasyTips(tips);
  }
}
