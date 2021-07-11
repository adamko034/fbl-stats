import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { ScreenSize, ScreenSizeService } from 'src/app/services/screen-size.service';
import { SidenavService } from 'src/app/services/sidenav.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  public screens = ScreenSize;
  public screen$: Observable<ScreenSize>;

  constructor(private screenSizeService: ScreenSizeService, private sidenavService: SidenavService) {
    this.screen$ = this.screenSizeService.onResize();
  }

  public openSidenav(): void {
    //this.sidenavService.openOnMobile();
  }
}
