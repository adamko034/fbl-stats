import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Team } from 'src/app/store/teams/models/team.model';
import { Logger } from 'src/app/utils/logger';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-predicted-lineups-team-navigation',
  templateUrl: './predicted-lineups-team-navigation.component.html',
  styleUrls: ['./predicted-lineups-team-navigation.component.scss']
})
export class PredictedLineupsTeamNavigationComponent implements OnInit {
  public teams$: Observable<Team[]>;

  constructor(private route: ActivatedRoute) {}

  public ngOnInit(): void {
    Logger.logDev('lineups teams list component, ng on init');
    this.teams$ = this.route.parent.data.pipe(map((data) => data.teams));
  }
}
