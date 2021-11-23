import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ViewTabNavigationLink } from 'src/app/shared/components/layout/view-tabs-navigation/model/view-tab-navigation-link.model';

@Component({
  selector: 'app-matchday-tips',
  templateUrl: './matchday-tips.component.html',
  styleUrls: ['./matchday-tips.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MatchdayTipsComponent {
  private _links: ViewTabNavigationLink[] = [
    { order: 1, label: 'Our picks', labelMobile: 'Our picks', routerLink: 'ourpicks' },
    { order: 2, label: 'Links', labelMobile: 'Links', routerLink: 'links' }
  ];

  public get links(): ViewTabNavigationLink[] {
    return this._links;
  }

  constructor() {}
}
