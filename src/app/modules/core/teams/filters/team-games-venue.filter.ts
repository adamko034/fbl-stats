import { Filterable } from 'src/app/modules/core/shared/filterable/filterable';
import { Fixture } from 'src/app/store/teams/models/fixture.model';

export class TeamsGamesVenueFilter implements Filterable<Fixture> {
  constructor(private venue: 'h' | 'a') {}

  public filter(items: Fixture[]): Fixture[] {
    return items.filter((game) => {
      return this.venue === 'h' ? game.isHome : !game.isHome;
    });
  }
}
