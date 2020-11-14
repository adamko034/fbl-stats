import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { catchError, map, take } from 'rxjs/operators';
import { LastUpdated } from 'src/app/models/last-updated.model';
import { Player } from 'src/app/models/player.model';
import { Properties } from 'src/app/models/properties.model';
import { ErrorService } from 'src/app/services/error.service';
import { TeamSchedule } from 'src/app/store/schedules/models/team-schedule.model';

@Injectable({ providedIn: 'root' })
export class FirebaseService {
  private readonly midfieldersCollection = 'midfielders';
  private readonly forwardsCollection = 'forwards';
  private readonly defendersCollection = 'defenders';
  private readonly goalkeepersCollection = 'goalkeepers';

  constructor(private firestore: AngularFirestore, private errorService: ErrorService) {}

  public getMidfielders(): Observable<Player[]> {
    return this.firestore
      .collection<Player>(this.midfieldersCollection)
      .valueChanges({ idField: 'id' })
      .pipe(
        take(1),
        catchError(() => {
          this.errorService.sendFirebaseError();
          return [];
        })
      );
  }

  public getForwards(): Observable<Player[]> {
    return this.firestore
      .collection<Player>(this.forwardsCollection)
      .valueChanges({ idField: 'id' })
      .pipe(
        take(1),
        catchError(() => {
          this.errorService.sendFirebaseError();
          return [];
        })
      );
  }

  public getDefenders(): Observable<Player[]> {
    return this.firestore
      .collection<Player>(this.defendersCollection)
      .valueChanges({ idField: 'id' })
      .pipe(
        take(1),
        catchError(() => {
          this.errorService.sendFirebaseError();
          return [];
        })
      );
  }

  public getGoalkeepers(): Observable<Player[]> {
    return this.firestore
      .collection<Player>(this.goalkeepersCollection)
      .valueChanges({ idField: 'id' })
      .pipe(
        take(1),
        catchError(() => {
          this.errorService.sendFirebaseError();
          return [];
        })
      );
  }

  public getProperties(): Observable<Properties> {
    return this.firestore
      .collection('properties')
      .doc<Properties>('general')
      .valueChanges()
      .pipe(
        take(1),
        catchError(() => {
          this.errorService.sendFirebaseError();
          return [];
        })
      );
  }

  public getLastUpdated(): Observable<LastUpdated> {
    return this.firestore
      .collection('properties')
      .doc<LastUpdated>('last-updated')
      .valueChanges()
      .pipe(
        catchError(() => {
          this.errorService.sendFirebaseError();
          return [];
        })
      );
  }

  public getTeamSchedules(teamShort: string): Observable<TeamSchedule> {
    return this.firestore
      .collection('schedules')
      .doc<TeamSchedule>(teamShort)
      .valueChanges()
      .pipe(
        take(1),
        map((s) => ({ ...s, teamShort }))
      );
  }
}
