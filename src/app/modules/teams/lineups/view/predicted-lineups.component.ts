import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UntilDestroy } from '@ngneat/until-destroy';
import { ViewTabNavigationLink } from 'src/app/shared/components/layout/view-tabs-navigation/model/view-tab-navigation-link.model';

@UntilDestroy()
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-predicted-lineups',
  templateUrl: './predicted-lineups.component.html',
  styleUrls: ['./predicted-lineups.component.scss']
})
export class PredictedLineupsComponent {
  private _links: ViewTabNavigationLink[] = [
    { label: 'Next matchday', order: 1, labelMobile: 'Next matchday', routerLink: 'next' },
    { label: 'Sources', order: 2, labelMobile: 'Predicted lineups sources', routerLink: 'sources' }
  ];

  public get links(): ViewTabNavigationLink[] {
    return this._links;
  }

  constructor() {}
}
