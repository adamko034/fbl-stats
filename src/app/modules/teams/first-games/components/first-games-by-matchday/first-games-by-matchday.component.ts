import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MatchdayFixtures } from 'src/app/store/fixtures/models/matchday-fixtures.model';
import { Logger } from 'src/app/utils/logger';

@Component({
  selector: 'app-first-games-by-matchday',
  templateUrl: './first-games-by-matchday.component.html',
  styleUrls: ['./first-games-by-matchday.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FirstGamesByMatchdayComponent implements OnInit {
  public matchdays$: Observable<MatchdayFixtures[]>;

  constructor(private route: ActivatedRoute) {}

  public ngOnInit(): void {
    Logger.logDev('first games by matchday component, on init');
    this.matchdays$ = this.route.data.pipe(map((data) => data.matchdays));
  }
}
