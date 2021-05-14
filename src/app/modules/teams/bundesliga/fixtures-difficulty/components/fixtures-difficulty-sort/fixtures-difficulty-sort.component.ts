import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SortByItem } from 'src/app/shared/components/sorty-by/models/sort-by-item.model';
import { SortBy } from 'src/app/shared/components/sorty-by/models/sort-by.model';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-fixtures-difficulty-sort',
  templateUrl: './fixtures-difficulty-sort.component.html',
  styleUrls: ['./fixtures-difficulty-sort.component.scss']
})
export class FixturesDifficultySortComponent implements OnInit {
  @Input() nextMatchdays: string[];

  @Output() sortChange = new EventEmitter<SortBy>();

  public items: SortByItem[] = [
    { value: 'rank', text: 'Team rank' },
    { value: 'next2GamesIndex', text: 'Next 2 games difficulty' },
    { value: 'next3GamesIndex', text: 'Next 3 games difficulty' },
    { value: 'next5GamesIndex', text: 'Next 5 games difficulty' }
  ];
  public defaultSort: SortBy;

  constructor() {}

  public ngOnInit(): void {
    this.defaultSort = {
      direction: 'desc',
      sortByItem: this.items.find((i) => i.value === 'next5GamesIndex'),
      value: '-next5GamesIndex'
    };
    this.nextMatchdays.forEach((md) => this.items.push({ value: `games.${md}.gameIndex`, text: `MD ${md}` }));
    this.sortChange.emit(this.defaultSort);
  }

  public onSortByChange(sortBy: SortBy) {
    this.sortChange.emit(sortBy);
  }
}
