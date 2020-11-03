import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { SwitchItem } from 'src/app/shared/components/switch/models/switch-item.model';

@Component({
  selector: 'app-switch',
  templateUrl: './switch.component.html',
  styleUrls: ['./switch.component.scss']
})
export class SwitchComponent implements OnInit, OnChanges {
  @Input() name: string;
  @Input() defaultValue: string | number;
  @Input() items: SwitchItem[];
  @Output() switchChange = new EventEmitter<string | number>();

  public selectedItem: string | number;

  constructor() {}

  ngOnInit(): void {
    if (this.defaultValue) {
      this.selectedItem = this.defaultValue;
    }
  }

  public ngOnChanges(change: SimpleChanges) {
    if (change.defaultValue) {
      this.selectedItem = this.defaultValue;
    }
  }

  public onChange(change: MatButtonToggleChange) {
    this.selectedItem = change.value;
    this.switchChange.emit(this.selectedItem);
  }
}
