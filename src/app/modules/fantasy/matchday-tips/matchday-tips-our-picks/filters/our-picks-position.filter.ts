import { OurPicksPlayer } from 'src/app/modules/core/our-picks/models/our-picks-player.model';
import { Filterable } from 'src/app/modules/core/shared/filterable/filterable';

export class OurPicksPositionFilter implements Filterable<OurPicksPlayer> {
  constructor(private position: string) {}

  public filter(items: OurPicksPlayer[]): OurPicksPlayer[] {
    return items.filter((p) => p.position.toLowerCase() === this.position.toLowerCase());
  }
}
