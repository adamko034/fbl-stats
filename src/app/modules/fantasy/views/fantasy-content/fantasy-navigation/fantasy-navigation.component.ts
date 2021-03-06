import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Navigation } from 'src/app/resources/navigation';
import { NavigationLink } from 'src/app/shared/models/navigation-link.model';

@Component({
  selector: 'app-fantasy-navigation',
  templateUrl: './fantasy-navigation.component.html',
  styleUrls: ['./fantasy-navigation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FantasyNavigationComponent {
  private key = 'fantasy';
  public links: NavigationLink[] = Navigation.links[this.key].dropdownLinks;

  constructor() {}
}
