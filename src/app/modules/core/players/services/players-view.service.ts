import { Injectable } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';
import { PlayersView } from 'src/app/modules/core/players/models/players-view.enum';
import { ScreenSizeService } from 'src/app/services/screen-size.service';
import { GuiConfigStore } from 'src/app/store/gui-config/gui-config.store';

@Injectable({ providedIn: 'root' })
export class PlayersViewService {
  private view$ = new Observable<PlayersView>();

  constructor(private guiConfigStore: GuiConfigStore, private screenSizeService: ScreenSizeService) {
    this.view$ = combineLatest([this.guiConfigStore.selectPlayersView(), this.screenSizeService.isMobile$()]).pipe(
      map(([view, isMobile]) => {
        return isMobile ? PlayersView.LIST : view;
      })
    );
  }

  public select(): Observable<PlayersView> {
    return this.view$.pipe(distinctUntilChanged());
  }

  public change(newView: PlayersView) {
    this.guiConfigStore.changePlayersView(newView);
  }
}
