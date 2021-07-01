import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSliderChange } from '@angular/material/slider';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FiltersStoreService } from 'src/app/services/filters-store.service';
import { PropertiesService } from 'src/app/services/properties.service';

@Component({
  selector: 'app-players-filter-max-price',
  templateUrl: './players-filter-max-price.component.html',
  styleUrls: ['./players-filter-max-price.component.scss']
})
export class PlayersFilterMaxPriceComponent implements OnInit, OnDestroy {
  private destroyed$ = new Subject<void>();
  public value = 0;
  public max = 0;

  constructor(private filtersStoreService: FiltersStoreService, private propertiesService: PropertiesService) {}

  public ngOnInit(): void {
    this.propertiesService
      .selectPlayerMaxPrice()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((maxPrice) => {
        if (maxPrice) {
          if (this.value === 0 || this.value === this.max) {
            this.value = maxPrice;
          }

          this.max = maxPrice;
        }
      });

    this.filtersStoreService
      .selectPrice()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((newPrice) => {
        this.value = !newPrice ? this.max : newPrice;
      });
  }

  public ngOnDestroy(): void {
    this.destroyed$.next();
  }

  public onThumbMove(change: MatSliderChange): void {
    this.value = change.value;
  }

  public onPriceChanged(change: MatSliderChange): void {
    const newPrice = change.value === this.max ? null : change.value;
    this.filtersStoreService.updatePrice(newPrice);
  }
}
