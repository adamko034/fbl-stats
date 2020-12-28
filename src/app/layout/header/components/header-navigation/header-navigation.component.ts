import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { SidenavService } from 'src/app/services/sidenav.service';

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

  constructor(private sidenavService: SidenavService) {}

  public closeSidenav(): void {
    this.sidenavService.close();
  }
}
