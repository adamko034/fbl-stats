import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { ArrayStream } from 'src/app/services/array-stream.service';
import { Player } from 'src/app/store/players/models/player.model';
import { PlayersStore } from 'src/app/store/players/players.store';
import { PlayersFilter } from '../../../core/players/filter/filters/players-filter';
import { PlayersFilterAvailable } from '../../../core/players/filter/filters/players-filter-available';
import { PlayersFilterPopularityGreater } from '../../../core/players/filter/filters/players-filter-popularity-greater';
import { PlayersFilterTop100PopularityGreater } from '../../../core/players/filter/filters/players-filter-popularity-greater copy';
import { PlayersFilterPrediction } from '../../../core/players/filter/filters/players-filter-prediction';
import { PlayersFilterUnavailable } from '../../../core/players/filter/filters/players-filter-unavailable';
import { PlayerAttendancePrediction } from '../../../core/players/models/player-attendance-prediction.enum';
import { PredictedLineupsStatsPlayerConverter } from '../converters/predicted-lineups-stats-player.converter';
import { PredictedLineupsStatsPlayer } from '../models/predicted-lineups-stats-player.model';
import { PredictedLineupsStatsPlayers } from '../models/predicted-lineups-stats-players.model';

@Injectable()
export class PredictedLineupsStasPlayersResolver implements Resolve<PredictedLineupsStatsPlayers> {
  constructor(private playersStore: PlayersStore, private playerConverter: PredictedLineupsStatsPlayerConverter) {}

  public resolve(): Observable<PredictedLineupsStatsPlayers> {
    return this.playersStore.selectPlayers().pipe(
      map((players) => ({
        unavailable: this.getUnavailablePlayers(players),
        available: this.getAvailablePlayers(players)
      })),
      map((players) => {
        const unavailablePlayers = players.unavailable;
        const benchedPlayers = this.getBenchedPlayers(players.available);
        const doubts = this.getDoubtsPlayers(players.available);

        return {
          topBenched: this.getTop(benchedPlayers, 10),
          topFormBenched: this.getTopForm(benchedPlayers, 10),
          topPopularityBenched: this.getTopPopularity(benchedPlayers, 10),
          top100PopularityBenched: this.getTop100Popularity(benchedPlayers, 10),

          topDoubts: this.getTop(doubts, 10),
          topFormDoubts: this.getTopForm(doubts, 10),
          topPopularityDoubts: this.getTopPopularity(doubts, 10),
          top100PopularityDoubts: this.getTop100Popularity(doubts, 10),

          topUnavailable: this.getTop(unavailablePlayers, 10),
          topFormUnavailable: this.getTopForm(unavailablePlayers, 10),
          topPopularityUnavailable: this.getTopPopularity(unavailablePlayers, 10),
          top100PopularityUnavailable: this.getTop100Popularity(unavailablePlayers, 10)
        };
      }),
      first()
    );
  }

  private getAvailablePlayers(players: Player[]): Player[] {
    return new ArrayStream<Player>(players).filter(new PlayersFilterAvailable()).collect();
  }

  private getUnavailablePlayers(players: Player[]): Player[] {
    return new ArrayStream<Player>(players).filter(new PlayersFilterUnavailable()).collect();
  }

  private getBenchedPlayers(availablePlayers: Player[]): Player[] {
    return new ArrayStream<Player>(availablePlayers)
      .filter(new PlayersFilterPrediction(PlayerAttendancePrediction.WillNotPlay))
      .collect();
  }

  private getDoubtsPlayers(availablePlayers: Player[]): Player[] {
    return new ArrayStream<Player>(availablePlayers)
      .filter(new PlayersFilterPrediction(PlayerAttendancePrediction.Doubt))
      .collect();
  }

  private getTopPopularity(players: Player[], n: number): any {
    return this.getTopNFor('popularity', players, n, new PlayersFilterPopularityGreater(1));
  }

  private getTop100Popularity(players: Player[], n: number): any {
    return this.getTopNFor('top100Popularity', players, n, new PlayersFilterTop100PopularityGreater(1));
  }

  private getTopForm(players: Player[], n: number): any {
    return this.getTopNFor('last5Form', players, n);
  }

  private getTop(players: Player[], n: number): PredictedLineupsStatsPlayer[] {
    return this.getTopNFor('totalPoints', players, n);
  }

  private getTopNFor(
    field: string,
    players: Player[],
    n: number,
    filter?: PlayersFilter
  ): PredictedLineupsStatsPlayer[] {
    let arrayStream = new ArrayStream<Player>(players);

    if (!!filter) {
      arrayStream = arrayStream.filter(filter);
    }
    return arrayStream
      .convert<PredictedLineupsStatsPlayer>(this.playerConverter)
      .orderBy(field, 'dsc')
      .take(n)
      .collect();
  }
}
