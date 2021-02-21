import { Filterable } from 'src/app/modules/core/shared/filterable/filterable';
import { OurPicksPlayer } from '../../models/our-picks-player.model';
import { OurPicksPlayers } from '../../models/our-picks-players.model';

export class OurPicksPositionFilter implements Filterable<OurPicksPlayer> {
  constructor(private position: string) {}

  public filter(items: OurPicksPlayer[]): OurPicksPlayer[] {
    return items.filter((p) => p.position.toLowerCase() === this.position.toLowerCase());
  }
}
