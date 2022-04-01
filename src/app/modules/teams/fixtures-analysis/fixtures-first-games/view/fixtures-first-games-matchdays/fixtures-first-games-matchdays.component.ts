import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { ArrayStream } from 'src/app/services/array-stream.service';
import { FixturesFirstGamesMatchday } from '../../models/fixtures-first-games-matchday.model';

@Component({
  selector: 'app-fixtures-first-games-matchdays',
  templateUrl: './fixtures-first-games-matchdays.component.html',
  styleUrls: ['./fixtures-first-games-matchdays.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FixturesFirstGamesMatchdaysComponent implements OnInit {
  @Input() matchdays: FixturesFirstGamesMatchday[];

  private _matchdaysRangeString: string;
  public get matchdaysRangeString(): string {
    return this._matchdaysRangeString;
  }

  constructor() {}

  ngOnInit(): void {
    this.setMatchdayRangeString();
  }

  public setMatchdayRangeString() {
    const min = new ArrayStream<FixturesFirstGamesMatchday>(this.matchdays).minBy((m) => m.matchday);
    const max = new ArrayStream<FixturesFirstGamesMatchday>(this.matchdays).maxBy((m) => m.matchday);

    if (min === max) {
      this._matchdaysRangeString = `MD${min}`;
      return;
    }

    this._matchdaysRangeString = `MD${min} - MD${max}`;
  }
}
