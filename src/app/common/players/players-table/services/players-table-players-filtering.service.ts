import { Injectable } from '@angular/core';
import { ArrayStream } from 'src/app/services/array-stream.service';
import { FromTo } from 'src/app/shared/models/from-to.model';
import { Position } from '../../models/position.enum';
import { PlayerPredictionFilterDeterminer } from '../../services/player-prediction-filter-determiner.service';
import { PlayersTableFilters } from '../models/internal/players-table-filters.model';
import { PlayersTablePlayer } from '../models/state/players-table-player.model';

@Injectable()
export class PlayersTablePlayersFiltering {
  constructor(private _playerPredictionFilterDeterimer: PlayerPredictionFilterDeterminer) {}

  public filter(players: PlayersTablePlayer[], filters: PlayersTableFilters): PlayersTablePlayer[] {
    return new ArrayStream<PlayersTablePlayer>(players)
      .filterQuick(
        (p) =>
          !filters.playerName ||
          p.name.replace(' ', '').toLocaleLowerCase().includes(filters.playerName.replace(' ', '').toLocaleLowerCase())
      )
      .filterQuick(
        (p) =>
          filters.position === Position.ALL || p.position.toLocaleLowerCase() === filters.position.toLocaleLowerCase()
      )
      .filterQuick((p) => p.price <= filters.maxPrice)
      .filterQuick((p) => p.popularity <= filters.maxPopularity)
      .filterQuick((p) => (filters.hideUnavailable ? p.available === true : true))
      .filterQuick((p) => filters.teams.length === 0 || filters.teams.includes(p.teamShort))
      .filterQuick(
        (p) =>
          p.nextGame === undefined ||
          this._playerPredictionFilterDeterimer.includedInFilter(p.nextGame.prediction, filters.prediction)
      )
      .forEachQuick((p) => this.filterGames(p, filters.matchdays))
      .collect();
  }

  private filterGames(player: PlayersTablePlayer, matchdays: FromTo): void {
    player.games = new ArrayStream(player.games)
      .filterQuick((g) => matchdays.from <= g.matchday && g.matchday <= matchdays.to)
      .collect();
  }
}
