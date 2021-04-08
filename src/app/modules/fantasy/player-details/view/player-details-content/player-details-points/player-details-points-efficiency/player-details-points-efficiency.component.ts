import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
export class PlayerDetailsPointsEfficiencyComponent implements OnInit {
  @Input() player: PlayerDetails;

  private filters = PlayerDetailsGameFilter;

  public state: State;

  constructor(private playerGamesService: PlayerGamesService, private router: Router) {}

  public ngOnInit(): void {
    this.createState();
  }

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
      away: this.createStateRowValue(minPoints, this.filters.AWAY),
      home: this.createStateRowValue(minPoints, this.filters.HOME),
      overall: this.createStateRowValue(minPoints, this.filters.OVERALL),
      last5: this.createStateRowValue(minPoints, this.filters.LAST5),
      vsTop6: this.createStateRowValue(minPoints, this.filters.VsTOP6),
      vsWorst6: this.createStateRowValue(minPoints, this.filters.VsWORST6)
    };
  }

  private createStateRowValue(minPoints: number, filter: PlayerDetailsGameFilter): string {
    const games = new PlayerDetailsGamesFilters(filter).filter(this.player.games);
    const gamesCount = this.playerGamesService.getGamesCountWithPointsGreaterThan(games, minPoints);
    const percentage = gamesCount.length === 0 ? 0 : Math.round((gamesCount.length / games.length) * 1000) / 10;

    return `${percentage}% (${gamesCount.length}/${games.length})`;
  }
}
