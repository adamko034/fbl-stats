import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MatchdayFixtures } from 'src/app/store/fixtures/models/matchday-fixtures.model';
import { Player } from 'src/app/store/players/models/player.model';
import { Properties } from 'src/app/store/properties/properties.model';
import { Team } from 'src/app/store/teams/models/team.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {
  public players$: Observable<Player[]>;
  public properties$: Observable<Properties>;
  public nextMatchdayFixtures$: Observable<MatchdayFixtures>;
  public teams$: Observable<Team[]>;

  constructor(private route: ActivatedRoute) {}

  public ngOnInit(): void {
    this.players$ = this.route.data.pipe(map((data) => data.players));
    this.properties$ = this.route.data.pipe(map((data) => data.properties));
    this.nextMatchdayFixtures$ = this.route.data.pipe(map((data) => data.nextMatchdayFixtures));
    this.teams$ = this.route.data.pipe(map((data) => data.teams));
  }
}
