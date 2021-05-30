import { Injectable } from '@angular/core';
import { PlayersUiConverter } from 'src/app/modules/core/players/converters/players-ui.converter';
import { PlayerUi } from 'src/app/modules/core/players/models/player-ui.model';
import { PlayersTableFilter } from 'src/app/modules/fantasy/players/overall/filters/players-table.filter';
import { PlayersFilters } from 'src/app/modules/fantasy/players/overall/models/players-filters';
import { ArrayStream } from 'src/app/services/array-stream.service';
import { Game } from 'src/app/store/players/models/game.model';
import { Player } from 'src/app/store/players/models/player.model';

@Injectable({ providedIn: 'root' })
export class PlayersDataService {
  constructor(private playersUiConverter: PlayersUiConverter) {}

  public getPlayersToDisplay(players: Player[], playersFilters: PlayersFilters, lastMatchday: number): PlayerUi[] {
    const filter = new PlayersTableFilter(playersFilters, lastMatchday);

    return new ArrayStream<Player>(players)
      .filter(filter)
      .convert(this.playersUiConverter)
      .orderBy('form', 'dsc')
      .collect();
  }

  public flatten(players: PlayerUi[]): any[] {
    return players.map((player) => {
      const gamesFlatted = player.games.reduce((obj, item) => ({ ...obj, [item.matchday]: item.points }), {});
      return { ...player, ...gamesFlatted } as any;
    });
  }

  public getBestGame(games: Game[]): Game {
    return new ArrayStream<Game>(games).orderBy('points', 'dsc').takeFirst();
  }

  public getWorstGame(games: Game[]): Game {
    return new ArrayStream<Game>(games).orderBy('points', 'asc').takeFirst();
  }

  public getPointsColor(points: number): string {
    if (points <= 0) {
      return 'darkred';
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
