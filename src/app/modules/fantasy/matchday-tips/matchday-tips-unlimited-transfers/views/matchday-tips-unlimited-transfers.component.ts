import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ArrayStream } from 'src/app/services/array-stream.service';
import { MatchdayTipsUnlimitedTransfersDate } from '../models/matchday-tips-unlimited-transfers-date.model';
import { MatchdayTipsUnlimitedTransfersState } from '../models/matchday-tips-unlimited-transfers-state.model';

@Component({
  selector: 'app-matchday-tips-unlimited-transfers',
  templateUrl: './matchday-tips-unlimited-transfers.component.html',
  styleUrls: ['./matchday-tips-unlimited-transfers.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MatchdayTipsUnlimitedTransfersComponent implements OnInit {
  public state$: Observable<MatchdayTipsUnlimitedTransfersState>;
  public future$: Observable<MatchdayTipsUnlimitedTransfersDate[]>;
  public next$: Observable<MatchdayTipsUnlimitedTransfersDate>;
  public previous$: Observable<MatchdayTipsUnlimitedTransfersDate[]>;
  public now$: Observable<MatchdayTipsUnlimitedTransfersDate>;

  constructor(private route: ActivatedRoute) {}

  public ngOnInit(): void {
    this.state$ = this.route.data.pipe(map((data) => data.state));
    this.future$ = this.state$.pipe(
      map((state) => {
        return new ArrayStream<MatchdayTipsUnlimitedTransfersDate>(state.unlimitedTransfers.dates)
          .filterQuick((uT) => new Date(uT.start).getTime() > new Date().getTime())
          .collect();
      })
    );
    this.previous$ = this.state$.pipe(
      map((state) => {
        return new ArrayStream<MatchdayTipsUnlimitedTransfersDate>(state.unlimitedTransfers.dates)
          .filterQuick((ut) => new Date(ut.end).getTime() < new Date().getTime())
          .orderBy('matchday', 'dsc')
          .collect();
      })
    );
    this.next$ = this.state$.pipe(
      map((state) => {
        return new ArrayStream<MatchdayTipsUnlimitedTransfersDate>(state.unlimitedTransfers.dates)
          .filterQuick((uT) => new Date(uT.start).getTime() > new Date().getTime())
          .orderBy('matchday', 'asc')
          .takeFirst();
      })
    );
    this.now$ = this.state$.pipe(
      map((state) => {
        return new ArrayStream<MatchdayTipsUnlimitedTransfersDate>(state.unlimitedTransfers.dates)
          .filterQuick((ut) => new Date() >= new Date(ut.start) && new Date() <= new Date(ut.end))
          .takeFirst();
      })
    );
  }
}
