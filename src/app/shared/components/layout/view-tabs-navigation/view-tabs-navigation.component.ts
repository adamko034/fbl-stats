import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ViewTabNavigationLink } from './model/view-tab-navigation-link.model';

@Component({
  selector: 'app-view-tabs-navigation',
  templateUrl: './view-tabs-navigation.component.html',
  styleUrls: ['./view-tabs-navigation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ViewTabsNavigationComponent {
  @Input() links: ViewTabNavigationLink[];

  constructor() {}
}
