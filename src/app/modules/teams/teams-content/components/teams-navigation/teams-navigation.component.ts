import { Component } from '@angular/core';
import { Navigation } from 'src/app/resources/navigation';
import { NavigationLink } from 'src/app/shared/models/navigation-link.model';

@Component({
  selector: 'app-teams-navigation',
  templateUrl: './teams-navigation.component.html',
  styleUrls: ['./teams-navigation.component.scss']
})
export class TeamsNavigationComponent {
  public links: NavigationLink[] = Navigation.links.bundesliga.dropdownLinks;

  constructor() {}
}
