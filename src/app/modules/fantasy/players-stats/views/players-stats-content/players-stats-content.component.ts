import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ViewTabNavigationLink } from 'src/app/shared/components/layout/view-tabs-navigation/model/view-tab-navigation-link.model';

@Component({
  selector: 'app-players-stats-content',
  templateUrl: './players-stats-content.component.html',
  styleUrls: ['./players-stats-content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlayersStatsContentComponent {
  private _links: ViewTabNavigationLink[] = [
    { order: 3, label: 'Points efficiency', labelMobile: 'Players points efficiency', routerLink: 'pointsefficiency' },
    { order: 2, label: 'Games played', labelMobile: 'Players games played', routerLink: 'gamesplayed' },
    { order: 1, label: 'Overall', labelMobile: 'Overall stats', routerLink: 'points' }
  ];

  public get links(): ViewTabNavigationLink[] {
    return this._links;
  }

  constructor() {}
}
