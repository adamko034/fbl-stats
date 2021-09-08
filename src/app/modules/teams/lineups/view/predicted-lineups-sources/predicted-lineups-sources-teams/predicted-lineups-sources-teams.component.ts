import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { Observable } from 'rxjs';
import { ArrayStream } from 'src/app/services/array-stream.service';
import { TeamNavigation } from 'src/app/store/properties/properties.model';
import { PropertiesStore } from 'src/app/store/properties/properties.store';
import { PredictedLineupsTeamAccuracy } from '../../../models/predicted-lineups-team-accuracy.model';
import { PredictedLineupsSourceTeamAccuracy } from '../../../store/models/predicted-lineups-source-team-accuracy.model';
import { PredictedLineupsSource } from '../../../store/models/predicted-lineups-source.model';

@Component({
  selector: 'app-predicted-lineups-sources-teams',
  templateUrl: './predicted-lineups-sources-teams.component.html',
  styleUrls: ['./predicted-lineups-sources-teams.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PredictedLineupsSourcesTeamsComponent implements OnInit {
  @Input() teams: PredictedLineupsTeamAccuracy[];
  @Input() sources: PredictedLineupsSource[];

  public teamsSorted$: Observable<TeamNavigation[]>;

  public sorted: PredictedLineupsTeamAccuracy[];
  public sourceValueType: string = 'lastMdAccuracy';
  public sourceValueTypeDisplay = {
    lastMdAccuracy: 'Last MD',
    last5Accuracy: 'Last 5',
    avgSeasonAccuracy: 'Season'
  };

  constructor(private propertiesStore: PropertiesStore, private changeDetection: ChangeDetectorRef) {}

  public ngOnInit(): void {
    this.teamsSorted$ = this.propertiesStore.selectTeamsNavigation();
    this.onSortChange({ active: 'lastMd', direction: 'desc' });
  }

  public onSortChange(sort: Sort): void {
    this.sorted = new ArrayStream<PredictedLineupsTeamAccuracy>(this.teams)
      .orderBy(sort.active, sort.direction === 'asc' ? 'asc' : 'dsc')
      .collect();
  }

  public onSourceValueTypeChange(field: string): void {
    this.sourceValueType = field;
    this.changeDetection.detectChanges();
  }

  public getSourceAccuracy(sourceIndex: number, teamShort: string): number {
    return this.getSourceTeam(sourceIndex, teamShort)[this.sourceValueType];
  }

  public isBest(sourceIndex: number, teamShort: string): boolean {
    const otherIndexes: number[] = [0, 1, 2].filter((i) => i !== sourceIndex);
    const value: number = this.getSourceTeam(sourceIndex, teamShort)[this.sourceValueType];

    const otherValue1: number = this.getSourceTeam(otherIndexes[0], teamShort)[this.sourceValueType];
    const otherValue2: number = this.getSourceTeam(otherIndexes[1], teamShort)[this.sourceValueType];

    return value > otherValue1 && value > otherValue2;
  }

  public isWorst(sourceIndex: number, teamShort: string): boolean {
    const otherIndexes: number[] = [0, 1, 2].filter((i) => i !== sourceIndex);
    const value: number = this.getSourceTeam(sourceIndex, teamShort)[this.sourceValueType];

    const otherValue1: number = this.getSourceTeam(otherIndexes[0], teamShort)[this.sourceValueType];
    const otherValue2: number = this.getSourceTeam(otherIndexes[1], teamShort)[this.sourceValueType];

    return value < otherValue1 && value < otherValue2;
  }

  private getSourceTeam(sourceIndex: number, teamShort: string): PredictedLineupsSourceTeamAccuracy {
    return this.sources[sourceIndex].accuracy.teams.filter((t) => t.teamShort === teamShort)[0];
  }
}
