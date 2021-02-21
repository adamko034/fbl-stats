import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { PlayerPosition } from 'src/app/modules/players/views/players-fantasy/models/players-filters';
import { SwitchItem } from '../switch/models/switch-item.model';

@Component({
  selector: 'app-filter-position',
  templateUrl: './filter-position.component.html',
  styleUrls: ['./filter-position.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilterPositionComponent {
  @Input() selected = PlayerPosition.ALL;

  @Output() positionChange = new EventEmitter<PlayerPosition>();

  public items: SwitchItem[] = [
    { value: PlayerPosition.GK, description: 'GK' },
    { value: PlayerPosition.DEF, description: 'DEF' },
    { value: PlayerPosition.MID, description: 'MID' },
    { value: PlayerPosition.FOR, description: 'FOR' },
    { value: PlayerPosition.ALL, description: 'ALL' }
  ];

  constructor() {}

  public onPositionChange(newPosition: PlayerPosition): void {
    this.positionChange.emit(newPosition);
  }
}
