import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { OurPicksType } from '../../models/our-picks-type.enum';

@Component({
  selector: 'app-our-picks-filter-types',
  templateUrl: './our-picks-filter-types.component.html',
  styleUrls: ['./our-picks-filter-types.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OurPicksFilterTypesComponent implements OnInit {
  @Input() selected: OurPicksType[];

  @Output() typesChange = new EventEmitter<OurPicksType[]>();

  constructor() {}

  ngOnInit(): void {}

  public onClick(value: OurPicksType) {
    const isAdding = !this.selected || !this.selected.includes(value);
    const newTypes = isAdding
      ? !!this.selected
        ? [...this.selected, value]
        : [value]
      : this.selected.filter((s) => s !== value);
    this.typesChange.emit(newTypes);
  }

  public isSelected(type: OurPicksType): boolean {
    if (!this.selected || this.selected.length === 0) {
      return false;
    }
    return !!this.selected && this.selected.includes(type);
  }
}
