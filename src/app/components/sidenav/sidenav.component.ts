import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Navigation2 } from 'src/app/resources/navigation2';
import { SidenavService } from 'src/app/services/sidenav.service';
import { NavigationLink } from 'src/app/shared/models/navigation-link.model';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidenavComponent {
  public openedNavs$ = new BehaviorSubject<string[]>([]);

  public get links(): NavigationLink[] {
    return Navigation2.Links;
  }

  public get height() {
    return `${window.innerHeight}px`;
  }

  constructor(private sidenavService: SidenavService) {}

  public toggleNav(navKey: string) {
    const current = this.openedNavs$.getValue();
    const index = current.indexOf(navKey);

    if (index > -1) {
      current.splice(index, 1);
    } else {
      current.push(navKey);
    }

    this.openedNavs$.next([...current]);
  }

  public closeSideNav() {
    this.sidenavService.closeOnMobile();
  }
}
