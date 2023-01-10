import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PlayerPicker } from 'src/app/modules/core/players/picker/models/player-picker.model';
import { SidenavService } from 'src/app/services/sidenav.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {
  constructor(private sidenavService: SidenavService, private router: Router) {}

  ngOnInit(): void {}

  public onToggleMenu(): void {
    this.sidenavService.toggle();
  }

  public onPlayerSearched(player: PlayerPicker): void {
    this.router.navigate(['fantasy', 'players', 'details', player.id]);
  }
}
