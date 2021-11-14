import { ArrayStream } from 'src/app/services/array-stream.service';
import { ResultIndicatorService } from 'src/app/services/result-indicator.service';
import { Fixture } from 'src/app/store/teams/models/fixture.model';
import { Team } from 'src/app/store/teams/models/team.model';
import { Actionable } from '../../shared/arrays/actionable';
import { TeamsGamesLastnFilter } from '../filters/team-games-lastn.filter';

export class TeamsFormSetAction implements Actionable<Team> {
  constructor(private resultIndicatorService: ResultIndicatorService, private includeNGames: number) {}

  public exec(items: Team[]): Team[] {
    return new ArrayStream<Team>(items)
      .forEachQuick((team) => {
        const games: Fixture[] = new ArrayStream<Fixture>(team.games)
          .filter(new TeamsGamesLastnFilter(this.includeNGames))
          .orderBy('matchday', 'dsc')
          .collect();

        team.form = this.resultIndicatorService.fromResultArray(games.map((g) => g.result));
      })
      .collect();
  }
}
