import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ChartConfig } from 'src/app/common/components/ui/chart/models/chart-config.model';
import { ChartPoint } from 'src/app/common/components/ui/chart/models/chart-point.model';
import { PieChartConfig } from 'src/app/common/components/ui/pie-chart/pie-chart-config.model';
import { ArrayStream } from 'src/app/services/array-stream.service';
import { MatchdayValueToChartPointConverter } from 'src/app/shared/converters/matchday-value-to-chart-point.converter';
import { PositionStatsMatchday } from 'src/app/store/positions/models/position-stats-matchday.model';
import { PositionsStats } from 'src/app/store/positions/models/positions-stats.model';
import { GameToChartPointConverter } from '../../../converters/game-to-chart-point.converter';
import { PositionStatsToChartPointConverter } from '../../../converters/position-stats-to-chart-point.converter';
import { PlayerDetails } from '../../../models/player-details.model';

@Component({
  selector: 'app-player-details-charts',
  templateUrl: './player-details-charts.component.html',
  styleUrls: ['./player-details-charts.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlayerDetailsChartsComponent {
  @Input() player: PlayerDetails;
  @Input() positionsStats: PositionsStats;

  private get pricesChanges() {
    return new ArrayStream(this.player.fantasy.history.prices).convert(new MatchdayValueToChartPointConverter('M'));
  }

  private get popularityChanges() {
    return new ArrayStream(this.player.fantasy.history.popularity).convert(new MatchdayValueToChartPointConverter('%'));
  }

  private get top500PopularityChanges() {
    return new ArrayStream(this.player.fantasy.history.top500Popularity).convert(
      new MatchdayValueToChartPointConverter('%')
    );
  }

  private get top100PopularityChanges() {
    return new ArrayStream(this.player.fantasy.history.top100Popularity).convert(
      new MatchdayValueToChartPointConverter('%')
    );
  }

  private get pointsChanges() {
    return new ArrayStream(this.player.games)
      .filterQuick((g) => g.matchdayPlayed && g.points !== undefined)
      .convert(new GameToChartPointConverter());
  }

  private get top10AvgPointsChanges() {
    const top10PositionStats: PositionStatsMatchday[] =
      this.positionsStats.top10EachPosition.positions[this.player.position];

    return new ArrayStream(top10PositionStats)
      .filterQuick((s) => s.matchday >= this.minMatchday)
      .convert(new PositionStatsToChartPointConverter());
  }

  public get pricesChart(): ChartConfig {
    return {
      title: 'Price changes',
      xAxisLabel: 'Matchday',
      yAxisLabel: 'Price',
      data: [
        {
          name: this.player.name,
          series: this.orderByAndGetLast(this.pricesChanges, 'dsc', 10).collect()
        }
      ],
      dialogConfig: {
        data: [
          {
            name: this.player.name,
            series: this.pricesChanges.collect()
          }
        ]
      },
      yAxisTicks: [1, 5, 10, 15, 20, 25, 30],
      yScaleMin: 1,
      yScaleMax: 30
    };
  }

  public get popularityChart(): ChartConfig {
    return {
      title: 'Popularity changes',
      data: [
        {
          name: this.player.name,
          series: this.orderByAndGetLast(this.popularityChanges, 'dsc', 10).collect()
        }
      ],
      xAxisLabel: 'Matchday',
      yAxisLabel: 'Popularity',
      showDialog: true,
      dialogConfig: {
        data: [
          {
            name: this.player.name,
            series: this.popularityChanges.collect()
          }
        ]
      },
      yScaleMin: 0,
      yScaleMax: 100,
      yAxisTicks: [0, 25, 50, 75, 100]
    };
  }

  public get top100PopularityChart(): ChartConfig {
    return {
      title: 'Top 100 popularity changes',
      data: [
        {
          name: this.player.name,
          series: this.orderByAndGetLast(this.top100PopularityChanges, 'dsc', 10).collect()
        }
      ],
      showDialog: true,
      dialogConfig: {
        data: [
          {
            name: this.player.name,
            series: this.top100PopularityChanges.collect()
          }
        ]
      },
      yScaleMin: 0,
      yScaleMax: 100,
      yAxisTicks: [0, 25, 50, 75, 100]
    };
  }

  public get top500PopularityChart(): ChartConfig {
    return {
      title: 'Top 500 popularity changes',
      data: [
        {
          name: this.player.name,
          series: this.orderByAndGetLast(this.top500PopularityChanges, 'dsc', 10).collect()
        }
      ],
      showDialog: true,
      dialogConfig: {
        data: [
          {
            name: this.player.name,
            series: this.top500PopularityChanges.collect()
          }
        ]
      },
      yScaleMin: 0,
      yScaleMax: 100,
      yAxisTicks: [0, 25, 50, 75, 100]
    };
  }

  public get pointsChart(): ChartConfig {
    return {
      title: 'Points per matchday',
      xAxisLabel: 'Matchday',
      yAxisLabel: 'Points',
      data: [
        {
          name: this.player.lastName,
          series: this.orderByAndGetLast(this.pointsChanges, 'dsc', 10).collect()
        },
        {
          name: `Top 10 ${this.player.position.toUpperCase()} avg`,
          tableColumnName: 'AVG points',
          series: this.orderByAndGetLast(this.top10AvgPointsChanges, 'dsc', 10).collect()
        }
      ],
      dialogConfig: {
        data: [
          {
            name: this.player.lastName,
            series: this.pointsChanges.collect()
          },
          {
            name: `Top 10 ${this.player.position.toUpperCase()} avg`,
            tableColumnName: 'AVG points',
            series: this.top10AvgPointsChanges.collect()
          }
        ],
        showLegend: true,
        columns: ['MD', this.player.lastName, 'MD avg points']
      }
    };
  }

  public get gamesPlayedChart(): PieChartConfig {
    return {
      totalValue: this.allGamesCount(),
      name: 'Played',
      value: this.player.games.filter((g) => g.hasPlayed && g.gameValid).length,
      label: 'Games played'
    };
  }

  public get gamesStartedChart(): PieChartConfig {
    return {
      totalValue: this.allGamesCount(),
      name: 'Started',
      value: this.player.games.filter((g) => g.started && g.gameValid).length,
      label: 'Games started'
    };
  }

  public get games70MinChart(): PieChartConfig {
    return {
      totalValue: this.player.games.filter((g) => g.wasPlayed && g.hasPlayed && g.gameValid).length,
      name: '70min',
      value: this.player.games.filter((g) => g.hasPlayedMoreThan70Min).length,
      label: '70 min'
    };
  }

  public get gamesWonChart(): PieChartConfig {
    return {
      totalValue: this.player.games.filter((g) => g.wasPlayed && g.hasPlayed && g.gameValid).length,
      name: 'Won',
      value: this.player.games.filter((g) => g.wasPlayed && g.hasPlayed && g.gameValid && g.result === 1).length,
      label: 'Games won'
    };
  }

  private get minMatchday() {
    return Math.min(...this.player.games.filter((g) => g.wasPlayed && g.points !== undefined).map((g) => g.matchday));
  }

  private allGamesCount(): number {
    return this.player.games.filter((g) => g.wasPlayed && g.gameValid).length;
  }

  private orderByAndGetLast(
    arrayStream: ArrayStream<ChartPoint>,
    orderyBy: 'asc' | 'dsc',
    lastN: number
  ): ArrayStream<ChartPoint> {
    return arrayStream
      .orderBy('order', orderyBy)
      .take(lastN)
      .orderBy('order', orderyBy === 'asc' ? 'dsc' : 'asc');
  }
}
