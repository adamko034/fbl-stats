import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ViewTabNavigationLink } from 'src/app/shared/components/layout/view-tabs-navigation/model/view-tab-navigation-link.model';

@Component({
  selector: 'app-fixtures-analysis',
  templateUrl: './fixtures-analysis.component.html',
  styleUrls: ['./fixtures-analysis.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FixturesAnalysisComponent implements OnInit {
  private _links: ViewTabNavigationLink[] = [
    { order: 1, label: 'Difficulty', labelMobile: 'Difficulty', routerLink: 'difficulty' },
    { order: 2, label: 'First games', labelMobile: 'First games', routerLink: 'firstgames' }
  ];

  public get links(): ViewTabNavigationLink[] {
    return this._links;
  }

  constructor() {}

  ngOnInit(): void {}
}
