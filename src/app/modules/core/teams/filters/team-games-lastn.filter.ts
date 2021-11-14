import { Filterable } from 'src/app/modules/core/shared/filterable/filterable';
import { ArrayStream } from 'src/app/services/array-stream.service';
import { Fixture } from 'src/app/store/teams/models/fixture.model';

export class TeamsGamesLastnFilter implements Filterable<Fixture> {
  constructor(private includeNGames: number) {}

  public filter(items: Fixture[]): Fixture[] {
    return new ArrayStream<Fixture>(items).orderBy('matchday', 'dsc').take(this.includeNGames).collect();
  }
}
