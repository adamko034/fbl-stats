import { Filterable } from 'src/app/modules/core/shared/filterable/filterable';
import { OurPicksPlayer } from '../../../core/our-picks/models/our-picks-player.model';
import { OurPicksType } from '../../../core/our-picks/models/our-picks-type.enum';

export class OurPicksTypesFilter implements Filterable<OurPicksPlayer> {
  constructor(private types: OurPicksType[]) {}

  public filter(items: OurPicksPlayer[]): OurPicksPlayer[] {
    if (!this.types || this.types.length === 0) {
      return items;
    }

    let newItems = [...items];
    if (this.types.includes(OurPicksType.BARGAIN)) {
      newItems = newItems.filter((p) => p.isBargain);
    }

    if (this.types.includes(OurPicksType.DIFFERENTIAL)) {
      newItems = newItems.filter((p) => p.isDifferential);
    }

    if (this.types.includes(OurPicksType.PREMIUM)) {
      newItems = newItems.filter((p) => p.isPremium);
    }

    if (this.types.includes(OurPicksType.MUST_HAVE)) {
      newItems = newItems.filter((p) => p.isMustHave);
    }

    if (this.types.includes(OurPicksType.SURPRISING)) {
      newItems = newItems.filter((p) => p.isSurprising);
    }

    return newItems;
  }
}
