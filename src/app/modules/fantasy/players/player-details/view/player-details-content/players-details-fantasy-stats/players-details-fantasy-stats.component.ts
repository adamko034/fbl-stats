import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { PlayerPointsStat } from 'src/app/store/players/models/player-points-stat.model';
import { PlayerDetails } from '../../../models/player-details.model';

@Component({
  selector: 'app-players-details-fantasy-stats',
  templateUrl: './players-details-fantasy-stats.component.html',
  styleUrls: ['./players-details-fantasy-stats.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class PlayersDetailsFantasyStatsComponent {
  @Input() player: PlayerDetails;

  public get overall(): PlayerPointsStat {
    return this.player.fantasyPoints.overall;
  }

  public get last5(): PlayerPointsStat {
    return this.player.fantasyPoints.last5;
  }

  public get gamesPlayed(): number {
    return this.player.games.filter((g) => g.hasPlayed).length;
  }
}
