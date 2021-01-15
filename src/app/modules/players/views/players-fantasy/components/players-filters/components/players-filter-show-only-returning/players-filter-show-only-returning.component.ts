import { Component, OnInit } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { FiltersStoreService } from 'src/app/services/filters-store.service';

@Component({
  selector: 'app-players-filter-show-only-returning',
  templateUrl: './players-filter-show-only-returning.component.html',
  styleUrls: ['./players-filter-show-only-returning.component.scss']
})
export class PlayersFilterShowOnlyReturningComponent implements OnInit {
  public value: boolean;

  constructor(private filtersService: FiltersStoreService) {}

  public ngOnInit(): void {
    this.filtersService.selectShowOnlyReturning().subscribe((value) => (this.value = value));
  }

  public onValueChanged(change: MatCheckboxChange): void {
    this.filtersService.updateShowOnlyReturning(change.checked);
  }
}
