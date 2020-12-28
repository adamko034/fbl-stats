import { Injectable } from '@angular/core';
import { Convertable } from 'src/app/modules/core/shared/convertable/convertable';
import { MyTeamPlayer } from 'src/app/modules/my-team/models/my-team-player.model';
import { Player } from 'src/app/store/players/models/player.model';

@Injectable({ providedIn: 'root' })
export class MyTeamPlayerConverter implements Convertable<Player, MyTeamPlayer> {
  public convert(players: Player[]): MyTeamPlayer[] {
    if (!players) {
      return [];
    }
    return players.map((player) => this.toMyTeamPlayer(player));
  }

  public toMyTeamPlayer(player: Player): MyTeamPlayer {
    return {
      id: player.id,
      name: player.name,
      price: Math.round(player.price * 10) / 10,
      teamShort: player.teamShort,
      position: player.position
    };
  }
}
