import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PlayersView } from 'src/app/layout/content/models/players-view.enum';
import { PlayersDisplaySettingService } from 'src/app/services/players-display-settings.service';
import { SwitchItem } from 'src/app/shared/components/switch/models/switch-item.model';

@Component({
  selector: 'app-players-view-switch',
  templateUrl: './players-view-switch.component.html',
  styleUrls: ['./players-view-switch.component.scss']
})
export class PlayersViewSwitchComponent implements OnInit {
  public value$: Observable<PlayersView>;
  public items: SwitchItem[] = [
    { description: 'table_chart', value: PlayersView.TABLE, isMatIcon: true, isMatIconOutline: true },
    { description: 'reorder', value: PlayersView.LIST, isMatIcon: true }
    // { description: 'view_comfy', value: PlayersView.TILES, isMatIcon: true }
  ];

  constructor(private playersDisplaySettingsService: PlayersDisplaySettingService) {}

  public ngOnInit(): void {
    this.value$ = this.playersDisplaySettingsService.selectPlayersView();
  }

  public onViewChange(newView: PlayersView) {
    this.playersDisplaySettingsService.updateView(newView);
  }
}
