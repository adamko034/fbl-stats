import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ViewTabNavigationLink } from 'src/app/shared/components/layout/view-tabs-navigation/model/view-tab-navigation-link.model';

@Component({
  selector: 'app-useful-links',
  templateUrl: './useful-links.component.html',
  styleUrls: ['./useful-links.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsefulLinksComponent implements OnInit {
  private _links: ViewTabNavigationLink[] = [
    { order: 1, label: 'Useful links', labelMobile: 'Useful links', routerLink: '' }
  ];

  public get links(): ViewTabNavigationLink[] {
    return this._links;
  }

  constructor() {}

  ngOnInit(): void {}
}
