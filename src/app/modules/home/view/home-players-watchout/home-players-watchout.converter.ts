import { Convertable } from 'src/app/modules/core/shared/convertable/convertable';
import { ArrayStream } from 'src/app/services/array-stream.service';
import { Player } from 'src/app/store/players/models/player.model';
import { HomePlayersWatchoutPlayer } from './home-players-watchout-player.model';

export class HomePlayersWatchoutConverter implements Convertable<Player, HomePlayersWatchoutPlayer> {
  public convert(items: Player[]): HomePlayersWatchoutPlayer[] {
    return items.map((item) => this.convertSingle(item));
  }

  private convertSingle(player: Player): HomePlayersWatchoutPlayer {
    const { id, totalPoints, top500Popularity, lastName, position, price, teamShort } = player;

    return {
      id,
      totalPoints,
      lastName,
      position,
      price,
      team: teamShort,
      top500Popularity,
      top500PopularityRounded: Math.floor(top500Popularity),
      last4: new ArrayStream(player.games)
        .orderBy('matchday', 'dsc')
        .take(4)
        .sumBy((g) => g.points)
    };
  }
}
