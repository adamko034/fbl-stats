import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { distinctUntilChanged, map, take } from 'rxjs/operators';
import { FilesService } from '../files.service';
import { LineupsSource, LineupsSourceProperty, Properties } from './properties.model';

@Injectable({ providedIn: 'root' })
export class PropertiesStore {
  private properties$ = new ReplaySubject<Properties>(1);
  private state: Properties;
  private lastUpdated$ = new ReplaySubject<Date>(1);

  constructor(private filesService: FilesService) {}

  // public update() {
  //   this.state = null;
  //   this.loadProperties();
  // }

  // public loadLastUpdated() {
  //   this.firebaseService
  //     .getLastUpdated()
  //     .pipe(takeUntil(this.destroyed$))
  //     .subscribe((lastUpdated) => {
  //       if (lastUpdated) {
  //         this.lastUpdated$.next(new Date(lastUpdated.date));
  //       }
  //     });
  // }
  public selectBudgetPlayerMaxPrice(): Observable<number> {
    return this.selectProperties().pipe(map((props) => props.budgetPlayerMaxPrice));
  }

  public selectPlayerMaxPrice(): Observable<number> {
    return this.selectProperties().pipe(map((properties) => properties.playerMaxPrice));
  }

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
    this.filesService
      .getJsonObject<Properties>('properties')
      .pipe(take(1))
      .subscribe((properties) => {
        this.state = { ...properties };
        this.properties$.next({ ...this.state });
      });
    // this.firebaseService
    //   .getProperties()
    //   .pipe(takeUntil(this.destroyed$), distinctUntilChanged())
    //   .subscribe((properties) => {
    //     Logger.logDev('properties store service, properties loaded');
    //     this.state = { ...properties };
    //     this.properties$.next({ ...this.state });
    //   });
  }
}
