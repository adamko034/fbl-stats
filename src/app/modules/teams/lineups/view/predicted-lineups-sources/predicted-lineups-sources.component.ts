import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ChartConfig } from 'src/app/common/components/ui/chart/models/chart-config.model';
import { ChartData } from 'src/app/common/components/ui/chart/models/chart-data.model';
import { ArrayStream } from 'src/app/services/array-stream.service';
import { MatchdayValueToChartPointConverter } from 'src/app/shared/converters/matchday-value-to-chart-point.converter';
import { MatchdayValue } from 'src/app/shared/models/matchday-value.model';
import { PredictedLineupsTeamAccuracy } from '../../models/predicted-lineups-team-accuracy.model';
import { PredictedLineupsSource } from '../../store/models/predicted-lineups-source.model';

@UntilDestroy()
@Component({
  selector: 'app-predicted-lineups-sources',
  templateUrl: './predicted-lineups-sources.component.html',
  styleUrls: ['./predicted-lineups-sources.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PredictedLineupsSourcesComponent implements OnInit {
  private _sourcesByMatchdayChartConfig: ChartConfig;

  public get sourcesByMatchdayChartConfig(): ChartConfig {
    return this._sourcesByMatchdayChartConfig;
  }

  public sources: PredictedLineupsSource[];
  public teams$: Observable<PredictedLineupsTeamAccuracy[]>;

  constructor(private route: ActivatedRoute) {}

  public ngOnInit(): void {
    this.teams$ = this.route.data.pipe(map((data) => data.teams));
    this.route.data
      .pipe(
        map((data) => data.sources),
        untilDestroyed(this)
      )
      .subscribe((sources: PredictedLineupsSource[]) => {
        this.sources = sources;
        this.setChartConfig(sources);
      });
  }

  private setChartConfig(sources: PredictedLineupsSource[]) {
    let min = 100;
    const data: ChartData[] = sources.map((source) => {
      const points = new ArrayStream<MatchdayValue>(source.accuracy.matchdays)
        .filterQuick((m) => m.value != null)
        .convert(new MatchdayValueToChartPointConverter('%'))
        .collect();
      const sourceMin = Math.min(...points.map((p) => p.value));

      if (sourceMin < min) {
        min = sourceMin;
      }

      return {
        name: source.displayName,
        xAxisLabel: 'Matchday',
        yAxisLabel: 'Avg Accuracy',
        series: points
      };
    });

    this._sourcesByMatchdayChartConfig = {
      title: 'Sources Accuracy',
      data,
      yScaleMax: 100,
      yScaleMin: Math.floor(min / 10) * 10,
      showLegend: true,
      legendPosition: 'below',
      animations: true,
      colors: ['#c80a00', '#0A00C8', '#00C80A', '#FFA500'],
      showDialog: true,
      xAxisLabel: 'matchday',
      yAxisLabel: 'accuracy',
      dialogConfig: {
        data,
        columns: ['MD', 'BL', 'KK', 'LI', 'BL [EN]'],
        showDiff: false,
        showLegend: true
      }
    };
  }
}
