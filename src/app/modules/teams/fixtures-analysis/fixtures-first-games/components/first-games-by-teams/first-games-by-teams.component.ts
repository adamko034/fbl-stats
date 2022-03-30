import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Logger } from 'src/app/utils/logger';
import { TeamMatchdaysFirstGames } from '../../models/team-matchdays-first-games.model';

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
