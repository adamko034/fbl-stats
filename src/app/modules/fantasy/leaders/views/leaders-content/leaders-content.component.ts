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
    { label: 'Leaders stats', labelMobile: 'Leaders stats', routerLink: '', order: 1 }
  ];

  public get links(): ViewTabNavigationLink[] {
    return this._links;
  }

  constructor() {}
}
