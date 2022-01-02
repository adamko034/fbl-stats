import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { ArrayStream } from 'src/app/services/array-stream.service';
import { SwitchItem } from 'src/app/shared/components/switch/models/switch-item.model';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-switch',
  templateUrl: './switch.component.html',
  styleUrls: ['./switch.component.scss']
})
export class SwitchComponent {
  @Input() name: string;
  @Input() showSelectOnMobile = false;
  @Input() selectLabel = '';
  @Input() value: string | number;
  @Input() items: SwitchItem[];
  @Input() additionalItem?: SwitchItem;
  @Output() switchChange = new EventEmitter<string | number>();

  public get allItems(): SwitchItem[] {
    const all = new ArrayStream<SwitchItem>(this.items).filterQuick((i) => !i.hidden).collect();
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
