import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterNavigationService } from 'src/app/common/services/router-navigation.service';
import { PlayerPicker } from 'src/app/modules/core/players/picker/models/player-picker.model';
import { SidenavService } from 'src/app/services/sidenav.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
  showBackButton$ = this.navigationService.hasBackUrl();

  constructor(
    private sidenavService: SidenavService,
    private router: Router,
    private navigationService: RouterNavigationService
  ) {}

  public onToggleMenu(): void {
    this.sidenavService.toggle();
  }

  public onPlayerSearched(player: PlayerPicker): void {
    this.router.navigate(['fantasy', 'players', 'details', player.id]);
  }

  public goBack(): void {
    this.navigationService.goBack();
  }
}
