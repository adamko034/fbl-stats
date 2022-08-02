import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UnlimitedTransfersDate } from 'src/app/store/properties/properties.model';
import { FixturesDifficultyState } from '../models/fixtures-difficulty-state.model';

@Component({
  selector: 'app-fixtures-difficulty',
  templateUrl: './fixtures-difficulty.component.html',
  styleUrls: ['./fixtures-difficulty.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FixturesDifficultyComponent implements OnInit {
  public state$: Observable<FixturesDifficultyState>;
  public nextMatchday$: Observable<number>;
  public lastKnownMatchday$: Observable<number>;
  public nextUnlimitedTransfersMatchday$: Observable<UnlimitedTransfersDate>;

  constructor(private route: ActivatedRoute) {}

  public ngOnInit(): void {
    this.state$ = this.route.data.pipe(map((data) => data.state));
    this.lastKnownMatchday$ = this.route.data.pipe(map((data) => data.lastKnownMatchday));
    this.nextMatchday$ = this.route.data.pipe(map((data) => data.lastMatchday + 1));
    this.nextUnlimitedTransfersMatchday$ = this.route.data.pipe(
      map((data) => {
        return data.nextUnlimitedTransfers ? data.nextUnlimitedTransfers.matchday : 34;
      })
    );
  }
}
