import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UnlimitedTransfersDate } from 'src/app/store/properties/properties.model';
import { FixturesFirstGamesState } from '../models/fixtures-first-games.state';

@Component({
  selector: 'app-fixtures-first-games',
  templateUrl: './fixtures-first-games.component.html',
  styleUrls: ['./fixtures-first-games.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FixturesFirstGamesComponent implements OnInit {
  public state$: Observable<FixturesFirstGamesState>;
  public lastMatchday$: Observable<number>;
  public nextMatchday$: Observable<number>;
  public lastKnownMatchday$: Observable<number>;
  public nextUnlimitedTranfers$: Observable<UnlimitedTransfersDate>;

  constructor(private route: ActivatedRoute) {}

  public ngOnInit(): void {
    this.state$ = this.route.data.pipe(map((data) => data.state));
    this.lastMatchday$ = this.route.data.pipe(map((data) => data.lastMatchday));
    this.nextMatchday$ = this.route.data.pipe(map((data) => data.lastMatchday + 1));
    this.lastKnownMatchday$ = this.route.data.pipe(map((data) => data.lastKnownMatchday));
    this.nextUnlimitedTranfers$ = this.route.data.pipe(map((data) => data.nextUnlimitedTransfers));
  }
}
