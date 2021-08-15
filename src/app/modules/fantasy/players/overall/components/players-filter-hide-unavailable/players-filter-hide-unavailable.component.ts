import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { Observable } from 'rxjs';
import { FiltersStoreService } from 'src/app/services/filters-store.service';

@Component({
  selector: 'app-players-filter-hide-unavailable',
  templateUrl: './players-filter-hide-unavailable.component.html',
  styleUrls: ['./players-filter-hide-unavailable.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlayersFilterHideUnavailableComponent implements OnInit {
  public hideUnavailable$: Observable<boolean>;

  constructor(private filtersStore: FiltersStoreService) {}

  ngOnInit(): void {
    this.hideUnavailable$ = this.filtersStore.selectHideUnavailable();
  }

  public onHideUnavailableChange(change: MatCheckboxChange) {
    const newValue = change.checked ? true : null;
    this.filtersStore.updateHideUnavailable(newValue);
  }
}
