import { Injectable } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { Observable, ReplaySubject } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';
import { PlayersDisplaySettings } from 'src/app/modules/core/players/models/players-display-settings.model';

@Injectable({ providedIn: 'root' })
export class PlayersDisplaySettingsService {
  private readonly STORAGE_KEY = 'Display';

  private settings: { [key: string]: PlayersDisplaySettings } = {};
  public settings$: { [key: string]: ReplaySubject<PlayersDisplaySettings> } = {};

  constructor() {}

  public registerPaginator(key: string, paginator: MatPaginator): void {
    this.settings[key] = { paginator, searchTerm: null };

    this.createSubjectIfNotExists(key);
    this.sendFor(key);
  }

  public select(key): Observable<PlayersDisplaySettings> {
    this.createSubjectIfNotExists(key);

    return this.settings$[key].pipe(distinctUntilChanged());
  }

  public updateSearchTerm(key: string, term: string): void {
    this.createSubjectIfNotExists(key);

    this.settings[key].searchTerm = term;
    this.sendFor(key);
  }

  private createSubjectIfNotExists(key: string): void {
    if (!this.settings$[key]) {
      this.settings$[key] = new ReplaySubject<PlayersDisplaySettings>(1);
    }
  }

  private sendFor(key: string): void {
    this.settings$[key].next({ ...this.settings[key] });
  }
}
