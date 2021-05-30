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
    { label: 'Season overall', routerLink: 'overall', order: 2 },
    { label: 'Next matchdays', routerLink: 'nextmatchdays', order: 1 }
  ];

  public get links(): ViewTabNavigationLink[] {
    return this._links;
  }

  constructor() {}
}
