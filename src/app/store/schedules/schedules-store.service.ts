import { Injectable } from '@angular/core';
import { Observable, ReplaySubject, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { FirebaseService } from 'src/app/services/firebase.service';
import { TeamSchedule } from 'src/app/store/schedules/models/team-schedule.model';
import { Logger } from 'src/app/utils/logger';

interface SchedulesState {
  [key: string]: TeamSchedule;
}

@Injectable({ providedIn: 'root' })
export class SchedulesStoreService {
  private state: SchedulesState = {};
  private state$ = new ReplaySubject<SchedulesState>(1);

  private subscription: Subscription;

  constructor(private firebaseService: FirebaseService) {
    this.send();
  }

  public select(teamShort: string): Observable<TeamSchedule> {
    if (!this.state[teamShort]) {
      this.load(teamShort);
    }

    return this.state$.asObservable().pipe(map((s) => s[teamShort]));
  }

  public update(): void {
    for (const teamShort in this.state) {
      if (Object.prototype.hasOwnProperty.call(this.state, teamShort)) {
        this.load(teamShort);
      }
    }
  }

  private load(teamShort: string): void {
    if (!!this.subscription) {
      this.subscription.unsubscribe();
    }

    this.subscription = this.firebaseService.getTeamSchedules(teamShort).subscribe((schedules: TeamSchedule) => {
      Logger.logDev('schedules store service, loaded schedules for ' + schedules.teamShort);
      this.state[teamShort] = schedules;
      this.send();
    });
  }

  private send(): void {
    this.state$.next({ ...this.state });
  }
}
