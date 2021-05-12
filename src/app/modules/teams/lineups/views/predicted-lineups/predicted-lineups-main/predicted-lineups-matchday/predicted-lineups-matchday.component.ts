import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Matchday } from 'src/app/modules/core/matchday/models/matchday.model';
import { MatchdayFixtureDisplay } from 'src/app/shared/components/matchday/models/matchday-fixture-display.enum';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-predicted-lineups-matchday',
  templateUrl: './predicted-lineups-matchday.component.html',
  styleUrls: ['./predicted-lineups-matchday.component.scss']
})
export class PredictedLineupsMatchdayComponent implements OnInit {
  public matchday$: Observable<Matchday>;

  public get display(): MatchdayFixtureDisplay {
    return MatchdayFixtureDisplay.LOGO;
  }

  constructor(private route: ActivatedRoute) {}

  public ngOnInit(): void {
    this.matchday$ = this.route.data.pipe(map((data) => data.matchday));
  }
}
