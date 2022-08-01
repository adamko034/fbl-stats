import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Team } from 'src/app/store/teams/models/team.model';

@Component({
  selector: 'app-fixtures-kickoff-times',
  templateUrl: './fixtures-kickoff-times.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FixturesKickoffTimesComponent implements OnInit {
  private _teams$: Observable<Team[]>;
  public get teams$(): Observable<Team[]> {
    return this._teams$;
  }

  private _lastMatchday$: Observable<number>;
  public get lastMatchday$(): Observable<number> {
    return this._lastMatchday$;
  }

  private _lastKnownMatchday$: Observable<number>;
  public get lastKnownMatchday$(): Observable<number> {
    return this._lastKnownMatchday$;
  }

  private _nextUnlimitedTransfersMatchday$: Observable<number>;
  public get nextUnlimitedTransfersMatchday$(): Observable<number> {
    return this._nextUnlimitedTransfersMatchday$;
  }

  constructor(private _route: ActivatedRoute) {}

  ngOnInit(): void {
    this._lastMatchday$ = this._route.data.pipe(map((data) => data.properties.lastMatchday));
    this._lastKnownMatchday$ = this._route.data.pipe(map((data) => data.properties.lastKnownMatchday));
    this._teams$ = this._route.data.pipe(map((data) => data.teams));
    this._nextUnlimitedTransfersMatchday$ = this._route.data.pipe(
      map((data) => {
        return data.nextUnlimitedTransfers ? data.nextUnlimitedTransfers.matchday : 0;
      })
    );
  }
}
