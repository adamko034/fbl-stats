import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ViewTabNavigationLink } from 'src/app/shared/components/layout/view-tabs-navigation/model/view-tab-navigation-link.model';

@Component({
  selector: 'app-fixtures-difficulty-filters',
  templateUrl: './fixtures-difficulty-filters.component.html',
  styleUrls: ['./fixtures-difficulty-filters.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FixturesDifficultyFiltersComponent implements OnInit {
  private _links: ViewTabNavigationLink[] = [
    { label: 'Fixtures by ranking', labelMobile: 'Fixtures difficulty by ranking', routerLink: 'byRank', order: 1 },
    { label: 'Fixtures by form', labelMobile: 'Fixtures difficulty by form', routerLink: 'byForm', order: 2 }
  ];

  constructor() {}

  ngOnInit(): void {}
}
