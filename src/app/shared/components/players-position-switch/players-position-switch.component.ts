import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PlayerPosition } from 'src/app/modules/fantasy/players/overall/models/players-filters';
import { SwitchItem } from '../switch/models/switch-item.model';

@Component({
  selector: 'app-players-position-switch',
  templateUrl: './players-position-switch.component.html',
  styleUrls: ['./players-position-switch.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlayersPositionSwitchComponent implements OnInit {
  private _items = [
    { value: PlayerPosition.GK, description: 'GK' },
    { value: PlayerPosition.DEF, description: 'DEF' },
    { value: PlayerPosition.MID, description: 'MID' },
    { value: PlayerPosition.FOR, description: 'FOR' },
    { value: PlayerPosition.ALL, description: 'ALL' }
  ];

  @Input() selected: PlayerPosition;
  @Input() showLabel = true;
  @Output() positionChange = new EventEmitter<PlayerPosition>();

  public get items(): SwitchItem[] {
    return this._items;
  }

  constructor() {}

  ngOnInit(): void {}

  public onPositionChange(newPosition: PlayerPosition) {
    this.positionChange.emit(newPosition);
  }
}
