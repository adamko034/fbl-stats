import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { FirebaseService } from 'src/app/services/firebase.service';
import { SmartSelectionTeam } from 'src/app/store/teams-smart-selection/models/smart-selection-team.model';
import { Logger } from 'src/app/utils/logger';

@Injectable({ providedIn: 'root' })
export class SmartSelectionTeamsStore {
  private state$: ReplaySubject<SmartSelectionTeam[]>;

  constructor(private firebaseService: FirebaseService) {}

  public select(): Observable<SmartSelectionTeam[]> {
    if (!this.state$) {
      this.state$ = new ReplaySubject<SmartSelectionTeam[]>(1);
      Logger.logDev('smart selection teams store, loading from firebase');
      this.firebaseService.getSmartSelectionsTeams().subscribe((smartSelections) => this.state$.next(smartSelections));
    }

    return this.state$.asObservable();
  }
}
