import { Component, Input } from '@angular/core';
import { PlayerPosition } from 'src/app/modules/fantasy/players/overall/models/players-filters';
import { SwitchItem } from 'src/app/shared/components/switch/models/switch-item.model';
import { MyTeamPlayersFitlersService } from '../../../../services/my-team-players-filters.service';

@Component({
  selector: 'app-my-team-filters-position',
  templateUrl: './my-team-filters-position.component.html',
  styleUrls: ['./my-team-filters-position.component.scss']
})
export class MyTeamFiltersPositionComponent {
  @Input() position: PlayerPosition;

  public items: SwitchItem[] = [
    { value: PlayerPosition.GK.toString(), description: 'GK' },
    { value: PlayerPosition.DEF, description: 'DEF' },
    { value: PlayerPosition.MID, description: 'MID' },
    { value: PlayerPosition.FOR, description: 'FOR' },
    { value: PlayerPosition.ALL, description: 'ALL' }
  ];

  constructor(private myTeamFiltersService: MyTeamPlayersFitlersService) {}

  public onPositionChange(newPosition: PlayerPosition): void {
    this.myTeamFiltersService.updatePosition(newPosition);
  }
}
