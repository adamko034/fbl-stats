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
    { value: PlayersView.TABLE, matIcon: 'table_chart', isMatIconOutline: true },
    { value: PlayersView.LIST, matIcon: 'reorder' }
  ];

  constructor(private playersDisplaySettingsService: PlayersDisplaySettingService) {}

  public ngOnInit(): void {
    this.value$ = this.playersDisplaySettingsService.selectPlayersView();
  }

  public onViewChange(newView: PlayersView) {
    this.playersDisplaySettingsService.updateView(newView);
  }
}
