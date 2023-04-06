import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
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

  constructor(private route: ActivatedRoute) {
    this.state$ = this.route.data.pipe(map((data) => data.state));
  }
}
