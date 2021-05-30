import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ViewTabNavigationLink } from 'src/app/shared/components/layout/view-tabs-navigation/model/view-tab-navigation-link.model';

@Component({
  selector: 'app-bundesliga-content',
  templateUrl: './bundesliga-content.component.html',
  styleUrls: ['./bundesliga-content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BundesligaContentComponent {
  private _links: ViewTabNavigationLink[] = [
    { order: 1, label: 'Table', routerLink: 'table' },
    { order: 3, label: 'Results', routerLink: 'results' },
    { order: 2, label: 'Fixtures', routerLink: 'fixtures' }
  ];

  public get links(): ViewTabNavigationLink[] {
    return this._links;
  }

  constructor() {}
}
