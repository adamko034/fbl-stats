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

  private _bestTeams: { [index: number]: { teamShort: string; acc: number }[] } = {};
  private _worstTeams: { [index: number]: { teamShort: string; acc: number }[] } = {};

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

    for (let i = 0; i <= 2; i++) {
      this._bestTeams[i] = this.getBestWorstTeam('best', this.sources[i]);
      this._worstTeams[i] = this.getBestWorstTeam('worst', this.sources[i]);
    }
  }

  public isBest(fieldName: string, sourceIndex: number): boolean {
    const otherIndexes: number[] = [0, 1, 2].filter((i) => i !== sourceIndex);
    const value: number = this.sources[sourceIndex].accuracy[fieldName];

    const otherValue1: number = this.sources[otherIndexes[0]].accuracy[fieldName];
    const otherValue2: number = this.sources[otherIndexes[1]].accuracy[fieldName];

    return value > otherValue1 && value > otherValue2;
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
