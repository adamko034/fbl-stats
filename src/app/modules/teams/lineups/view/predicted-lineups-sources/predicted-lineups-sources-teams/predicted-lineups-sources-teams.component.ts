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

  public getSourceAccuracy(source: PredictedLineupsSource, teamShort: string): string {
    const value = this.getSourceTeam(source, teamShort)[this.sourceValueType];

    if (value == null) {
      return 'x';
    }

    return `${value}%`;
  }

  public isBest(source: PredictedLineupsSource, teamShort: string): boolean {
    const otherSources = this.sources.filter((s) => s.name !== source.name);
    const value: number = this.getSourceTeam(source, teamShort)[this.sourceValueType];

    return otherSources.every((o) => value > this.getSourceTeam(o, teamShort)[this.sourceValueType]);
  }

  public isWorst(source: PredictedLineupsSource, teamShort: string): boolean {
    const sourceValue = this.getSourceTeam(source, teamShort)[this.sourceValueType];
    if (sourceValue == null) {
      return false;
    }

    const otherSources = this.sources.filter((s) => s.name !== source.name);

    return otherSources
      .filter((o) => this.getSourceTeam(o, teamShort)[this.sourceValueType] != null)
      .every((o) => sourceValue < this.getSourceTeam(o, teamShort)[this.sourceValueType]);
  }

  private getSourceTeam(source: PredictedLineupsSource, teamShort: string): PredictedLineupsSourceTeamAccuracy {
    return source.accuracy.teams.filter((t) => t.teamShort === teamShort)[0];
  }
}
