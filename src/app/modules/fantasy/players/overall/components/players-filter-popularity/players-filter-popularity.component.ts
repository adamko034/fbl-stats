import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSliderChange } from '@angular/material/slider';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FiltersStoreService } from 'src/app/services/filters-store.service';

@Component({
  selector: 'app-players-filter-popularity',
  templateUrl: './players-filter-popularity.component.html',
  styleUrls: ['./players-filter-popularity.component.scss']
})
export class PlayersFilterPopularityComponent implements OnInit, OnDestroy {
  private destroyed$ = new Subject<void>();
  public value = 0;

  constructor(private filtersStoreService: FiltersStoreService) {}

  public ngOnInit() {
    this.filtersStoreService
      .selectPopularity()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((newPopularity) => (this.value = newPopularity));
  }

  public ngOnDestroy() {
    this.destroyed$.next();
  }

  public onThumbMove(change: MatSliderChange) {
    this.value = change.value;
  }

  public onPopularityChanged(change: MatSliderChange) {
    this.filtersStoreService.updatePopularity(change.value);
  }
}
