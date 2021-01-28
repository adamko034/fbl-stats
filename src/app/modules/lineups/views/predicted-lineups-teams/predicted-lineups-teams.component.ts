import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TeamPredictedLineups } from 'src/app/modules/lineups/store/models/team-predicted-lineups.model';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-predicted-lineups-teams',
  templateUrl: './predicted-lineups-teams.component.html',
  styleUrls: ['./predicted-lineups-teams.component.scss']
})
export class PredictedLineupsTeamsComponent implements OnInit {
  public predictions$: Observable<TeamPredictedLineups[]>;
  constructor(private route: ActivatedRoute) {}

  public ngOnInit(): void {
    this.predictions$ = this.route.data.pipe(map((data) => data.predictions));
  }
}
