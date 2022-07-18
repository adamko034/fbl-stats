import { Component, Input } from '@angular/core';
import { MyTeamStore } from 'src/app/store/fantasy/my-team/my-team.store';
import { MyTeamTilesDisplaySettings } from '../../../models/my-team-tiles-display-settings.model';
import { MyTeamTilesDisplaySettingsService } from '../../../services/my-team-tiles-display-settings.service';

@Component({
  selector: 'app-my-team-options',
  templateUrl: './my-team-options.component.html',
  styleUrls: ['./my-team-options.component.scss']
})
export class MyTeamOptionsComponent {
  @Input() settings: MyTeamTilesDisplaySettings;

  constructor(private myTeamTileOrderService: MyTeamTilesDisplaySettingsService, private myTeamStore: MyTeamStore) {}

  public onOrderChanged(newOrder: string): void {
    this.myTeamTileOrderService.changeOrder(newOrder);
  }

  public onClearMyTeam(): void {
    this.myTeamStore.clear();
  }
}
