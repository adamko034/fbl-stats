import { Component } from '@angular/core';
import { NavigationLink } from 'src/app/shared/components/layout/subnavigation/model/navigation-link.model';

@Component({
  selector: 'app-teams-navigation',
  templateUrl: './teams-navigation.component.html',
  styleUrls: ['./teams-navigation.component.scss']
})
export class TeamsNavigationComponent {
  public links: NavigationLink[] = [
    // { path: 'list', text: 'list', order: 1 },
    { path: 'table', text: 'table', order: 2 },
    { path: 'schedules', text: 'schedules', order: 3 }
  ];

  constructor() {}
}
