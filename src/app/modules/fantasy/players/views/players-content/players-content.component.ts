import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ViewTabNavigationLink } from 'src/app/shared/components/layout/view-tabs-navigation/model/view-tab-navigation-link.model';

@Component({
  selector: 'app-players-content',
  templateUrl: './players-content.component.html',
  styleUrls: ['./players-content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlayersContentComponent implements OnInit {
  private _links: ViewTabNavigationLink[] = [
    { label: 'Overall', labelMobile: 'All players', order: 1, routerLink: 'overall' },
    { label: 'Unavailable', labelMobile: 'Unavailable players', order: 2, routerLink: 'lists/unavailable' },
    { label: 'Returning', labelMobile: 'Returning players', order: 2, routerLink: 'lists/returning' },
    { label: 'Suspension risk', labelMobile: 'Suspension risk players', order: 2, routerLink: 'lists/suspensionrisk' }
  ];

  public get links(): ViewTabNavigationLink[] {
    return this._links;
  }

  constructor() {}

  ngOnInit(): void {}
}
