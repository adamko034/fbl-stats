import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { distinctUntilChanged, map, take } from 'rxjs/operators';
import { FilesService } from '../files.service';
import {
  LineupsSource,
  LineupsSourceProperty,
  Properties,
  TeamNavigation,
  UnlimitedTransfers
} from './properties.model';

@Injectable({ providedIn: 'root' })
export class PropertiesStore {
  private properties$ = new ReplaySubject<Properties>(1);
  private state: Properties;

  constructor(private filesService: FilesService) {}

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

  public selectLastKnownMatchday(): Observable<number> {
    return this.selectProperties().pipe(
      map((properties) => properties.lastKnownMatchday),
      distinctUntilChanged()
    );
  }

  public selectLastUpdated(): Observable<Date> {
    return this.selectProperties().pipe(map((props) => props.lastUpdated));
  }

  public selectLineupSources(source: LineupsSource): Observable<LineupsSourceProperty> {
    return this.selectProperties().pipe(map((properties) => properties.lineupSources[source]));
  }

  public selectTeamsNavigation(): Observable<TeamNavigation[]> {
    return this.selectProperties().pipe(map((props) => props.teamsNavigation));
  }

  public selectUnlimitedTransfers(): Observable<UnlimitedTransfers> {
    return this.selectProperties().pipe(map((props) => props.unlimitedTransfers));
  }

  public selectProperties(): Observable<Properties> {
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
  }
}
