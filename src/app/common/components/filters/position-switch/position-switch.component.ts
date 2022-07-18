import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Position } from 'src/app/common/players/models/position.enum';
import { SwitcherItem } from '../../ui/switcher/models/switcher-item.model';

@Component({
  selector: 'app-position-switch',
  templateUrl: './position-switch.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PositionSwitchComponent {
  @Input() value: Position;
  @Output() change = new EventEmitter<Position>();

  private _items: SwitcherItem[] = [
    { value: Position.GK, description: 'GK' },
    { value: Position.DEF, description: 'DEF' },
    { value: Position.MID, description: 'MID' },
    { value: Position.FOR, description: 'FOR' },
    { value: Position.ALL, description: 'All' }
  ];
  public get items(): SwitcherItem[] {
    return this._items;
  }

  public onPositionChange(newValue: Position): void {
    this.change.emit(newValue);
  }
}
