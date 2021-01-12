import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { catchError, map, take } from 'rxjs/operators';
import { LastUpdated } from 'src/app/models/last-updated.model';
import { Properties } from 'src/app/models/properties.model';
import { ErrorService } from 'src/app/services/error.service';
import { Team } from 'src/app/store/teams/models/team.model';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class FirebaseService {
  constructor(private firestore: AngularFirestore, private errorService: ErrorService) {}

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
    const doc = environment.production ? 'last-updated' : 'last-updated-dev';
    return this.firestore
      .collection('properties')
      .doc<LastUpdated>(doc)
      .valueChanges()
      .pipe(
        catchError(() => {
          this.errorService.sendFirebaseError();
          return [];
        })
      );
  }

  public getTeam(teamShort: string): Observable<Team> {
    return this.firestore
      .collection('teams')
      .doc<Team>(teamShort)
      .valueChanges()
      .pipe(
        take(1),
        map((s) => ({ ...s, shortName: teamShort }))
      );
  }
}
