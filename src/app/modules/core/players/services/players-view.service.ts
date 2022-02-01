import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';
import { PlayersView } from 'src/app/modules/core/players/models/players-view.enum';
import { ScreenSizeService } from 'src/app/services/screen-size.service';
import { GuiConfigStore } from 'src/app/store/gui-config/gui-config.store';

@Injectable({ providedIn: 'root' })
export class PlayersViewService {
  private view$ = new Observable<PlayersView>();

  constructor(private guiConfigStore: GuiConfigStore, private screenSizeService: ScreenSizeService) {
    this.view$ = this.guiConfigStore.selectPlayersView();
  }

  public select(): Observable<PlayersView> {
    return this.view$.pipe(distinctUntilChanged());
  }

  public change(newView: PlayersView) {
    this.guiConfigStore.changePlayersView(newView);
  }
}
