import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FiltersStoreService } from 'src/app/services/filters-store.service';
import { ScreenSizeService } from 'src/app/services/screen-size.service';

@Component({
  selector: 'app-players-filters',
  templateUrl: './players-filters.component.html',
  styleUrls: ['./players-filters.component.scss']
})
export class PlayersFiltersComponent implements OnInit {
  public filtersModified$: Observable<boolean>;
  public isMobile$: Observable<boolean>;

  constructor(private filtersStoreService: FiltersStoreService, private screenSizeService: ScreenSizeService) {}

  ngOnInit() {
    this.filtersModified$ = this.filtersStoreService.selectFiltersChanged();
    this.isMobile$ = this.screenSizeService.isMobile$();
  }

  public clearFilters(): void {
    this.filtersStoreService.clear();
  }
}
