import { Injectable } from '@angular/core';
import { ArrayStream } from 'src/app/services/array-stream.service';
import { ResultIndicatorService } from 'src/app/services/result-indicator.service';
import { Fixture } from 'src/app/store/teams/models/fixture.model';
import { Team } from 'src/app/store/teams/models/team.model';

@Injectable({ providedIn: 'root' })
export class TeamFormService {
  constructor(private resultIndicatorService: ResultIndicatorService) {}

  public getFormString(team: Team, includeNGames: number = 5): string {
    let form = '';
    new ArrayStream<Fixture>(team.games)
      .filterQuick((g) => g.wasPlayed)
      .orderBy('matchday', 'dsc')
      .take(includeNGames)
      .collect()
      .forEach((g) => (form += this.resultIndicatorService.toChar(g.result)));

    return form;
  }
}
