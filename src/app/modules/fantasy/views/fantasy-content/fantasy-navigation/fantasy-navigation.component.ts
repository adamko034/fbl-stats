import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Navigation } from 'src/app/resources/navigation';
import { NavigationLink } from 'src/app/shared/models/navigation-link.model';

@Component({
  selector: 'app-fantasy-navigation',
  templateUrl: './fantasy-navigation.component.html',
  styleUrls: ['./fantasy-navigation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FantasyNavigationComponent {
  public links: NavigationLink[] = Navigation.links.players.children;

  constructor() {}
}
