import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { combineLatest, Subject } from 'rxjs';
import { distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { SelectMoreFormDialogComponent } from 'src/app/layout/content/components/players-filters/components/players-select-form/components/select-more-form-dialog/select-more-form-dialog.component';
import { FiltersStoreService } from 'src/app/services/filters-store.service';
import { PropertiesService } from 'src/app/services/properties.service';
import { SwitchItem } from 'src/app/shared/components/switch/models/switch-item.model';
import { Logger } from 'src/app/utils/logger';

@Component({
  selector: 'app-players-select-form',
  templateUrl: './players-select-form.component.html',
  styleUrls: ['./players-select-form.component.scss']
})
export class PlayersSelectFormComponent implements OnInit, OnDestroy {
  private destroyed$ = new Subject<void>();
  private lastMatchday: number;

  public matchdays = 0;
  public items: SwitchItem[] = [];
  public moreItem: SwitchItem;

  constructor(
    private filtersStoreService: FiltersStoreService,
    private propertiesService: PropertiesService,
    private matDialog: MatDialog
  ) {}

  public ngOnInit(): void {
    combineLatest([this.propertiesService.selectLastMatchday(), this.filtersStoreService.selectMatchdays()])
      .pipe(distinctUntilChanged(), takeUntil(this.destroyed$))
      .subscribe(([lastMatchday, matchdays]) => {
        Logger.logDev('players filters select form, on init subscription, matchdays ' + matchdays);
        if (this.items.length === 0) {
          const matchdaysToDisplay = lastMatchday < 5 ? lastMatchday : 5;
          for (let i = 1; i <= matchdaysToDisplay; i++) {
            this.items.push({ description: i.toString(), value: i });
          }
        }

        this.matchdays = lastMatchday < 5 ? lastMatchday : matchdays;
        this.moreItem = {
          value: this.matchdays > 5 ? this.matchdays : -1,
          matIcon: 'more_vert',
          description: this.matchdays > 5 ? this.matchdays.toString() : ''
        };
        this.lastMatchday = lastMatchday;
      });
  }

  public ngOnDestroy(): void {
    Logger.logDev('players filters select form, on destroy');
    this.destroyed$.next();
  }

  public openDialog(): void {
    const dialogData = {
      data: { matchdays: this.matchdays > 5 ? this.matchdays : 6, lastMatchday: this.lastMatchday }
    };
    this.matDialog
      .open(SelectMoreFormDialogComponent, dialogData)
      .afterClosed()
      .subscribe((newValueFromDialog) => {
        if (newValueFromDialog) {
          this.filtersStoreService.updateMatchdays(newValueFromDialog);
        }
      });
  }

  public onFormChanged(newValue: number) {
    Logger.logDev('players filters select form, on form changed, ' + newValue);
    if (newValue === -1 || newValue > 5) {
      this.openDialog();
      return;
    }

    this.filtersStoreService.updateMatchdays(newValue);
  }
}
