import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PlayerPicker } from 'src/app/modules/core/players/picker/models/player-picker.model';
import { GuiConfigStore } from 'src/app/store/gui-config/gui-config.store';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {
  constructor(private guiConfigStore: GuiConfigStore, private router: Router) {}

  ngOnInit(): void {}

  public onToggleMenu(): void {
    this.guiConfigStore.toggleSideNav();
  }

  public onPlayerSearched(player: PlayerPicker): void {
    this.router.navigate(['fantasy', 'players', 'details', player.id]);
  }
}
