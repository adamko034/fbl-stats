import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { map } from 'rxjs/operators';
import { PlayerPosition } from 'src/app/modules/fantasy/players/overall/models/players-filters';
import { ArrayStream } from 'src/app/services/array-stream.service';
import { SwitchItem } from 'src/app/shared/components/switch/models/switch-item.model';
import { LineupPlayer } from 'src/app/shared/components/team-lineup/models/lineup-player.model';
import { Lineup } from 'src/app/shared/components/team-lineup/models/lineup.model';
import { HistoryPlayer } from 'src/app/store/history/models/history-player.model';
import { History } from 'src/app/store/history/models/history.model';
import { HistoryPlayerToLineupConverter } from '../../../converters/history-player-to-lineup.converter';
import { HistorySummaryLineupType } from '../../../models/history-summary-lineup-type.enum';

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

  public lineupTypes: SwitchItem[] = [
    { value: HistorySummaryLineupType.OVERALL, description: 'Overall' },
    { value: HistorySummaryLineupType.FIRST_LEG, description: '1st leg' },
    { value: HistorySummaryLineupType.SECOND_LEG, description: '2nd leg' },
    { value: HistorySummaryLineupType.HOME, description: 'Home' },
    { value: HistorySummaryLineupType.AWAY, description: 'Away' }
  ];

  public lineup: Lineup;
  public team: { [position: string]: HistoryPlayer[] };

  constructor(private route: ActivatedRoute) {}

  public ngOnInit(): void {
    this.route.data
      .pipe(
        map((data) => data.history),
        untilDestroyed(this)
      )
      .subscribe((history: History) => {
        this.allPlayers = [...history.players];
        this.setLineup();
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
      .orderBy(this.getFieldBasedOnLineupType(), 'dsc')
      .filterQuick((p) => (!this.maxPrice && this.maxPrice != 0) || p.price <= this.maxPrice)
      .filterQuick((p) => p.popularity <= this.maxPopularity)
      .collect();

    const goalkeepers = this.getLineupPlayers(filtered, PlayerPosition.GK, 2);
    const defenders = this.getLineupPlayers(filtered, PlayerPosition.DEF, 5);
    const midfielders = this.getLineupPlayers(filtered, PlayerPosition.MID, 5);
    const forwards = this.getLineupPlayers(filtered, PlayerPosition.FOR, 3);

    this.team = { goalkeepers, defenders, midfielders, forwards };

    this.lineup = {
      defenders: this.convertToLineupPlayers(defenders, 3),
      forwards: this.convertToLineupPlayers(forwards, 3),
      midfielders: this.convertToLineupPlayers(midfielders, 4),
      goalkeeper: this.convertToLineupPlayers(goalkeepers, 1)[0]
    };
  }

  public getFieldBasedOnLineupType(): string {
    switch (this.lineupType) {
      case HistorySummaryLineupType.AWAY:
        return 'awayGamesPoints';
      case HistorySummaryLineupType.HOME:
        return 'homeGamesPoints';
      case HistorySummaryLineupType.FIRST_LEG:
        return 'firstLegPoints';
      case HistorySummaryLineupType.SECOND_LEG:
        return 'secondLegPoints';
      default:
        return 'totalPoints';
    }
  }

  private getLineupPlayers(
    filteredAndOrderedPlayers: HistoryPlayer[],
    position: PlayerPosition,
    count: number
  ): HistoryPlayer[] {
    return new ArrayStream<HistoryPlayer>(filteredAndOrderedPlayers)
      .filterQuick((p) => p.position.toLocaleLowerCase() === position.toLocaleLowerCase())
      .take(count)
      .collect();
  }

  private convertToLineupPlayers(players: HistoryPlayer[], n: number): LineupPlayer[] {
    return new ArrayStream<HistoryPlayer>(players).take(n).convert(new HistoryPlayerToLineupConverter()).collect();
  }
}
