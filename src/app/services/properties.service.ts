import { Injectable } from '@angular/core';
import { Observable, ReplaySubject, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { Properties, TeamProperty } from 'src/app/models/properties.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { StartupLoadingService } from 'src/app/services/startup-loading.service';
import { Logger } from 'src/app/utils/logger';

@Injectable({ providedIn: 'root' })
export class PropertiesService {
  private properties$ = new ReplaySubject<Properties>(1);
  private destroyed$ = new Subject<void>();
  private state: Properties;
  private lastUpdated$ = new Subject<Date>();
  private propertiesLoaded = false;

  constructor(private firebaseService: FirebaseService, private startupLoading: StartupLoadingService) {}

  public update() {
    this.state = null;
    this.propertiesLoaded = false;
    this.loadProperties();
  }

  public loadLastUpdated() {
    this.firebaseService
      .getLastUpdated()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((lastUpdated) => {
        this.lastUpdated$.next(new Date(lastUpdated.date));
        this.startupLoading.endLoadingLastUpdated();
      });
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

  public selectLastUpdated(): Observable<Date> {
    return this.lastUpdated$.asObservable();
  }

  private selectProperties(): Observable<Properties> {
    if (!this.propertiesLoaded) {
      this.loadProperties();
      this.propertiesLoaded = true;
    }

    return this.properties$.asObservable();
  }

  public loadProperties() {
    this.firebaseService
      .getProperties()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((properties) => {
        Logger.logDev('properties store service, properties loaded');
        this.state = { ...properties };
        this.properties$.next({ ...this.state });
        this.startupLoading.endLoadingProperties();
      });
  }
}
