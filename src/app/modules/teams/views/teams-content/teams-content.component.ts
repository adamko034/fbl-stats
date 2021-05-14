import { Component } from '@angular/core';
import { Navigation } from 'src/app/resources/navigation';
import { NavigationLink } from 'src/app/shared/models/navigation-link.model';

@Component({
  selector: 'app-teams-content',
  templateUrl: './teams-content.component.html',
  styleUrls: ['./teams-content.component.scss']
})
export class TeamsContentComponent {
  public get links(): NavigationLink[] {
    return Navigation.links.teams.children;
  }

  constructor() {}
}
