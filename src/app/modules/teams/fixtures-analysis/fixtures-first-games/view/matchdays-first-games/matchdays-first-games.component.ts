import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ViewTabNavigationLink } from 'src/app/shared/components/layout/view-tabs-navigation/model/view-tab-navigation-link.model';

@Component({
  selector: 'app-matchdays-first-games',
  templateUrl: './matchdays-first-games.component.html',
  styleUrls: ['./matchdays-first-games.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MatchdaysFirstGamesComponent {
  private _links: ViewTabNavigationLink[] = [
    { label: 'Teams first games', labelMobile: 'First games season overall', routerLink: 'overall', order: 2 },
    {
      label: 'Next matchdays first games',
      labelMobile: 'Next matchdays first games',
      routerLink: 'nextmatchdays',
      order: 1
    }
  ];

  public get links(): ViewTabNavigationLink[] {
    return this._links;
  }

  constructor() {}
}
