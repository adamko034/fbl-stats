import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { GuiConfigStore } from 'src/app/store/gui-config/gui-config.store';

@Injectable()
export class PlayersCompareIdsCacheService {
  constructor(private guiStore: GuiConfigStore) {}

  public get(): Observable<string[]> {
    return this.guiStore.selectComparePlayersConfig().pipe(map((config) => config?.ids ?? []));
  }

  public set(ids: string[]): void {
    this.guiStore.changeComparePlayersIds(ids);
  }
}
