import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ViewTabNavigationLink } from 'src/app/shared/components/layout/view-tabs-navigation/model/view-tab-navigation-link.model';

@Component({
  selector: 'app-leaders-content',
  templateUrl: './leaders-content.component.html',
  styleUrls: ['./leaders-content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LeadersContentComponent {
  private _links: ViewTabNavigationLink[] = [
    { label: 'Top 500', labelMobile: 'Top 500 stats', routerLink: 'top500', order: 1 },
    { label: 'Top 100', labelMobile: 'Top 100 stats', routerLink: 'top100', order: 2 }
  ];

  public get links(): ViewTabNavigationLink[] {
    return this._links;
  }

  constructor() {}
}
