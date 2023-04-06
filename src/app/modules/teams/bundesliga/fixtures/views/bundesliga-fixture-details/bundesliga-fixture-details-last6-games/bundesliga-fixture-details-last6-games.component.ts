import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ArrayStream } from 'src/app/services/array-stream.service';
import { Fixture } from 'src/app/store/teams/models/fixture.model';
import { Team } from 'src/app/store/teams/models/team.model';

@Component({
  selector: 'app-bundesliga-fixture-details-last6-games',
  templateUrl: './bundesliga-fixture-details-last6-games.component.html',
  styleUrls: ['./bundesliga-fixture-details-last6-games.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BundesligaFixtureDetailsLast6GamesComponent {
  @Input() homeTeam: Team;
  @Input() awayTeam: Team;
  @Input() matchday: number;
  @Input() lastXMatchdays: number = 6;

  private _homeLast6: Fixture[];
  private _awayLast6: Fixture[];

  private _homeHomeLast6: Fixture[];
  private _awayAwayLast6: Fixture[];

  public get homeLast6(): Fixture[] {
    if (!this._homeLast6) {
      this._homeLast6 = new ArrayStream(this.homeTeam.games)
        .filterQuick((g) => g.matchday < this.matchday)
        .orderBy('matchday', 'dsc')
        .take(this.lastXMatchdays)
        .collect();
    }

    return this._homeLast6;
  }

  public get homeHomeLast6(): Fixture[] {
    if (!this._homeHomeLast6) {
      this._homeHomeLast6 = new ArrayStream(this.homeTeam.games)
        .filterQuick((g) => g.matchday < this.matchday)
        .filterQuick((g) => g.isHome)
        .orderBy('matchday', 'dsc')
        .take(this.lastXMatchdays)
        .collect();
    }

    return this._homeHomeLast6;
  }

  public get awayLast6(): Fixture[] {
    if (!this._awayLast6) {
      this._awayLast6 = new ArrayStream(this.awayTeam.games)
        .filterQuick((g) => g.matchday < this.matchday)
        .orderBy('matchday', 'dsc')
        .take(this.lastXMatchdays)
        .collect();
    }

    return this._awayLast6;
  }

  public get awayAwayLast6(): Fixture[] {
    if (!this._awayAwayLast6) {
      this._awayAwayLast6 = new ArrayStream(this.awayTeam.games)
        .filterQuick((g) => g.matchday < this.matchday)
        .filterQuick((g) => !g.isHome)
        .orderBy('matchday', 'dsc')
        .take(this.lastXMatchdays)
        .collect();
    }

    return this._awayAwayLast6;
  }

  public getGameResultClass(game: Fixture): string {
    if (game.goalsScored > game.goalsConceded) {
      return 'result-win';
    }

    if (game.goalsScored === game.goalsConceded) {
      return 'result-draw';
    }

    return 'result-lost';
  }

  public filterByWins = (game: Fixture) => game.points === 3;
  public filterByDraws = (game: Fixture) => game.points === 1;
  public filterByLosses = (game: Fixture) => game.points === 0;
}
