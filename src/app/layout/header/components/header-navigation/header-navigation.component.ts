import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Navigation } from 'src/app/resources/navigation';
import { SidenavService } from 'src/app/services/sidenav.service';
import { NavigationLink } from 'src/app/shared/models/navigation-link.model';

export enum NavigationMode {
  VERTICAL = 'vertical',
  HORIZONTAL = 'horizontal'
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-header-navigation',
  templateUrl: './header-navigation.component.html',
  styleUrls: ['./header-navigation.component.scss']
})
export class HeaderNavigationComponent {
  @Input() mode: NavigationMode = NavigationMode.HORIZONTAL;

  public modes = NavigationMode;
  public links: NavigationLink[] = Object.values(Navigation.links);

  constructor(private sidenavService: SidenavService, private router: Router) {}

  public closeSidenav(): void {
    this.sidenavService.close();
  }

  public isDropdownActive(path: string): boolean {
    return this.router.url.includes(`/${path}`);
  }

  public activeLinkFromDropdown(link: NavigationLink): string {
    const active = link.dropdownLinks.find((x) => this.isDropdownActive(x.path));
    return !!active ? active.text : '';
  }
}
