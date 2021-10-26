import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SelectConfig } from './select-config.model';
import { SelectDataItem } from './select-data-item.model';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectComponent implements OnInit {
  @Input() config: SelectConfig;
  @Output() selectedValuesChange = new EventEmitter<string[]>();

  private _allItems: SelectDataItem[] = [];
  private _selected: SelectDataItem[] = [];
  public selectControl: FormControl = new FormControl();

  public get selectedItems(): SelectDataItem[] {
    return this._selected;
  }

  constructor() {}

  public ngOnInit(): void {
    this._allItems = [];
    this.config.data.forEach((g) => g.items.forEach((item) => this._allItems.push(item)));

    this.selectControl.valueChanges.subscribe((values: string[]) => {
      if (!values) {
        this._selected = [];
        return;
      }

      this._selected = values.map((value) => ({
        value,
        label: this._allItems.find((item) => item.value === value).label
      }));
    });
  }

  public clearSelection(): void {
    // this._selected = [];
    this.selectControl.reset();
  }
}
