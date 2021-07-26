import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MatchdayFixtures } from 'src/app/store/fixtures/models/matchday-fixtures.model';

@Component({
  selector: 'app-bundesliga-fixtures',
  templateUrl: './bundesliga-fixtures.component.html',
  styleUrls: ['./bundesliga-fixtures.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BundesligaFixturesComponent implements OnInit {
  public matchdays$: Observable<MatchdayFixtures[]>;

  constructor(private route: ActivatedRoute) {}

  public ngOnInit(): void {
    this.matchdays$ = this.route.data.pipe(map((data) => data.matchdays));
  }
}
