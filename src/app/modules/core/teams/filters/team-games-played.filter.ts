import { Filterable } from 'src/app/modules/core/shared/filterable/filterable';
import { Fixture } from 'src/app/store/teams/models/fixture.model';

export class TeamsGamesPlayedFilter implements Filterable<Fixture> {
  constructor() {}

  public filter(items: Fixture[]): Fixture[] {
    return items.filter((game) => game.wasPlayed);
  }
}
