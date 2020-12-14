import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PlayersDisplaySettingService } from 'src/app/services/players-display-settings.service';
import { SwitchItem } from 'src/app/shared/components/switch/models/switch-item.model';

@Component({
  selector: 'app-players-count',
  templateUrl: './players-count.component.html',
  styleUrls: ['./players-count.component.scss']
})
export class PlayersCountComponent implements OnInit {
  public value$: Observable<number>;
  public items: SwitchItem[] = [
    { description: '10', value: 10 },
    { description: '15', value: 15 },
    { description: '20', value: 20 },
    { description: '30', value: 30 },
    { description: '50', value: 50 },
    { description: '100', value: 100 }
  ];

  constructor(private playersDisplaySettingsService: PlayersDisplaySettingService) {}

  ngOnInit(): void {
    this.value$ = this.playersDisplaySettingsService.selectPlayersCount();
  }

  public onPlayersCountChange(newValue: number): void {
    this.playersDisplaySettingsService.updatePlayersCount(newValue);
  }
}
