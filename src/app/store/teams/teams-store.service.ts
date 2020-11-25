import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Team } from 'src/app/store/teams/models/team.model';
import { Logger } from 'src/app/utils/logger';

interface TeamsState {
  [key: string]: Team;
}

@Injectable({ providedIn: 'root' })
export class TeamsStoreService {
  private state: TeamsState = {};
  private state$ = new ReplaySubject<TeamsState>(1);

  constructor(private firebaseService: FirebaseService) {}

  public load(teamShort: string): void {
    this.firebaseService.getTeam(teamShort).subscribe((team: Team) => {
      Logger.logDev('teams store service, loaded team ' + team.shortName);
      this.state[teamShort] = team;
      this.send();
    });
  }

  public select(teamShort: string): Observable<Team> {
    return this.state$.asObservable().pipe(map((s) => s[teamShort]));
  }

  public update(): void {
    for (const teamShort in this.state) {
      if (Object.prototype.hasOwnProperty.call(this.state, teamShort)) {
        this.load(teamShort);
      }
    }
  }

  private send(): void {
    this.state$.next({ ...this.state });
  }
}
