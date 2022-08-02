import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { SelectFutureMatchdaysPanelConfig } from 'src/app/common/components/filters/select-future-matchdays-panel/select-future-matchdays-panel-config.model';
import { FromTo } from 'src/app/shared/models/from-to.model';
import { FixturesFirstGamesFilters } from '../../models/fixtures-first-games-fitlers.model';
import { FixturesFirstGamesFiltersService } from '../../services/fixtures-first-games-filters.service';

@Component({
  selector: 'app-fixtures-first-games-filters',
  templateUrl: './fixtures-first-games-filters.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FixturesFirstGamesFiltersComponent implements OnInit {
  @Input() filters: FixturesFirstGamesFilters;
  @Input() lastMatchday: number;
  @Input() lastKnownMatchday: number;
  @Input() nextUnlimitedTransfersMatchday: number;

  public futureMatchdaysPanelConfig: SelectFutureMatchdaysPanelConfig;

  constructor(private filtersService: FixturesFirstGamesFiltersService) {}

  public ngOnInit(): void {
    this.futureMatchdaysPanelConfig = {
      maxMatchday: this.lastKnownMatchday,
      minMatchday: this.lastMatchday + 1,
      showAllWithEstablishedKickoffTimesLink: true,
      showUnlimitedTransfersLink: this.lastKnownMatchday > this.nextUnlimitedTransfersMatchday
    };
  }

  public onFutureMatchdaysChange(matchdays: FromTo) {
    this.filtersService.changeMatchdays(matchdays);
  }
}
