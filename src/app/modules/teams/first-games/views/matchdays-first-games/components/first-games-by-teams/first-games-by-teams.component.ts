import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TeamMatchdaysFirstGames } from 'src/app/modules/teams/first-games/models/team-matchdays-first-games.model';
import { Logger } from 'src/app/utils/logger';

@Component({
  selector: 'app-first-games-by-teams',
  templateUrl: './first-games-by-teams.component.html',
  styleUrls: ['./first-games-by-teams.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FirstGamesByTeamsComponent implements OnInit {
  public teams$: Observable<TeamMatchdaysFirstGames[]>;

  constructor(private route: ActivatedRoute) {}

  public ngOnInit(): void {
    Logger.logDev('first games by teams component, on init');
    this.teams$ = this.route.data.pipe(map((data) => data.teams));
  }
}
