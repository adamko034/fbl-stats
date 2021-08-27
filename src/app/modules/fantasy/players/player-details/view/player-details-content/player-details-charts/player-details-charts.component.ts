import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { ArrayStream } from 'src/app/services/array-stream.service';
import { ChartConfig } from 'src/app/shared/components/chart/models/chart-config.model';
import { ChartPoint } from 'src/app/shared/components/chart/models/chart-point.model';
import { PieChartConfig } from 'src/app/shared/components/pie-chart/models/pie-chart-config.model';
import { MatchdayValueToChartPointConverter } from 'src/app/shared/converters/matchday-value-to-chart-point.converter';
import { PositionStats } from 'src/app/store/positions/models/position-stats.model';
import { GameToChartPointConverter } from '../../../converters/game-to-chart-point.converter';
import { PositionStatsToChartPointConverter } from '../../../converters/position-stats-to-chart-point.converter';
import { PlayerDetails } from '../../../models/player-details.model';

@Component({
  selector: 'app-player-details-charts',
  templateUrl: './player-details-charts.component.html',
  styleUrls: ['./player-details-charts.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlayerDetailsChartsComponent implements OnInit {
  @Input() player: PlayerDetails;
  @Input() positionStats: PositionStats;

  private _gamesPlayedChart: PieChartConfig;
  private _gamesStartedChart: PieChartConfig;
  private _games70MinChart: PieChartConfig;
  private _gamesWon: PieChartConfig;

  private get pricesChanges() {
    return new ArrayStream(this.player.fantasy.history.prices).convert(new MatchdayValueToChartPointConverter('M'));
  }

  private get popularityChanges() {
    return new ArrayStream(this.player.fantasy.history.popularity).convert(new MatchdayValueToChartPointConverter('%'));
  }

  private get leadersPopularityChanges() {
    return new ArrayStream(this.player.fantasy.history.leadersPopularity).convert(
      new MatchdayValueToChartPointConverter('%')
    );
  }

  private get pointsChanges() {
    return new ArrayStream(this.player.games)
      .filterQuick((g) => g.wasPlayed && g.points !== undefined)
      .convert(new GameToChartPointConverter());
  }

  private get top10AvgPointsChanges() {
    return new ArrayStream(this.positionStats.matchdays)
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

  public get leadersPopularityChart(): ChartConfig {
    return {
      title: 'Leaders popularity changes',
      data: [
        {
          name: this.player.name,
          series: this.orderByAndGetLast(this.leadersPopularityChanges, 'dsc', 10).collect()
        }
      ],
      showDialog: true,
      dialogConfig: {
        data: [
          {
            name: this.player.name,
            series: this.leadersPopularityChanges.collect()
          }
        ]
      },
      xAxisLabel: 'Matchday',
      yAxisLabel: 'Leaders popularity',
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
        showLegend: true
      }
    };
  }

  public get gamesPlayedChart(): PieChartConfig {
    return this._gamesPlayedChart;
  }

  public get gamesStartedChart(): PieChartConfig {
    return this._gamesStartedChart;
  }

  public get games70MinChart(): PieChartConfig {
    return this._games70MinChart;
  }

  public get gamesWonChart(): PieChartConfig {
    return this._gamesWon;
  }

  private get minMatchday() {
    return Math.min(...this.player.games.filter((g) => g.wasPlayed && g.points !== undefined).map((g) => g.matchday));
  }

  constructor() {}

  public ngOnInit(): void {
    const allGamesCount = this.player.games.filter((g) => g.wasPlayed).length;
    this._gamesPlayedChart = {
      totalValue: allGamesCount,
      name: 'Played',
      value: this.player.games.filter((g) => g.hasPlayed).length,
      label: 'Games played'
    };

    this._gamesStartedChart = {
      totalValue: allGamesCount,
      name: 'Started',
      value: this.player.games.filter((g) => g.started).length,
      label: 'Games started'
    };

    this._games70MinChart = {
      totalValue: this.player.games.filter((g) => g.wasPlayed && g.hasPlayed).length,
      name: '70min',
      value: this.player.games.filter((g) => g.hasPlayedMoreThan70Min).length,
      label: 'On field for >= 70min'
    };

    this._gamesWon = {
      totalValue: this.player.games.filter((g) => g.wasPlayed && g.hasPlayed).length,
      name: 'Won',
      value: this.player.games.filter((g) => g.wasPlayed && g.hasPlayed && g.result === 1).length,
      label: 'Games won when played'
    };
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
