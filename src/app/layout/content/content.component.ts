import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FiltersStoreService } from 'src/app/services/filters-store.service';
import { ScreenSizeService } from 'src/app/services/screen-size.service';
import { Logger } from 'src/app/utils/logger';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {
  private destroyed$ = new Subject<void>();

  public showContent = false;
  public get panelsOpened(): boolean {
    return !this.screenSizeService.isMobile();
  }

  constructor(private filtersStoreService: FiltersStoreService, private screenSizeService: ScreenSizeService) {}

  public ngOnInit(): void {
    Logger.logDev('content component, ng on init');
    this.filtersStoreService
      .selectPosition()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((position) => {
        Logger.logDev('content component, ng on init subscriptions, position: ' + position);
        this.showContent = !!position;
      });
  }
}
