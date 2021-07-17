import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ViewTabNavigationLink } from 'src/app/shared/components/layout/view-tabs-navigation/model/view-tab-navigation-link.model';

@Component({
  selector: 'app-fixtures-difficulty-content',
  templateUrl: './fixtures-difficulty-content.component.html',
  styleUrls: ['./fixtures-difficulty-content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FixturesDifficultyContentComponent {
  private _links: ViewTabNavigationLink[] = [
    { label: 'Fixtures by ranking', labelMobile: 'Fixtures difficulty by ranking', routerLink: 'byRank', order: 1 },
    { label: 'Fixtures by form', labelMobile: 'Fixtures difficulty by form', routerLink: 'byForm', order: 2 }
  ];

  public get links(): ViewTabNavigationLink[] {
    return this._links;
  }

  constructor() {}
}
