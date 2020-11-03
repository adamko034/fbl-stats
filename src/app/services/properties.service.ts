import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Properties, TeamProperty } from 'src/app/models/properties.model';
import { FirebaseService } from 'src/app/services/firebase.service';

@Injectable({ providedIn: 'root' })
export class PropertiesService {
  private properties$: Observable<Properties>;

  constructor(private firebaseService: FirebaseService) {}

  public selectProperties(): Observable<Properties> {
    if (!this.properties$) {
      this.properties$ = this.firebaseService.getProperties();
    }

    return this.properties$;
  }

  public selectPlayerMaxPrice(): Observable<number> {
    return this.selectProperties().pipe(map((properties) => properties.playerMaxPrice));
  }

  public selectTeams(): Observable<TeamProperty[]> {
    return this.selectProperties().pipe(map((properties) => properties.teams));
  }

  public selectLastMatchday(): Observable<number> {
    return this.selectProperties().pipe(map((properties) => properties.lastMatchday));
  }
}
