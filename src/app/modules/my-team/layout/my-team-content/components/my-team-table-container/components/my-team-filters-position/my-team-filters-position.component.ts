import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MyTeamPlayersFitlersService } from 'src/app/modules/my-team/layout/my-team-content/components/my-team-selection/services/my-team-players-filters.service';
import { PlayerPosition } from 'src/app/modules/players/views/players-fantasy/models/players-filters';
import { SwitchItem } from 'src/app/shared/components/switch/models/switch-item.model';

@Component({
  selector: 'app-my-team-filters-position',
  templateUrl: './my-team-filters-position.component.html',
  styleUrls: ['./my-team-filters-position.component.scss']
})
export class MyTeamFiltersPositionComponent implements OnInit {
  public items: SwitchItem[] = [
    { value: PlayerPosition.GK.toString(), description: 'GK' },
    { value: PlayerPosition.DEF, description: 'DEF' },
    { value: PlayerPosition.MID, description: 'MID' },
    { value: PlayerPosition.FOR, description: 'FOR' },
    { value: PlayerPosition.ALL, description: 'ALL' }
  ];

  public selectedPosition$: Observable<string>;

  constructor(private myTeamFiltersService: MyTeamPlayersFitlersService) {}

  public ngOnInit(): void {
    this.selectedPosition$ = this.myTeamFiltersService.selectPosition();
  }

  public onPositionChange(newPosition: PlayerPosition): void {
    this.myTeamFiltersService.updatePosition(newPosition);
  }
}
