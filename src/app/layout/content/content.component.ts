import { Component, OnInit } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FiltersStoreService } from 'src/app/services/filters-store.service';
import { Logger } from 'src/app/utils/logger';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {
  public get panelsOpened(): boolean {
    return !this.deviceDetector.isMobile();
  }

  constructor(private filtersStoreService: FiltersStoreService, private deviceDetector: DeviceDetectorService) {}
  private destroyed$ = new Subject<void>();

  public showContent = false;

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
