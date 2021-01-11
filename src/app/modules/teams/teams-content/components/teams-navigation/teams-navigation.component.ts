import { Component } from '@angular/core';

interface TeamLink {
  path: string;
  text: string;
  order: number;
}

@Component({
  selector: 'app-teams-navigation',
  templateUrl: './teams-navigation.component.html',
  styleUrls: ['./teams-navigation.component.scss']
})
export class TeamsNavigationComponent {
  public links: TeamLink[] = [
    // { path: 'list', text: 'list', order: 1 },
    { path: 'table', text: 'table', order: 2 },
    { path: 'schedules', text: 'schedules', order: 3 }
  ];
  constructor() {}
}
