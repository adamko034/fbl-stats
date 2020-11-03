import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FiltersStoreService } from 'src/app/services/filters-store.service';

@Component({
  selector: 'app-players-filters',
  templateUrl: './players-filters.component.html',
  styleUrls: ['./players-filters.component.scss']
})
export class PlayersFiltersComponent implements OnInit {
  @Input() opened = false;

  public filtersModified$: Observable<boolean>;

  constructor(private filtersStoreService: FiltersStoreService) {}

  ngOnInit() {
    this.filtersModified$ = this.filtersStoreService.selectFiltersChanged();
  }

  public clearFilters(): void {
    this.filtersStoreService.clear();
  }
}
