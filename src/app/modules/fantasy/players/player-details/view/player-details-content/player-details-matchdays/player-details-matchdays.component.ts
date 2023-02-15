import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ArrayStream } from 'src/app/services/array-stream.service';
import { TimelineMatchdayItem } from 'src/app/shared/components/timeline-matchdays/models/timeline-matchday-item.model';
import { GameTimelineMatchdayConverter } from '../../../converters/game-timeline-matchday.converter';
import { PlayerDetailsGame } from '../../../models/player-details-game.model';
import { PlayerDetails } from '../../../models/player-details.model';

@Component({
  selector: 'app-player-details-matchdays',
  templateUrl: './player-details-matchdays.component.html',
  styleUrls: ['./player-details-matchdays.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlayerDetailsMatchdaysComponent {
  @Input() set player(value: PlayerDetails) {
    this._futureGames = new ArrayStream<PlayerDetailsGame>(value.games)
      .filterQuick((g) => !g.matchdayPlayed)
      .convert<TimelineMatchdayItem>(new GameTimelineMatchdayConverter())
      .collect();

    this._playedGames = new ArrayStream<PlayerDetailsGame>(value.games)
      .filterQuick((g) => g.matchdayPlayed)
      .convert<TimelineMatchdayItem>(new GameTimelineMatchdayConverter())
      .collect();
  }

  private _playedGames: TimelineMatchdayItem[] = [];
  private _futureGames: TimelineMatchdayItem[] = [];

  public get playedGames(): TimelineMatchdayItem[] {
    return this._playedGames;
  }

  public get futureGames(): TimelineMatchdayItem[] {
    return this._futureGames;
  }

  constructor() {}
}
