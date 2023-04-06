import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ArrayStream } from 'src/app/services/array-stream.service';
import { Fixture } from 'src/app/store/teams/models/fixture.model';
import { Team } from 'src/app/store/teams/models/team.model';

@Component({
  selector: 'app-bundesliga-fixture-details-next-games',
  templateUrl: './bundesliga-fixture-details-next-games.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BundesligaFixtureDetailsNextGamesComponent {
  @Input() homeTeam: Team;
  @Input() awayTeam: Team;
  @Input() matchday: number;

  private _homeGames: Fixture[];
  private _awayGames: Fixture[];

  public get homeGames(): Fixture[] {
    if (!this._homeGames) {
      this._homeGames = this.getNextGames(this.homeTeam);
    }

    return this._homeGames;
  }

  public get awayGames(): Fixture[] {
    if (!this._awayGames) {
      this._awayGames = this.getNextGames(this.awayTeam);
    }

    return this._awayGames;
  }

  private getNextGames(team: Team): Fixture[] {
    return new ArrayStream(team.games)
      .filterQuick((game) => game.matchday >= this.matchday)
      .orderBy('matchday', 'asc')
      .take(5)
      .collect();
  }
}
