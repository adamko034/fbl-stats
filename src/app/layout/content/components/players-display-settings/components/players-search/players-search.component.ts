import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FiltersStoreService } from 'src/app/services/filters-store.service';

@Component({
  selector: 'app-players-search',
  templateUrl: './players-search.component.html',
  styleUrls: ['./players-search.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PlayersSearchComponent implements OnInit, OnDestroy {
  private destroyed$ = new Subject<void>();

  public name: string;

  constructor(private filtersStoreService: FiltersStoreService) {}

  public ngOnInit(): void {
    this.filtersStoreService
      .selectName()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((name) => (this.name = name));
  }

  public onNameChange(event): void {
    this.filtersStoreService.updateName(event.target.value);
  }

  public ngOnDestroy(): void {
    this.destroyed$.next();
  }

  public clear(): void {
    this.name = '';
    this.filtersStoreService.updateName('');
  }
}
