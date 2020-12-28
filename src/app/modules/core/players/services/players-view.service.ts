import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';
import { PlayersView } from 'src/app/modules/core/players/models/players-view.enum';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { ScreenSizeService } from 'src/app/services/screen-size.service';

@Injectable({ providedIn: 'root' })
export class PlayersViewService {
  private STORAGE_KEY = 'PlayersView';
  private view$ = new ReplaySubject<PlayersView>(1);

  constructor(private localStorageService: LocalStorageService, private screenSizeService: ScreenSizeService) {
    this.view$.next(this.getInitial());
  }

  public select(): Observable<PlayersView> {
    return this.view$.pipe(distinctUntilChanged());
  }

  public change(newView: PlayersView) {
    this.localStorageService.upsert<PlayersView>(this.STORAGE_KEY, newView);
    this.view$.next(newView);
  }

  private getInitial(): PlayersView {
    const fromCache = this.localStorageService.get<PlayersView>(this.STORAGE_KEY) || PlayersView.TABLE;
    return this.screenSizeService.isMobile() ? PlayersView.LIST : fromCache;
  }
}
