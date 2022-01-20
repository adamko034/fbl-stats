import { Injectable } from '@angular/core';
import { PlayersStore } from 'src/app/store/players/players.store';
import { PlayersCompareQuickLinkTopLoader } from './players-comapre-quick-link-top.loader';
import { PlayersCompareQuickLinkGkLoader } from './players-compare-quick-link-gk.loader';
import { PlayersCompareQuickLinkType } from './players-compare-quick-link-type.enum';
import { PlayersCompareQuickLinkLoader } from './players-compare-quick-link.loader';

@Injectable()
export class PlayersCompareQuickLinkLoaderFactory {
  constructor(private playersStore: PlayersStore) {}

  public create(type: PlayersCompareQuickLinkType): PlayersCompareQuickLinkLoader {
    switch (type) {
      case PlayersCompareQuickLinkType.TOP:
        return new PlayersCompareQuickLinkTopLoader(this.playersStore);
      default:
        return new PlayersCompareQuickLinkGkLoader();
    }
  }
}
