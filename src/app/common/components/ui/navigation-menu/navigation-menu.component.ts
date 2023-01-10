import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { NavigationMenuLink } from './navigation-menu-link.model';

@Component({
  selector: 'app-navigation-menu',
  templateUrl: './navigation-menu.component.html',
  styleUrls: ['./navigation-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavigationMenuComponent {
  @Input() links: NavigationMenuLink[];

  constructor(private activeRoute: Router) {}

  public activePageLabel(): string {
    const url = this.activeRoute.routerState.snapshot.url.toString();
    const urlWithoutParams = url.includes('?') ? url.substring(0, url.indexOf('?')) : url;

    if (this.links) {
      var link = this.links.find((x) => urlWithoutParams.includes(x.routerLink));
      return link?.labelMobile || 'Select page';
    }

    return 'Select page';
  }
}
