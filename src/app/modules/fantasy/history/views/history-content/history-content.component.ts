import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ViewTabNavigationLink } from 'src/app/shared/components/layout/view-tabs-navigation/model/view-tab-navigation-link.model';

@Component({
  selector: 'app-history-content',
  templateUrl: './history-content.component.html',
  styleUrls: ['./history-content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HistoryContentComponent {
  private _links: ViewTabNavigationLink[] = [
    { label: 'Players', labelMobile: 'Players', order: 2, routerLink: 'players' },
    { label: 'Bundesliga', labelMobile: 'Bindesliga', order: 3, routerLink: 'bundesliga' },
    { label: 'Summary', labelMobile: 'Summary', order: 1, routerLink: 'summary' }
  ];

  public get links(): ViewTabNavigationLink[] {
    return this._links;
  }
}
