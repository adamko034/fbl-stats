import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PlayerPosition } from 'src/app/modules/players/views/players-fantasy/models/players-filters';
import { FiltersStoreService } from 'src/app/services/filters-store.service';
import { SwitchItem } from 'src/app/shared/components/switch/models/switch-item.model';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-players-filter-position',
  templateUrl: './players-filter-position.component.html',
  styleUrls: ['./players-filter-position.component.scss']
})
export class PlayersFilterPositionComponent implements OnInit {
  public items: SwitchItem[] = [
    { value: PlayerPosition.GK.toString(), description: 'GK' },
    { value: PlayerPosition.DEF, description: 'DEF' },
    { value: PlayerPosition.MID, description: 'MID' },
    { value: PlayerPosition.FOR, description: 'FOR' },
    { value: PlayerPosition.ALL, description: 'ALL' }
  ];

  public selectedPosition$: Observable<string>;

  constructor(private filtersStoreService: FiltersStoreService) {}

  public ngOnInit(): void {
    this.selectedPosition$ = this.filtersStoreService.selectPosition();
  }

  public onPositionChange(newPosition: PlayerPosition): void {
    this.filtersStoreService.updatePosition(newPosition);
  }
}
