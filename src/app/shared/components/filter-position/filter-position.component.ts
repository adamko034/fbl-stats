import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Position } from 'src/app/common/players/models/position.enum';
import { SwitchItem } from '../switch/models/switch-item.model';

@Component({
  selector: 'app-filter-position',
  templateUrl: './filter-position.component.html',
  styleUrls: ['./filter-position.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilterPositionComponent {
  @Input() selected = Position.ALL;

  @Output() positionChange = new EventEmitter<Position>();

  public items: SwitchItem[] = [
    { value: Position.GK, description: 'GK' },
    { value: Position.DEF, description: 'DEF' },
    { value: Position.MID, description: 'MID' },
    { value: Position.FOR, description: 'FOR' },
    { value: Position.ALL, description: 'ALL' }
  ];

  constructor() {}

  public onPositionChange(newPosition: Position): void {
    this.positionChange.emit(newPosition);
  }
}
