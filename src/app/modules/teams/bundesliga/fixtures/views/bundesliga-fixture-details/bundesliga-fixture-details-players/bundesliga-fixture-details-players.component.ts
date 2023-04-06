import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ArrayStream } from 'src/app/services/array-stream.service';
import { Player } from 'src/app/store/players/models/player.model';
import { Team } from 'src/app/store/teams/models/team.model';

@Component({
  selector: 'app-bundesliga-fixture-details-players',
  templateUrl: './bundesliga-fixture-details-players.component.html',
  styleUrls: ['./bundesliga-fixture-details-players.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BundesligaFixtureDetailsPlayersComponent {
  @Input() homeTeam: Team;
  @Input() set homeTeamPlayers(value: Player[]) {
    this.setHomeUnavailable(value);
    this.setHomeStats(value);
  }
  @Input() awayTeam: Team;
  @Input() set awayTeamPlayers(value: Player[]) {
    this.setAwayUnavailable(value);
    this.setAwayStats(value);
  }

  private _unavailablesMax = 0;
  public get unavailableMax(): number {
    return this._unavailablesMax;
  }

  private _homeUnavailable: Player[];
  public get homeUnavailable(): Player[] {
    return this._homeUnavailable;
  }

  private _awayUnavailable: Player[];
  public get awayUnavailable(): Player[] {
    return this._awayUnavailable;
  }

  private _homeStats: Player[];
  public get homeStats(): Player[] {
    return this._homeStats;
  }

  private _awayStats: Player[];
  public get awayStats(): Player[] {
    return this._awayStats;
  }

  private _statsMax = 0;
  public get statsMax(): number {
    return this._statsMax;
  }

  private setHomeUnavailable(players: Player[]) {
    this._homeUnavailable = this.unavailables(players);
    if (this._unavailablesMax < this._homeUnavailable.length) {
      this._unavailablesMax = this._homeUnavailable.length;
    }
  }

  private setAwayUnavailable(players: Player[]) {
    this._awayUnavailable = this.unavailables(players);
    if (this._unavailablesMax < this._awayUnavailable.length) {
      this._unavailablesMax = this._awayUnavailable.length;
    }
  }

  private setHomeStats(players: Player[]) {
    this._homeStats = this.stats(players);

    if (this._homeStats.length > this._statsMax) {
      this._statsMax = this._homeStats.length;
    }
  }

  private setAwayStats(players: Player[]) {
    this._awayStats = this.stats(players);

    if (this._awayStats.length > this._statsMax) {
      this._statsMax = this._awayStats.length;
    }
  }

  private unavailables(players: Player[]) {
    return new ArrayStream(players)
      .filterQuick((p) => p.attendance === 0)
      .orderBy('totalPoints', 'dsc')
      .collect();
  }

  private stats(players: Player[]): Player[] {
    return new ArrayStream(players)
      .filterQuick((p) => p.pointsStats.overall.bundesligaGoals > 0 || p.pointsStats.overall.bundesligaAssits > 0)
      .convertQuick((p) => ({
        ...p,
        gPlusA: p.pointsStats.overall.bundesligaGoals + p.pointsStats.overall.bundesligaAssits
      }))
      .orderByThenBy(
        { field: 'gPlusA', order: 'dsc' },
        { field: 'pointsStats.overall.bundesligaGoals', order: 'dsc' },
        { field: 'totalPoints', order: 'dsc' }
      )
      .take(8)
      .collect();
  }
}
