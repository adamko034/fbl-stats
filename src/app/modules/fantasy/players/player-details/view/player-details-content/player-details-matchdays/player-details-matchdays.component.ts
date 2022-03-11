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
  @Input() player: PlayerDetails;

  public get playedGames(): TimelineMatchdayItem[] {
    return new ArrayStream<PlayerDetailsGame>(this.player.games)
      .filterQuick((g) => g.matchdayPlayed)
      .convert<TimelineMatchdayItem>(new GameTimelineMatchdayConverter())
      .collect();
  }

  public get futureGames(): TimelineMatchdayItem[] {
    return new ArrayStream<PlayerDetailsGame>(this.player.games)
      .filterQuick((g) => !g.matchdayPlayed)
      .convert<TimelineMatchdayItem>(new GameTimelineMatchdayConverter())
      .collect();
  }

  constructor() {}
}
