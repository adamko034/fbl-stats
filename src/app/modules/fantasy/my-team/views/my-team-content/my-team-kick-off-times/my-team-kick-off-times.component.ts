import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { PlayerPosition } from 'src/app/modules/fantasy/players/overall/models/players-filters';
import { MatchdayFixtures } from 'src/app/store/fixtures/models/matchday-fixtures.model';
import { Player } from 'src/app/store/players/models/player.model';
import { Logger } from 'src/app/utils/logger';
import { MyTeamKickOffTimes } from './my-team-kick-off-times.model';

@Component({
  selector: 'app-my-team-kick-off-times',
  templateUrl: './my-team-kick-off-times.component.html',
  styleUrls: ['./my-team-kick-off-times.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MyTeamKickOffTimesComponent implements OnChanges {
  @Input() players: Player[];
  @Input() nextMatchdayFixtures: MatchdayFixtures;

  public _maxCounts: { [position: string]: number } = {};

  private _data: MyTeamKickOffTimes[] = [];
  public get data(): MyTeamKickOffTimes[] {
    return this._data;
  }

  private _heights: { [position: string]: number } = {};
  public get heights(): { [position: string]: number } {
    return this._heights;
  }

  constructor() {}

  public ngOnChanges(changes: SimpleChanges): void {
    Logger.logDev('my teamm kick off times, on changes, calculating data');
    this.setData();
    //this.setHeights();
  }

  private setData(): void {
    if (this.players && this.nextMatchdayFixtures) {
      this._data = [];

      this.nextMatchdayFixtures.dates.map((date) => {
        const playersOnDate = this.players.filter((p) => p.nextGame.date === date);
        const myPlayers = playersOnDate.map((p) => ({
          id: p.id,
          name: p.name,
          position: p.position,
          teamShort: p.teamShort
        }));

        const item: MyTeamKickOffTimes = {
          date,
          gk: myPlayers.filter((p) => p.position === PlayerPosition.GK),
          def: myPlayers.filter((p) => p.position === PlayerPosition.DEF),
          mid: myPlayers.filter((p) => p.position === PlayerPosition.MID),
          for: myPlayers.filter((p) => p.position === PlayerPosition.FOR)
        };

        this.setMaxCounts(item);
        this._data.push(item);
      });
    }
  }

  private setMaxCounts(item: MyTeamKickOffTimes): void {
    ['gk', 'def', 'mid', 'for'].forEach((position) => {
      const actual = item[position].length;
      const existing = this._maxCounts[position];

      if (!existing || actual > existing) {
        this._maxCounts[position] = actual;
      }
    });
  }

  public getSectionPositionColorClass(position: string, count: number): string {
    const css = 'position-';
    if (position === PlayerPosition.GK && count === 2) {
      return `${css}error`;
    }

    if (position === PlayerPosition.FOR && count === 3) {
      return `${css}error`;
    }

    if (position === PlayerPosition.DEF || position === PlayerPosition.MID) {
      if (count === 4) {
        return `${css}warning`;
      }

      if (count === 5) {
        return `${css}error`;
      }

      return `${css}normal`;
    }
  }

  public getSectionPositionHeight(position: string): string {
    return `${this._maxCounts[position] * 25}px`;
  }
}
