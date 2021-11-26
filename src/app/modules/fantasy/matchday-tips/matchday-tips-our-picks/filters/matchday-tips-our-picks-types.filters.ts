import { MatchdayTipsOurPicksPlayer } from 'src/app/modules/core/matchday-tips/our-picks/models/matchday-tips-our-picks-player.model';
import { MatchdayTipsOurPicksType } from 'src/app/modules/core/matchday-tips/our-picks/models/matchday-tips-our-picks-type.enum';
import { Filterable } from 'src/app/modules/core/shared/filterable/filterable';

export class MatchdayTipsOurPicksTypesFilter implements Filterable<MatchdayTipsOurPicksPlayer> {
  constructor(private types: MatchdayTipsOurPicksType[]) {}

  public filter(items: MatchdayTipsOurPicksPlayer[]): MatchdayTipsOurPicksPlayer[] {
    if (!this.types || this.types.length === 0) {
      return items;
    }

    let newItems = [...items];
    if (this.types.includes(MatchdayTipsOurPicksType.BARGAIN)) {
      newItems = newItems.filter((p) => p.isBargain);
    }

    if (this.types.includes(MatchdayTipsOurPicksType.DIFFERENTIAL)) {
      newItems = newItems.filter((p) => p.isDifferential);
    }

    if (this.types.includes(MatchdayTipsOurPicksType.PREMIUM)) {
      newItems = newItems.filter((p) => p.isPremium);
    }

    if (this.types.includes(MatchdayTipsOurPicksType.MUST_HAVE)) {
      newItems = newItems.filter((p) => p.isMustHave);
    }

    if (this.types.includes(MatchdayTipsOurPicksType.SURPRISING)) {
      newItems = newItems.filter((p) => p.isSurprising);
    }

    return newItems;
  }
}
