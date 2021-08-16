import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TeamPredictedLineups } from 'src/app/modules/teams/lineups/store/models/team-predicted-lineups.model';
import { Player } from 'src/app/store/players/models/player.model';

@Component({
  selector: 'app-predicted-lineups-team',
  templateUrl: './predicted-lineups-team.component.html',
  styleUrls: ['./predicted-lineups-team.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PredictedLineupsTeamComponent implements OnInit {
  public teamPredictions$: Observable<TeamPredictedLineups>;
  public players$: Observable<Player[]>;
  public defenders$: Observable<Player>;

  constructor(private route: ActivatedRoute) {}

  public ngOnInit(): void {
    this.teamPredictions$ = this.route.data.pipe(map((data) => data.teamPredictions));
    this.players$ = this.route.data.pipe(map((data) => data.players));
  }
}
