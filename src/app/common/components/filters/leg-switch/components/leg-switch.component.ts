import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Leg } from 'src/app/shared/models/leg.enum';
import { SwitcherItem } from '../../../ui/switcher/models/switcher-item.model';

@Component({
  selector: 'app-leg-switch',
  templateUrl: './leg-switch.component.html',
  styleUrls: ['./leg-switch.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LegSwitchComponent {
  @Input() value: Leg;
  @Output() change = new EventEmitter<Leg>();

  private _items: SwitcherItem[] = [
    { description: 'All', value: Leg.ALL },
    { description: '1st leg', value: Leg.FIRST },
    { description: '2nd leg', value: Leg.SECOND }
  ];

  public get items(): SwitcherItem[] {
    return this._items;
  }

  constructor() {}

  public onLegChange(leg: Leg): void {
    this.change.emit(leg);
  }
}
