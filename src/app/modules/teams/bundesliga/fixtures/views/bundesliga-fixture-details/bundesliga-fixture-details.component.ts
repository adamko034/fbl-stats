import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ArrayStream } from 'src/app/services/array-stream.service';
import { ScreenSize } from 'src/app/services/screen-size.service';
import { Player } from 'src/app/store/players/models/player.model';
import { Fixture } from 'src/app/store/teams/models/fixture.model';
import { Team } from 'src/app/store/teams/models/team.model';
import { BundesligaFixtureDetailsState } from '../../../models/bundesliga-fixture-details.state';

@Component({
  selector: 'app-bundesliga-fixture-details',
  templateUrl: './bundesliga-fixture-details.component.html',
  styleUrls: ['./bundesliga-fixture-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BundesligaFixtureDetailsComponent {
  public state$: Observable<BundesligaFixtureDetailsState | undefined>;
  public screens = ScreenSize;

  public get homeTeam$(): Observable<Team> {
    return this.state$.pipe(map((state) => state?.homeTeam));
  }

  public get homeTeamPlayers$(): Observable<Player[]> {
    return this.state$.pipe(map((state) => state?.homeTeamPlayers));
  }

  public get awayTeam$(): Observable<Team> {
    return this.state$.pipe(map((state) => state?.awayTeam));
  }

  public get awayTeamPlayers$(): Observable<Player[]> {
    return this.state$.pipe(map((state) => state.awayTeamPlayers));
  }

  public get isNextMatchday$(): Observable<boolean> {
    return this.state$.pipe(map((state) => state.isNextMatchday));
  }

  public get matchday$(): Observable<number> {
    return this.state$.pipe(map((state) => state.matchday));
  }

  public get fixture$(): Observable<Fixture | undefined> {
    return this.state$.pipe(
      map((state) => {
        if (!state) {
          return undefined;
        }

        return state.homeTeam.games.find((f) => f.matchday === state.matchday);
      })
    );
  }

  public get previousRound$(): Observable<BundesligaFixtureDetailsState> {
    return this.state$.pipe(
      filter((state) => !!state),
      map((state) => ({
        homeTeam: state.awayTeam,
        awayTeam: state.homeTeam,
        homeTeamPlayers: state.awayTeamPlayers,
        awayTeamPlayers: state.homeTeamPlayers,
        isNextMatchday: state.isNextMatchday,
        matchday:
          new ArrayStream(state.homeTeam.games).filterQuick((g) => g.opponent === state.awayTeam.shortName).takeFirst()
            ?.matchday ?? 0
      }))
    );
  }

  constructor(private route: ActivatedRoute) {
    this.state$ = this.route.data.pipe(map((data) => data.state));
  }
}
