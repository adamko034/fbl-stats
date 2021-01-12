import { Injectable } from '@angular/core';
import { Observable, ReplaySubject, Subject } from 'rxjs';
import { distinctUntilChanged, map, takeUntil } from 'rxjs/operators';
import { LineupsSource, LineupsSourceProperty, Properties } from 'src/app/models/properties.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Logger } from 'src/app/utils/logger';

@Injectable({ providedIn: 'root' })
export class PropertiesService {
  private properties$ = new ReplaySubject<Properties>(1);
  private destroyed$ = new Subject<void>();
  private state: Properties;
  private lastUpdated$ = new ReplaySubject<Date>(1);

  constructor(private firebaseService: FirebaseService) {}

  public update() {
    this.state = null;
    this.loadProperties();
  }

  public loadLastUpdated() {
    this.firebaseService
      .getLastUpdated()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((lastUpdated) => {
        if (lastUpdated) {
          this.lastUpdated$.next(new Date(lastUpdated.date));
        }
      });
  }

  public selectPlayerMaxPrice(): Observable<number> {
    return this.selectProperties().pipe(map((properties) => properties.playerMaxPrice));
  }

  // public selectTeams(): Observable<TeamProperty[]> {
  //   return this.selectProperties().pipe(map((properties) => properties.teams));
  // }

  public selectLastMatchday(): Observable<number> {
    return this.selectProperties().pipe(
      map((properties) => properties.lastMatchday),
      distinctUntilChanged()
    );
  }

  public selectLastUpdated(): Observable<Date> {
    return this.lastUpdated$.asObservable();
  }

  public selectLineupSources(source: LineupsSource): Observable<LineupsSourceProperty> {
    return this.selectProperties().pipe(map((properties) => properties.lineupSources[source]));
  }

  private selectProperties(): Observable<Properties> {
    return this.properties$.asObservable();
  }

  public loadProperties() {
    this.firebaseService
      .getProperties()
      .pipe(takeUntil(this.destroyed$), distinctUntilChanged())
      .subscribe((properties) => {
        Logger.logDev('properties store service, properties loaded');
        this.state = { ...properties };
        this.properties$.next({ ...this.state });
      });
  }
}
