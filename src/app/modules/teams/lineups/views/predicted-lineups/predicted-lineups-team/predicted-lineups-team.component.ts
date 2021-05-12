import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TeamPredictedLineups } from 'src/app/modules/teams/lineups/store/models/team-predicted-lineups.model';

@Component({
  selector: 'app-predicted-lineups-team',
  templateUrl: './predicted-lineups-team.component.html',
  styleUrls: ['./predicted-lineups-team.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PredictedLineupsTeamComponent implements OnInit {
  public team$: Observable<TeamPredictedLineups>;

  constructor(private route: ActivatedRoute) {}

  public ngOnInit(): void {
    this.team$ = this.route.data.pipe(map((data) => data.team));
  }
}
