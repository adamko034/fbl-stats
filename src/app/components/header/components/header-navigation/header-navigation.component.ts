import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NavigationLink } from 'src/app/shared/models/navigation-link.model';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-header-navigation',
  templateUrl: './header-navigation.component.html',
  styleUrls: ['./header-navigation.component.scss']
})
export class HeaderNavigationComponent {
  public links: NavigationLink[] = [];

  constructor() {}

  // public closeSidenav(): void {
  //   this.sidenavService.close();
  // }

  // public isDropdownActive(path: string): boolean {
  //   return this.router.url.includes(`/${path}`);
  // }

  // public activeLinkFromDropdown(link: NavigationLink): string {
  //   const active = link.dropdownLinks.find((x) => this.isDropdownActive(x.path));
  //   return !!active ? active.text : '';
  // }
}
