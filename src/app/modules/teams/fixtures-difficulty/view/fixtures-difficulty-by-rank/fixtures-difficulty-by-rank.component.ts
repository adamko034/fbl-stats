import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { map } from 'rxjs/operators';
import { ArrayStream } from 'src/app/services/array-stream.service';
import { SortBy } from 'src/app/shared/components/sorty-by/models/sort-by.model';
import { Logger } from 'src/app/utils/logger';
import { FixturesDifficultyTableValueByRank } from '../../converters/fixtures-difficulty-table-value-by-rank';
import { FixturesDifficultyConverter } from '../../converters/fixtures-difficulty.converter';
import { FixtureDifficultyTableTeam } from '../../models/fixture-difficulty-table-team.model';
import { FixturesDifficultyState } from '../../models/fixtures-difficulty.state';
import { FixtureDifficultyColorsService } from '../../services/fixture-difficulty-colors.service';

@UntilDestroy()
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-fixtures-difficulty-by-rank',
  templateUrl: './fixtures-difficulty-by-rank.component.html',
  styleUrls: ['./fixtures-difficulty-by-rank.component.scss']
})
export class FixturesDifficultyByRankComponent implements OnInit {
  public state: FixturesDifficultyState;
  public sortBy: SortBy;

  public get scheduleTableTeams(): FixtureDifficultyTableTeam[] {
    if (!this.state.teams) {
      return [];
    }

    const valueDeterminer = new FixturesDifficultyTableValueByRank();
    const converter = new FixturesDifficultyConverter(this.scheduleColorService, valueDeterminer);
    return new ArrayStream(this.state.teams).convert(converter).collect();
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private scheduleColorService: FixtureDifficultyColorsService
  ) {}

  public ngOnInit(): void {
    Logger.logDev('teams schedules component by rank, ng on init');
    this.route.data
      .pipe(
        map((data) => data.state),
        untilDestroyed(this)
      )
      .subscribe((state) => (this.state = state));
  }

  public onSortChange(sortBy: SortBy): void {
    this.sortBy = sortBy;
  }

  public onIncludeVenueCalculationChange(newValue: boolean) {
    this.router.navigate([], { queryParams: { includeVenue: newValue }, queryParamsHandling: 'merge' });
  }
}
