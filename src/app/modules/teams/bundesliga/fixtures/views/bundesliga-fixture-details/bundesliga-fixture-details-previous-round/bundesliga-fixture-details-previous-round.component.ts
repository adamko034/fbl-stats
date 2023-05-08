import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ArrayStream } from 'src/app/services/array-stream.service';
import { Player } from 'src/app/store/players/models/player.model';
import { Fixture } from 'src/app/store/teams/models/fixture.model';
import { BundesligaFixtureDetailsState } from '../../../../models/bundesliga-fixture-details.state';

interface PlayerStats {
  id: string;
  name: string;
  goals: number;
  assists: number;
  score: number;
  points: number;
}

@Component({
  selector: 'app-bundesliga-fixture-details-previous-round',
  templateUrl: './bundesliga-fixture-details-previous-round.component.html',
  styleUrls: ['./bundesliga-fixture-details-previous-round.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BundesligaFixtureDetailsPreviousRoundComponent {
  @Input() set state(value: BundesligaFixtureDetailsState) {
    this._state = value;
    this._homeFixture = new ArrayStream(this._state.homeTeam.games)
      .filterQuick((g) => g.matchday === this._state.matchday)
      .takeFirst();

    this._homePlayersStats = this.setPlayersStats(this._state.homeTeamPlayers);
    this._awayPlayersStats = this.setPlayersStats(this._state.awayTeamPlayers);
  }

  private _state: BundesligaFixtureDetailsState;
  public get state(): BundesligaFixtureDetailsState {
    return this._state;
  }

  private _homeFixture: Fixture;
  public get homeFixture(): Fixture {
    return this._homeFixture;
  }

  private _homePlayersStats: PlayerStats[];
  public get homePlayersStats(): PlayerStats[] {
    return new ArrayStream(this._homePlayersStats)
      .filterQuick((playerStats) => !!playerStats && playerStats.score > 0)
      .orderBy('score', 'dsc')
      .collect();
  }

  private _awayPlayersStats: PlayerStats[];
  public get awayPlayersStats(): PlayerStats[] {
    return new ArrayStream(this._awayPlayersStats)
      .filterQuick((playerStats) => !!playerStats && playerStats.score > 0)
      .orderBy('score', 'dsc')
      .collect();
  }

  public get homeTeamTopPlayers(): PlayerStats[] {
    return new ArrayStream(this._homePlayersStats)
      .filterQuick((p) => p.points != null)
      .orderBy('points', 'dsc')
      .take(6)
      .collect();
  }

  public get awayTeamTopPlayers(): PlayerStats[] {
    return new ArrayStream(this._awayPlayersStats)
      .filterQuick((p) => p.points != null)
      .orderBy('points', 'dsc')
      .take(6)
      .collect();
  }

  private setPlayersStats(players: Player[]) {
    return new ArrayStream(players)
      .convertQuick<PlayerStats | null>((player) => {
        const fixture = new ArrayStream(player.games)
          .filterQuick((g) => g.matchday === this._state.matchday)
          .takeFirst();

        if (!fixture) {
          return null;
        }

        return {
          id: player.id,
          assists: fixture.assists,
          goals: fixture.goals,
          name: player.lastName,
          score: fixture.assists + fixture.goals * 10,
          points: fixture.points
        };
      })
      .collect();
  }
}
