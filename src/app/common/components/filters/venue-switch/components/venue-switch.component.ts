import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Venue } from 'src/app/shared/models/venue.enum';
import { SwitcherItem } from '../../../ui/switcher/models/switcher-item.model';

@Component({
  selector: 'app-venue-switch',
  templateUrl: './venue-switch.component.html',
  styleUrls: ['./venue-switch.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VenueSwitchComponent {
  @Input() value: Venue;
  @Output() change: EventEmitter<Venue> = new EventEmitter<Venue>();

  private _items: SwitcherItem[] = [
    { description: 'All', value: Venue.ALL },
    { description: 'Home', value: Venue.HOME },
    { description: 'Away', value: Venue.AWAY }
  ];

  public get items(): SwitcherItem[] {
    return this._items;
  }

  constructor() {}

  public onVenueChange(val: Venue): void {
    this.change.emit(val);
  }
}
