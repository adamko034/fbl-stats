import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ArrayStream } from 'src/app/services/array-stream.service';
import { Player } from 'src/app/store/players/models/player.model';
import { Team } from 'src/app/store/teams/models/team.model';

interface PlayerStats {
  id: string;
  name: string;
  position: string;
  price: number;
  score: number;
}

@Component({
  selector: 'app-bundesliga-fixture-details-fantasy-stats',
  templateUrl: './bundesliga-fixture-details-fantasy-stats.component.html',
  styleUrls: ['./bundesliga-fixture-details-fantasy-stats.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BundesligaFixtureDetailsFantasyStatsComponent {
  @Input() homeTeam: Team;
  @Input() awayTeam: Team;

  @Input() set homePlayers(value: Player[]) {
    this.homeTopOverall = this.topOverall(value);
    this.homeTopLast4 = this.topLast4(value);
    this.homePopularityAll = this.popularity(value, 'popularity');
    this.homePopularityTop100 = this.popularity(value, 'top100Popularity');
    this.homePopularityTop500 = this.popularity(value, 'top500Popularity');
  }

  @Input() set awayPlayers(value: Player[]) {
    this.awayTopOverall = this.topOverall(value);
    this.awayTopLast4 = this.topLast4(value);

    this.awayPopularityAll = this.popularity(value, 'popularity');
    this.awayPopularityTop100 = this.popularity(value, 'top100Popularity');
    this.awayPopularityTop500 = this.popularity(value, 'top500Popularity');
  }

  public homeTopOverall: PlayerStats[];
  public homeTopLast4: PlayerStats[];
  public awayTopOverall: PlayerStats[];
  public awayTopLast4: PlayerStats[];

  public homePopularityAll: PlayerStats[];
  public homePopularityTop100: PlayerStats[];
  public homePopularityTop500: PlayerStats[];

  public awayPopularityAll: PlayerStats[];
  public awayPopularityTop100: PlayerStats[];
  public awayPopularityTop500: PlayerStats[];

  private topLast4(players: Player[]) {
    return new ArrayStream(players)
      .convertQuick((player) => this.convertTopLast4(player))
      .orderBy('score', 'dsc')
      .take(6)
      .collect();
  }

  private convertTopLast4(player: Player) {
    const last4Points = new ArrayStream(player.games)
      .orderBy('matchday', 'dsc')
      .take(4)
      .sumBy((g) => g.points);

    return { ...this.convert(player), score: last4Points };
  }

  private topOverall(players: Player[]) {
    return new ArrayStream(players)
      .orderBy('totalPoints', 'dsc')
      .take(6)
      .convertQuick((player) => this.convertTotal(player))
      .collect();
  }

  private convertTotal(player: Player): PlayerStats {
    return { ...this.convert(player), score: player.totalPoints };
  }

  private popularity(value: Player[], popularityField: string): PlayerStats[] {
    return new ArrayStream(value)
      .orderByThenBy({ field: popularityField, order: 'dsc' }, { field: 'totalPoints', order: 'asc' })
      .take(6)
      .convertQuick((player) => ({ ...this.convert(player), score: player[popularityField] }))
      .collect();
  }

  private convert(player: Player): PlayerStats {
    return { id: player.id, name: player.lastName, position: player.position, price: player.price, score: 0 };
  }
}
