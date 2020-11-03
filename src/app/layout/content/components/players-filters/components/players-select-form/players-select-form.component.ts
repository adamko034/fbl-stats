import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FiltersStoreService } from 'src/app/services/filters-store.service';
import { PropertiesService } from 'src/app/services/properties.service';
import { SwitchItem } from 'src/app/shared/components/switch/models/switch-item.model';

@Component({
  selector: 'app-players-select-form',
  templateUrl: './players-select-form.component.html',
  styleUrls: ['./players-select-form.component.scss']
})
export class PlayersSelectFormComponent implements OnInit {
  private destroyed$ = new Subject<void>();

  public default = 0;

  public items: SwitchItem[] = [];

  constructor(private filtersStoreService: FiltersStoreService, private propertiesService: PropertiesService) {}

  public ngOnInit(): void {
    this.propertiesService
      .selectLastMatchday()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((lastMatchday) => {
        const matchdaysToDisplay = lastMatchday < 5 ? lastMatchday : 5;
        for (let i = 1; i <= matchdaysToDisplay; i++) {
          this.items.push({ description: i.toString(), value: i });
        }

        this.default =
          matchdaysToDisplay < this.filtersStoreService.getInitialData().matchdays
            ? matchdaysToDisplay
            : this.filtersStoreService.getInitialData().matchdays;
      });
  }

  public onFormChanged(newValue: number) {
    this.filtersStoreService.updateMatchdays(newValue);
  }
}
