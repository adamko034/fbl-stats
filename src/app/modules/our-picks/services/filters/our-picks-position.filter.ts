import { Filterable } from 'src/app/modules/core/shared/filterable/filterable';
import { OurPicksPlayer } from '../../../core/our-picks/models/our-picks-player.model';

export class OurPicksPositionFilter implements Filterable<OurPicksPlayer> {
  constructor(private position: string) {}

  public filter(items: OurPicksPlayer[]): OurPicksPlayer[] {
    return items.filter((p) => p.position.toLowerCase() === this.position.toLowerCase());
  }
}
