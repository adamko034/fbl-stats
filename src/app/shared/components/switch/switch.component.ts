import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { SwitchItem } from 'src/app/shared/components/switch/models/switch-item.model';

@Component({
  selector: 'app-switch',
  templateUrl: './switch.component.html',
  styleUrls: ['./switch.component.scss']
})
export class SwitchComponent {
  @Input() name: string;
  @Input() value: string | number;
  @Input() items: SwitchItem[];
  @Output() switchChange = new EventEmitter<string | number>();

  constructor() {}

  public onChange(change: MatButtonToggleChange) {
    this.switchChange.emit(change.value);
  }
}
