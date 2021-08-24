import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { ActivatedRoute, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { ArrayStream } from 'src/app/services/array-stream.service';
import { SortBy } from 'src/app/shared/components/sorty-by/models/sort-by.model';
import { PropertiesStore } from 'src/app/store/properties/properties.store';
import { Logger } from 'src/app/utils/logger';
import { FixturesDifficultyTableValueByForm } from '../../converters/fixtures-difficulty-table-value-by-form';
import { FixturesDifficultyConverter } from '../../converters/fixtures-difficulty.converter';
import { FixtureDifficultyTableTeam } from '../../models/fixture-difficulty-table-team.model';
import { FixturesDifficultyState } from '../../models/fixtures-difficulty.state';
import { FixtureDifficultyColorsService } from '../../services/fixture-difficulty-colors.service';

@UntilDestroy()
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-fixtures-difficulty-by-form',
  templateUrl: './fixtures-difficulty-by-form.component.html',
  styleUrls: ['./fixtures-difficulty-by-form.component.scss']
})
export class FixturesDifficultyByFormComponent implements OnInit {
  public includedGames: string;
  public includeGames: string[] = [];
  public state: FixturesDifficultyState;

  public sortBy: SortBy;

  public get scheduleTableTeams(): FixtureDifficultyTableTeam[] {
    if (!this.state.teams || !this.includedGames) {
      return [];
    }

    const valueDeterminer = new FixturesDifficultyTableValueByForm(this.includedGames);
    const converter = new FixturesDifficultyConverter(this.fixtureDifficultyColorService, valueDeterminer);
    return new ArrayStream(this.state.teams).convert(converter).collect();
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fixtureDifficultyColorService: FixtureDifficultyColorsService,
    private propertiesStore: PropertiesStore
  ) {}

  public ngOnInit(): void {
    Logger.logDev('teams schedules component by form, ng on init');
    combineLatest([this.route.queryParams, this.route.data, this.propertiesStore.selectLastMatchday()])
      .pipe(
        map(([params, data, lastMatchday]) => {
          return [params.matchdays || '5', data.state, lastMatchday];
        }),
        untilDestroyed(this)
      )
      .subscribe(([matchdays, state, lastMatchday]) => {
        this.includedGames = matchdays;
        this.state = state;

        const maxGamesIncluded = lastMatchday <= 5 ? lastMatchday : 5;
        for (let i = 2; i <= maxGamesIncluded; i++) {
          this.includeGames.push(i.toString());
        }
      });
  }

  public onSortChange(sortBy: SortBy): void {
    Logger.logDev('teams schedules by form component, sort change');
    this.sortBy = sortBy;
  }

  public onFormChange(change: MatSelectChange) {
    this.router.navigate([], { queryParams: { matchdays: change.value }, queryParamsHandling: 'merge' });
  }

  public onIncludeVenueCalculationChange(newaValue: boolean) {
    this.router.navigate([], { queryParams: { includeVenue: newaValue }, queryParamsHandling: 'merge' });
  }
}
