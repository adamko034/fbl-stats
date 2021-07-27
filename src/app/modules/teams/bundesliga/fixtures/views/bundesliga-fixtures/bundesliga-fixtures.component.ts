import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { fromEvent } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';
import { MatchdayFixtures } from 'src/app/store/fixtures/models/matchday-fixtures.model';

@UntilDestroy()
@Component({
  selector: 'app-bundesliga-fixtures',
  templateUrl: './bundesliga-fixtures.component.html',
  styleUrls: ['./bundesliga-fixtures.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BundesligaFixturesComponent implements OnInit {
  private allMatchdays: MatchdayFixtures[];

  public displayedMatchdays: MatchdayFixtures[];

  constructor(private route: ActivatedRoute, private changeDetection: ChangeDetectorRef) {}

  public ngOnInit(): void {
    this.route.data
      .pipe(
        map((data) => data.matchdays),
        untilDestroyed(this)
      )
      .subscribe((matchdays) => {
        this.allMatchdays = matchdays;
        this.displayedMatchdays = this.allMatchdays.slice(0, 5);
      });

    fromEvent(window, 'scroll')
      .pipe(
        map(() => Math.round(window.scrollY / 2000) + 1),
        distinctUntilChanged(),
        untilDestroyed(this)
      )
      .subscribe((part) => {
        this.displayedMatchdays = this.allMatchdays.slice(0, 5 * part);
        this.changeDetection.detectChanges();
      });
  }
}
