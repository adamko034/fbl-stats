import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { FixturesDifficultyFilters } from '../../../fixtures-difficulty/models/fixtures-difficulty-filters.model';
import { FixturesFirstGamesFiltersService } from '../../services/fixtures-first-games-filters.service';

@Component({
  selector: 'app-fixtures-first-games-filters',
  templateUrl: './fixtures-first-games-filters.component.html',
  styleUrls: ['./fixtures-first-games-filters.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FixturesFirstGamesFiltersComponent implements OnInit {
  @Input() filters: FixturesDifficultyFilters;

  constructor(private filtersService: FixturesFirstGamesFiltersService) {}

  public ngOnInit(): void {}

  public onMatchdaysChanged(matchdays: number) {
    this.filtersService.changeMatchdays(matchdays);
  }
}
