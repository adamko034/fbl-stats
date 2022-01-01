import { Injectable } from '@angular/core';
import { ArrayStream } from 'src/app/services/array-stream.service';
import { MatchdayTipsTopTeamPlayer } from '../models/matchday-tips-top-team-player.model';
import { MatchdayTipsTopTeam } from '../models/matchday-tips-top-team.model';

@Injectable()
export class MatchdayTipsTopTeamElector {
  private _positionMax = { gk: 2, def: 5, mid: 5, for: 3 };

  public elect(players: MatchdayTipsTopTeamPlayer[]): MatchdayTipsTopTeam {
    const playersOrdered = this.orderPlayers(players);
    const playersByPosition: { [position: string]: MatchdayTipsTopTeamPlayer[] } = {
      gk: [],
      def: [],
      mid: [],
      for: []
    };
    const firstEleven: MatchdayTipsTopTeamPlayer[] = [];
    const bench: MatchdayTipsTopTeamPlayer[] = [];

    let playersCount = 0;
    const top15 = [];

    for (let player of playersOrdered) {
      if (playersCount === 15) {
        break;
      }

      const position = player.position;

      if (playersByPosition[position].length < this._positionMax[position]) {
        playersByPosition[position].push(player);
        top15.push(player);
        playersCount++;
      }
    }

    const gksOrdered = this.orderPlayers(playersByPosition.gk);
    const defsOrdered = this.orderPlayers(playersByPosition.def);
    const midsOrdered = this.orderPlayers(playersByPosition.mid);
    const forsOrdered = this.orderPlayers(playersByPosition.for);

    firstEleven.push(gksOrdered[0]);
    firstEleven.push(defsOrdered[0]);
    firstEleven.push(defsOrdered[1]);
    firstEleven.push(defsOrdered[2]);
    firstEleven.push(midsOrdered[0]);
    firstEleven.push(midsOrdered[1]);
    firstEleven.push(midsOrdered[2]);
    firstEleven.push(forsOrdered[0]);

    const assignedIds = firstEleven.concat(gksOrdered[1]).map((p) => p.id);
    let unassignedPlayers = top15.filter((p) => !assignedIds.includes(p.id));
    unassignedPlayers = this.orderPlayers(unassignedPlayers);

    const positionsToUse = { def: 2, mid: 2, for: 2 };
    let playersUsed = 0;
    for (let i = 0; i < unassignedPlayers.length; i++) {
      let nextPlayer = unassignedPlayers[i];

      if (positionsToUse[nextPlayer.position] <= 0) {
        continue;
      }

      firstEleven.push(nextPlayer);
      positionsToUse[nextPlayer.position] -= 1;
      playersUsed++;

      if (playersUsed === 3) {
        break;
      }
    }

    const firstElevenIds = firstEleven.map((p) => p.id);
    const toBench = top15.filter((p) => !firstElevenIds.includes(p.id));

    toBench.forEach((p) => bench.push(p));

    return { bench, firstLineup: firstEleven };
  }

  private orderPlayers(players: MatchdayTipsTopTeamPlayer[]): MatchdayTipsTopTeamPlayer[] {
    return new ArrayStream<MatchdayTipsTopTeamPlayer>(players)
      .orderByThenBy({ field: 'points', order: 'dsc' }, { field: 'price', order: 'asc' })
      .collect();
  }
}
