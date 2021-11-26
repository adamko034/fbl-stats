import { MatchdayTipsOurPicksPlayer } from 'src/app/modules/core/matchday-tips/our-picks/models/matchday-tips-our-picks-player.model';
import { Filterable } from 'src/app/modules/core/shared/filterable/filterable';

export class MatchdayTipsOurPicksPositionFilter implements Filterable<MatchdayTipsOurPicksPlayer> {
  constructor(private position: string) {}

  public filter(items: MatchdayTipsOurPicksPlayer[]): MatchdayTipsOurPicksPlayer[] {
    return items.filter((p) => p.position.toLowerCase() === this.position.toLowerCase());
  }
}
