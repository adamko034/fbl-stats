import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { map } from 'rxjs/operators';
import { SwitcherItem } from 'src/app/common/components/ui/switcher/models/switcher-item.model';
import { Position } from 'src/app/common/players/models/position.enum';
import { ArrayStream } from 'src/app/services/array-stream.service';
import { LineupPlayer } from 'src/app/shared/components/team-lineup/models/lineup-player.model';
import { Lineup } from 'src/app/shared/components/team-lineup/models/lineup.model';
import { HistoryPlayer } from 'src/app/store/history/models/history-player.model';
import { History } from 'src/app/store/history/models/history.model';
import { HistoryPlayerToLineupConverter } from '../../converters/history-player-to-lineup.converter';
import { HistorySummaryLineupType } from '../../models/history-summary-lineup-type.enum';
import { HistorySummaryLineupPlayer } from './history-summary-lineup-player.model';

@UntilDestroy()
@Component({
  selector: 'app-history-summary-lineup',
  templateUrl: './history-summary-lineup.component.html',
  styleUrls: ['./history-summary-lineup.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HistorySummaryLineupComponent implements OnInit {
  private allPlayers: HistoryPlayer[];

  public maxPrice: number = null;
  public maxPopularity: number = 100;
  public lineupType: HistorySummaryLineupType = HistorySummaryLineupType.OVERALL;

  public lineupTypes: SwitcherItem[] = [
    { value: HistorySummaryLineupType.OVERALL, description: 'Overall' },
    { value: HistorySummaryLineupType.FIRST_LEG, description: '1st leg' },
    { value: HistorySummaryLineupType.SECOND_LEG, description: '2nd leg' },
    { value: HistorySummaryLineupType.HOME, description: 'Home' },
    { value: HistorySummaryLineupType.AWAY, description: 'Away' }
  ];

  public lineup: Lineup;
  public team: { [position: string]: HistorySummaryLineupPlayer[] };

  constructor(private route: ActivatedRoute, private _changeDetection: ChangeDetectorRef) {}

  public ngOnInit(): void {
    this.route.data
      .pipe(
        map((data) => data.history),
        untilDestroyed(this)
      )
      .subscribe((history: History) => {
        this.allPlayers = [...history.players];
        this.setLineup();
        this._changeDetection.detectChanges();
      });
  }

  public onPriceChange(value: number): void {
    this.maxPrice = value;
    this.setLineup();
  }

  public onPopularityChange(value: number): void {
    this.maxPopularity = value;
    this.setLineup();
  }

  public onLineupTypeChange(value: HistorySummaryLineupType): void {
    this.lineupType = value;
    this.setLineup();
  }

  private setLineup(): void {
    const filtered = new ArrayStream<HistoryPlayer>(this.allPlayers)
      .convertQuick((player) => this.convertToInner(player))
      .orderBy('points', 'dsc')
      .filterQuick((p) => (!this.maxPrice && this.maxPrice != 0) || p.price <= this.maxPrice)
      .filterQuick((p) => p.popularity <= this.maxPopularity)
      .collect();

    const goalkeepers = this.getLineupPlayers(filtered, Position.GK, 2);
    const defenders = this.getLineupPlayers(filtered, Position.DEF, 5);
    const midfielders = this.getLineupPlayers(filtered, Position.MID, 5);
    const forwards = this.getLineupPlayers(filtered, Position.FOR, 3);

    this.team = { goalkeepers, defenders, midfielders, forwards };

    this.lineup = {
      defenders: this.convertToLineupPlayers(defenders, 3),
      forwards: this.convertToLineupPlayers(forwards, 3),
      midfielders: this.convertToLineupPlayers(midfielders, 4),
      goalkeeper: this.convertToLineupPlayers(goalkeepers, 1)[0]
    };
  }

  private convertToInner(player: HistoryPlayer): HistorySummaryLineupPlayer {
    const { name, lastName, position, subPosition, price, popularity, teamShort } = player;
    const points = this.calculatePoints(player);

    return { name, lastName, position, subPosition, price, popularity, teamShort, points };
  }

  private calculatePoints(player: HistoryPlayer): number {
    const gamesArrayStream = new ArrayStream(player.games);
    switch (this.lineupType) {
      case HistorySummaryLineupType.OVERALL:
        return gamesArrayStream.sumBy((g) => g.points);
      case HistorySummaryLineupType.FIRST_LEG:
        return gamesArrayStream.filterQuick((g) => g.matchday <= 17).sumBy((g) => g.points);
      case HistorySummaryLineupType.SECOND_LEG:
        return gamesArrayStream.filterQuick((g) => g.matchday > 17).sumBy((g) => g.points);
      case HistorySummaryLineupType.HOME:
        return gamesArrayStream.filterQuick((g) => g.isHome).sumBy((g) => g.points);
      default:
        return gamesArrayStream.filterQuick((g) => !g.isHome).sumBy((g) => g.points);
    }
  }

  private getLineupPlayers(
    filteredAndOrderedPlayers: HistorySummaryLineupPlayer[],
    position: Position,
    count: number
  ): HistorySummaryLineupPlayer[] {
    return new ArrayStream<HistorySummaryLineupPlayer>(filteredAndOrderedPlayers)
      .filterQuick((p) => p.position.toLocaleLowerCase() === position.toLocaleLowerCase())
      .take(count)
      .collect();
  }

  private convertToLineupPlayers(players: HistorySummaryLineupPlayer[], n: number): LineupPlayer[] {
    return new ArrayStream<HistorySummaryLineupPlayer>(players)
      .take(n)
      .convert(new HistoryPlayerToLineupConverter())
      .collect();
  }
}
