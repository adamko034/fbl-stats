import { Component } from '@angular/core';
import { ViewTabNavigationLink } from 'src/app/shared/components/layout/view-tabs-navigation/model/view-tab-navigation-link.model';

@Component({
  selector: 'app-my-team-content',
  templateUrl: './my-team-content.component.html',
  styleUrls: ['./my-team-content.component.scss']
})
export class MyTeamContentComponent {
  private _links: ViewTabNavigationLink[] = [{ labelMobile: 'My team', label: 'My team', order: 1, routerLink: '' }];

  public get links(): ViewTabNavigationLink[] {
    return this._links;
  }

  constructor() {}
}
