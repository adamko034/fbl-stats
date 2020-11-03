import { Component, OnInit } from '@angular/core';
import { PlayersDisplaySettingService } from 'src/app/services/players-display-settings.service';
import { SwitchItem } from 'src/app/shared/components/switch/models/switch-item.model';

@Component({
  selector: 'app-players-count',
  templateUrl: './players-count.component.html',
  styleUrls: ['./players-count.component.scss']
})
export class PlayersCountComponent implements OnInit {
  public default: number;
  public items: SwitchItem[] = [
    { description: '10', value: 10 },
    { description: '15', value: 15 },
    { description: '20', value: 20 },
    { description: '30', value: 30 }
  ];

  constructor(private playersDisplaySettingsService: PlayersDisplaySettingService) {}

  ngOnInit(): void {
    this.default = this.playersDisplaySettingsService.getInitialData().count;
  }

  public onPlayersCountChange(newValue: number): void {
    this.playersDisplaySettingsService.updatePlayersCount(newValue);
  }
}
