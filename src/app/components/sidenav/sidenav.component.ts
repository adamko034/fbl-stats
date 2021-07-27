import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Navigation } from 'src/app/resources/navigation';
import { NavigationLink } from 'src/app/shared/models/navigation-link.model';
import { GuiConfigStore } from 'src/app/store/gui-config/gui-config.store';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidenavComponent implements OnInit {
  public expanded$: Observable<boolean>;

  public get links(): NavigationLink[] {
    return Navigation.Links;
  }

  constructor(private guiConfigStore: GuiConfigStore) {}

  public ngOnInit(): void {
    this.expanded$ = this.guiConfigStore.selectSideNavExpanded();
  }

  public toggleExpand(): void {
    this.guiConfigStore.toggleSideNavExpanded();
  }
}
