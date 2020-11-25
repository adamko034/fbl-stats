import { Component, OnInit } from '@angular/core';
import { combineLatest, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FiltersStoreService } from 'src/app/services/filters-store.service';
import { LoadingService } from 'src/app/services/loading.service';
import { PropertiesService } from 'src/app/services/properties.service';
import { SwitchItem } from 'src/app/shared/components/switch/models/switch-item.model';
import { Logger } from 'src/app/utils/logger';

@Component({
  selector: 'app-players-select-form',
  templateUrl: './players-select-form.component.html',
  styleUrls: ['./players-select-form.component.scss']
})
export class PlayersSelectFormComponent implements OnInit {
  private destroyed$ = new Subject<void>();

  public matchdays = 0;

  public items: SwitchItem[] = [];

  constructor(
    private filtersStoreService: FiltersStoreService,
    private loadingService: LoadingService,
    private propertiesService: PropertiesService
  ) {}

  public ngOnInit(): void {
    combineLatest([this.propertiesService.selectLastMatchday(), this.filtersStoreService.selectMatchdays()])
      .pipe(takeUntil(this.destroyed$))
      .subscribe(([lastMatchday, matchdays]) => {
        Logger.logDev('players filters select form, on init subscription');
        if (this.items.length === 0) {
          const matchdaysToDisplay = lastMatchday < 5 ? lastMatchday : 5;
          for (let i = 1; i <= matchdaysToDisplay; i++) {
            this.items.push({ description: i.toString(), value: i });
          }
        }

        this.matchdays = lastMatchday < 5 ? lastMatchday : matchdays;
      });
  }

  public onFormChanged(newValue: number) {
    Logger.logDev('players filters select form, on form changed');
    this.filtersStoreService.updateMatchdays(newValue);
  }
}
