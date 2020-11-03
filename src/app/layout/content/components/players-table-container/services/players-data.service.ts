import { Injectable } from '@angular/core';
import { orderBy } from 'lodash';
import { PlayerUi } from 'src/app/layout/content/components/players-table-container/models/players-ui.model';
import { PlayersFilteringService } from 'src/app/layout/content/components/players-table-container/services/players-filtering.service';
import { PlayersModelConverter } from 'src/app/layout/content/components/players-table-container/services/players-model-converter.service';
import { PlayersFilters } from 'src/app/layout/content/models/players-filters';
import { Player } from 'src/app/models/player.model';

@Injectable({ providedIn: 'root' })
export class PlayersDataService {
  constructor(
    private playersModelConverter: PlayersModelConverter,
    private playersFilteringService: PlayersFilteringService
  ) {}

  public getPlayersToDisplay(
    players: Player[],
    filters: PlayersFilters,
    lastMatchday: number,
    playersCount: number
  ): PlayerUi[] {
    const filtered = this.playersFilteringService.filter(players, filters, lastMatchday);
    const converted = this.playersModelConverter.toUi(filtered);

    const ordered = orderBy(converted, ['form'], ['desc']);

    const minFormPlayer = ordered[playersCount - 1];

    if (!!minFormPlayer) {
      return ordered.filter((p) => p.form >= minFormPlayer.form);
    }

    return ordered.slice(0, playersCount);
  }

  public flatten(players: PlayerUi[]): any[] {
    return players.map((player) => {
      const gamesFlatted = player.games.reduce((obj, item) => ({ ...obj, [item.matchday]: item.points }), {});
      return { ...player, ...gamesFlatted } as any;
    });
  }

  public getPointsColor(points: number): string {
    if (points <= 0) {
      return 'black';
    }

    if (points > 0 && points <= 5) {
      return 'red';
    }

    if (points > 5 && points < 10) {
      return 'orange';
    }

    if (points >= 10 && points < 16) {
      return 'blue';
    }

    return 'green';
  }
}
