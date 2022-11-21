import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { ArrayStream } from 'src/app/services/array-stream.service';
import { SwitcherItem } from '../models/switcher-item.model';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-switcher',
  templateUrl: './switcher.component.html',
  styleUrls: ['./switcher.component.scss']
})
export class SwitcherComponent {
  @Input() name: string;
  @Input() showSelectOnMobile = false;
  @Input() selectLabel = '';
  @Input() value: string | number;
  @Input() items: SwitcherItem[];
  @Input() additionalItem?: SwitcherItem;
  @Input() narrow = false;
  @Output() switchChange = new EventEmitter<string | number>();

  public get allItems(): SwitcherItem[] {
    const all = new ArrayStream<SwitcherItem>(this.items).filterQuick((i) => !i.hidden).collect();
    if (!!this.additionalItem) {
      all.push(this.additionalItem);
    }

    return all;
  }

  constructor() {}

  public onChange(value: string | number) {
    this.switchChange.emit(value);
  }
}
