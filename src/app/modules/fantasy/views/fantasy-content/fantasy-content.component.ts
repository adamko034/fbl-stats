import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Navigation } from 'src/app/resources/navigation';
import { NavigationLink } from 'src/app/shared/models/navigation-link.model';

@Component({
  selector: 'app-fantasy-content',
  templateUrl: './fantasy-content.component.html',
  styleUrls: ['./fantasy-content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FantasyContentComponent {
  public get links(): NavigationLink[] {
    return Navigation.links.players.children;
  }

  constructor() {}
}
