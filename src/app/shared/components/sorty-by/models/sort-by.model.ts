import { SortByItem } from 'src/app/shared/components/sorty-by/models/sort-by-item.model';

export interface SortBy {
  sortByItem: SortByItem;
  direction: 'asc' | 'desc';
  value: string;
}
