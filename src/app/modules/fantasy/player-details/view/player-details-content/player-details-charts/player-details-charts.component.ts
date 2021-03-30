import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { ArrayStream } from 'src/app/services/array-stream.service';
import { ChartConfig } from 'src/app/shared/components/chart/models/chart-config.model';
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

  public get pricesChart(): ChartConfig {
    return {
      width: 320,
      height: 200,
      xAxisLabel: 'Matchday',
      yAxisLabel: 'Price',
      data: [
        {
          name: this.player.name,
          series: new ArrayStream(this.player.fantasy.history.prices)
            .convert(new MatchdayValueToChartPointConverter())
            .collect()
        }
      ],
      yAxisTicks: [1, 5, 10, 15, 20, 25, 30],
      yScaleMin: 1,
      yScaleMax: 30
    };
  }

  public get popularityChart(): ChartConfig {
    return {
      width: 320,
      height: 200,
      xAxisLabel: 'Matchday',
      yAxisLabel: 'Popularity',
      data: [
        {
          name: this.player.name,
          series: new ArrayStream(this.player.fantasy.history.popularity)
            .convert(new MatchdayValueToChartPointConverter())
            .collect()
        }
      ],
      yScaleMin: 0,
      yScaleMax: 100,
      yAxisTicks: [0, 25, 50, 75, 100]
    };
  }

  public get leadersPopularityChart(): ChartConfig {
    return {
      width: 320,
      height: 200,
      xAxisLabel: 'Matchday',
      yAxisLabel: 'Leaders popularity',
      data: [
        {
          name: this.player.name,
          series: new ArrayStream(this.player.fantasy.history.leadersPopularity)
            .convert(new MatchdayValueToChartPointConverter())
            .collect()
        }
      ],
      yScaleMin: 0,
      yScaleMax: 100,
      yAxisTicks: [0, 25, 50, 75, 100]
    };
  }

  public get pointsChart(): ChartConfig {
    return {
      width: 320,
      height: 200,
      xAxisLabel: 'Matchdays',
      yAxisLabel: 'Points',
      data: [
        {
          name: this.player.lastName,
          series: new ArrayStream(this.player.games)
            .filterQuick((g) => g.wasPlayed)
            .convert(new GameToChartPointConverter())
            .collect()
        },
        {
          name: `Top 10 ${this.player.position.toUpperCase()} avg`,
          series: new ArrayStream(this.positionStats.matchdays)
            .convert(new PositionStatsToChartPointConverter())
            .collect()
        }
      ]
    };
  }

  constructor() {}

  ngOnInit(): void {}
}
