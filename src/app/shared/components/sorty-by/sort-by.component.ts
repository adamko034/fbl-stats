import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SortByItem } from 'src/app/shared/components/sorty-by/models/sort-by-item.model';
import { SortBy } from 'src/app/shared/components/sorty-by/models/sort-by.model';

@Component({
  selector: 'app-sort-by',
  templateUrl: './sort-by.component.html',
  styleUrls: ['./sort-by.component.scss']
})
export class SortByComponent implements OnInit {
  @Input() showLabel = true;
  @Input() label = 'Sort by:';
  @Input() defaultValue: SortBy;
  @Input() items: SortByItem[];

  @Output() sortByChange = new EventEmitter<SortBy>();

  public direction: 'asc' | 'desc';
  public selectedItem: SortByItem;

  constructor() {}

  ngOnInit(): void {
    this.direction = this.defaultValue?.direction || 'desc';
    this.selectedItem = this.defaultValue?.sortByItem || { text: 'select', value: null };
  }

  public onSortByChange(item: SortByItem): void {
    this.selectedItem = item;
    this.emit();
  }

  public onToggleDirectionChange(): void {
    this.direction = this.direction === 'asc' ? 'desc' : 'asc';
    this.emit();
  }

  private emit(): void {
    const value = this.direction === 'desc' ? `-${this.selectedItem.value}` : this.selectedItem.value;
    this.sortByChange.emit({ direction: this.direction, sortByItem: this.selectedItem, value });
  }
}
