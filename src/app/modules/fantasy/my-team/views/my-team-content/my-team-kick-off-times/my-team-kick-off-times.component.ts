import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ArrayStream } from 'src/app/services/array-stream.service';
import { MyTeamStore } from 'src/app/store/fantasy/my-team/my-team.store';
import { MatchdayFixtures } from 'src/app/store/fixtures/models/matchday-fixtures.model';
import { Player } from 'src/app/store/players/models/player.model';
import { Logger } from 'src/app/utils/logger';

@Component({
  selector: 'app-my-team-kick-off-times',
  templateUrl: './my-team-kick-off-times.component.html',
  styleUrls: ['./my-team-kick-off-times.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MyTeamKickOffTimesComponent implements OnChanges, OnInit {
  @Input() players: Player[];
  @Input() nextMatchdaysFixtures: MatchdayFixtures[];
  @Input() kickOffTimesMatchdays: number;
  @Input() lastKnownMatchday: number;

  private _matchdaysFixtures: MatchdayFixtures[] = [];
  public get matchdaysFixtures(): MatchdayFixtures[] {
    return this._matchdaysFixtures;
  }

  private _nextMatchdays: number[] = [];
  public get nextMatchdays(): number[] {
    return this._nextMatchdays;
  }

  constructor(private myTeamStore: MyTeamStore) {}

  public ngOnInit(): void {
    this.setNextMatchdaysOptions();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.kickOffTimesMatchdays) {
      this.setIncludedMatchdaysFixtures();
    }
  }

  public onNextMatchdaysChanged(count: number): void {
    this.myTeamStore.changeKickOffTimesMatchdays(count);
  }

  private setNextMatchdaysOptions() {
    const nextMatchday = new ArrayStream<MatchdayFixtures>(this.matchdaysFixtures).minBy((f) => f.matchdayNumber);

    for (let i = 2; i < this.lastKnownMatchday - nextMatchday + 1; i++) {
      this._nextMatchdays.push(i);
    }
  }

  private setIncludedMatchdaysFixtures() {
    Logger.logDev('my team kick off times, filtering matchdays');
    let stream = new ArrayStream<MatchdayFixtures>(this.nextMatchdaysFixtures)
      .filterQuick((f) => f.matchdayNumber <= this.lastKnownMatchday)
      .orderBy('matchdayNumber', 'asc');

    if (this.kickOffTimesMatchdays != 0) {
      stream = stream.take(this.kickOffTimesMatchdays);
    }

    this._matchdaysFixtures = stream.collect();
  }
}
