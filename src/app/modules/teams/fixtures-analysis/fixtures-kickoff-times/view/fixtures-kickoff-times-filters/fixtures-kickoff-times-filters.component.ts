import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { FixturesKickoffTimesFilters } from '../../models/fixtures-kickoff-times-filters.model';
import { FixturesKickoffTimesFiltersService } from '../../services/fixtures-kickoff-times-filters.service';

@Component({
  selector: 'app-fixtures-kickoff-times-filters',
  templateUrl: './fixtures-kickoff-times-filters.component.html',
  styleUrls: ['./fixtures-kickoff-times-filters.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FixturesKickoffTimesFiltersComponent implements OnInit {
  @Input() filters: FixturesKickoffTimesFilters;

  constructor(private filtersService: FixturesKickoffTimesFiltersService) {}

  ngOnInit(): void {}

  public onMatchdaysChange(matchdays: number): void {
    this.filtersService.changeMatchdays(matchdays);
  }
}
