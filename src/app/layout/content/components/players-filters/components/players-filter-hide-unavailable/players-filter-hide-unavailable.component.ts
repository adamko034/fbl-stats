import { Component, OnInit } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { Observable } from 'rxjs';
import { FiltersStoreService } from 'src/app/services/filters-store.service';

@Component({
  selector: 'app-players-filter-hide-unavailable',
  templateUrl: './players-filter-hide-unavailable.component.html',
  styleUrls: ['./players-filter-hide-unavailable.component.scss']
})
export class PlayersFilterHideUnavailableComponent implements OnInit {
  public value$: Observable<boolean>;

  constructor(private filtersStoreService: FiltersStoreService) {}

  public ngOnInit(): void {
    this.value$ = this.filtersStoreService.selectHideUnavailable();
  }

  public onHideUnavailablePlayerToggle(change: MatCheckboxChange): void {
    this.filtersStoreService.updateHideUnavailable(change.checked);
  }
}
