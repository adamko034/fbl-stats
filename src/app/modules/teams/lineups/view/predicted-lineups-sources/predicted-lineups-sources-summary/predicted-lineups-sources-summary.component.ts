import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ArrayStream } from 'src/app/services/array-stream.service';
import { ScreenSize, ScreenSizeService } from 'src/app/services/screen-size.service';
import { PredictedLineupsSourceTeamAccuracy } from '../../../store/models/predicted-lineups-source-team-accuracy.model';
import { PredictedLineupsSource } from '../../../store/models/predicted-lineups-source.model';

@Component({
  selector: 'app-predicted-lineups-sources-summary',
  templateUrl: './predicted-lineups-sources-summary.component.html',
  styleUrls: ['./predicted-lineups-sources-summary.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PredictedLineupsSourcesSummaryComponent implements OnInit {
  @Input() sources: PredictedLineupsSource[];

  private _bestTeams: { [sourceName: string]: { teamShort: string; acc: number }[] } = {};
  private _worstTeams: { [sourceName: string]: { teamShort: string; acc: number }[] } = {};

  public get bestTeams() {
    return this._bestTeams;
  }

  public get worstTeams() {
    return this._worstTeams;
  }

  public screens = ScreenSize;
  public screen$: Observable<ScreenSize>;

  constructor(private screenSizeService: ScreenSizeService) {}

  public ngOnInit(): void {
    this.screen$ = this.screenSizeService.onResize();

    this.sources.forEach((source) => {
      this._bestTeams[source.name] = this.getBestWorstTeam('best', source);
      this._worstTeams[source.name] = this.getBestWorstTeam('worst', source);
    });
  }

  public isBest(fieldName: string, source: PredictedLineupsSource): boolean {
    const otherSources = this.sources.filter((s) => s.name !== source.name);
    const value: number = source.accuracy[fieldName];

    return otherSources.every((o) => value > o.accuracy[fieldName]);
  }

  private getBestWorstTeam(
    type: 'best' | 'worst',
    source: PredictedLineupsSource
  ): { teamShort: string; acc: number }[] {
    const order: 'asc' | 'dsc' = type === 'best' ? 'dsc' : 'asc';
    const teams = new ArrayStream<PredictedLineupsSourceTeamAccuracy>(source.accuracy.teams)
      .orderBy('avgSeasonAccuracy', order)
      .take(3)
      .collect();

    return teams.map((team) => ({ teamShort: team.teamShort, acc: team.avgSeasonAccuracy }));
  }
}
