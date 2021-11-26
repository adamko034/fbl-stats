import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatchdayTipsOurPicksType } from 'src/app/modules/core/matchday-tips/our-picks/models/matchday-tips-our-picks-type.enum';

@Component({
  selector: 'app-matchday-tips-our-picks-filter-types',
  templateUrl: './matchday-tips-our-picks-filter-types.component.html',
  styleUrls: ['./matchday-tips-our-picks-filter-types.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MatchdayTipsOurPicksFilterTypesComponent implements OnInit {
  @Input() selected: MatchdayTipsOurPicksType[];

  @Output() typesChange = new EventEmitter<MatchdayTipsOurPicksType[]>();

  constructor() {}

  ngOnInit(): void {}

  public onClick(value: MatchdayTipsOurPicksType) {
    const isAdding = !this.selected || !this.selected.includes(value);
    const newTypes = isAdding
      ? !!this.selected
        ? [...this.selected, value]
        : [value]
      : this.selected.filter((s) => s !== value);
    this.typesChange.emit(newTypes);
  }

  public isSelected(type: MatchdayTipsOurPicksType): boolean {
    if (!this.selected || this.selected.length === 0) {
      return false;
    }
    return !!this.selected && this.selected.includes(type);
  }
}
