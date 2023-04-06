import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ArrayStream } from 'src/app/services/array-stream.service';
import { Team } from 'src/app/store/teams/models/team.model';

@Component({
  selector: 'app-bundesliga-fixture-details-standings',
  templateUrl: './bundesliga-fixture-details-standings.component.html',
  styleUrls: ['./bundesliga-fixture-details-standings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BundesligaFixtureDetailsStandingsComponent {
  @Input() set homeTeam(value: Team) {
    this._homeTeam = value;
    this._last6Home = undefined;
  }
  @Input() set awayTeam(value: Team) {
    this._awayTeam = value;
    this._last6Away = undefined;
  }
  @Input() matchday: number;

  private _last6Home: any;
  private _last6Away: any;

  private _homeTeam: Team;
  private _awayTeam: Team;

  public get betterTeam(): Team {
    return this._homeTeam.rank < this._awayTeam.rank ? this._homeTeam : this._awayTeam;
  }

  public get worseTeam(): Team {
    return this._homeTeam.rank > this._awayTeam.rank ? this._homeTeam : this._awayTeam;
  }

  public get last6BetterTeam(): any {
    this.setLast6Teams();
    return this._last6Home.rank > this._last6Away.rank ? this._last6Home : this._last6Away;
  }

  public get last6WorseTeam(): any {
    this.setLast6Teams();
    return this._last6Home.rank < this._last6Away.rank ? this._last6Home : this._last6Away;
  }

  public get bundesligaLink(): string {
    return `/teams/bundesliga/table?teams=${this.homeTeam.shortName},${this.awayTeam.shortName}`;
  }

  private setLast6Teams(): void {
    if (!this._last6Home) {
      this._last6Home = this.createLast6Team(this._homeTeam);
    }

    if (!this._last6Away) {
      this._last6Away = this.createLast6Team(this._awayTeam);
    }
  }

  private createLast6Team(team: Team): any {
    const games = new ArrayStream(team.games)
      .filterQuick((g) => g.matchday <= this.matchday && g.wasPlayed)
      .orderBy('matchday', 'dsc')
      .take(6)
      .collect();

    const points = new ArrayStream(games).sumBy((g) => g.points);
    const goalsScored = new ArrayStream(games).sumBy((g) => g.goalsScored);
    const goalsConceded = new ArrayStream(games).sumBy((g) => g.goalsConceded);

    const rank = points * 100 + (goalsScored - goalsConceded) + goalsScored;

    return {
      rank,
      shortName: team.shortName,
      name: team.name,
      points,
      wins: new ArrayStream(games).countBy((g) => g.points === 3),
      draws: new ArrayStream(games).countBy((g) => g.points === 1),
      losses: new ArrayStream(games).countBy((g) => g.points === 0),
      goalsScored,
      goalsConceded
    };
  }
}
