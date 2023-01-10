import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { PlayerGamesService } from 'src/app/modules/core/players/services/player-games.service';
import { PlayerDetailsGamesFilters } from '../../../../filters/player-details-games.filters';
import { PlayerDetailsGameFilter } from '../../../../models/enums/player-details-game-filter.enum';
import { PlayerDetails } from '../../../../models/player-details.model';

interface StateRow {
  overall: string;
  last5: string;
  home: string;
  away: string;
  vsTop6: string;
  vsWorst6: string;
}

interface State {
  five: StateRow;
  ten: StateRow;
  fifteen: StateRow;
  twenty: StateRow;
}

@Component({
  selector: 'app-player-details-points-efficiency',
  templateUrl: './player-details-points-efficiency.component.html',
  styleUrls: ['./player-details-points-efficiency.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlayerDetailsPointsEfficiencyComponent {
  private _player: PlayerDetails;
  @Input() set player(value: PlayerDetails) {
    if (value) {
      this._player = value;
      this.createState();
    }
  }

  public state: State;

  constructor(private playerGamesService: PlayerGamesService) {}

  private createState(): void {
    this.state = {
      five: this.createStateRow(5),
      ten: this.createStateRow(10),
      fifteen: this.createStateRow(15),
      twenty: this.createStateRow(20)
    };
  }

  private createStateRow(minPoints: number): StateRow {
    return {
      away: this.createStateRowValue(minPoints, PlayerDetailsGameFilter.AWAY),
      home: this.createStateRowValue(minPoints, PlayerDetailsGameFilter.HOME),
      overall: this.createStateRowValue(minPoints, PlayerDetailsGameFilter.OVERALL),
      last5: this.createStateRowValue(minPoints, PlayerDetailsGameFilter.LAST5),
      vsTop6: this.createStateRowValue(minPoints, PlayerDetailsGameFilter.VsTOP6),
      vsWorst6: this.createStateRowValue(minPoints, PlayerDetailsGameFilter.VsWORST6)
    };
  }

  private createStateRowValue(minPoints: number, filter: PlayerDetailsGameFilter): string {
    const games = new PlayerDetailsGamesFilters(filter, this.playerGamesService).filter(this._player.games);
    const gamesCount = this.playerGamesService.getGamesCountWithPointsGreaterThan(games, minPoints);
    const percentage = gamesCount.length === 0 ? 0 : Math.round((gamesCount.length / games.length) * 1000) / 10;

    return `${percentage}%`;
    //return `${percentage}% (${gamesCount.length}/${games.length})`;
  }
}
