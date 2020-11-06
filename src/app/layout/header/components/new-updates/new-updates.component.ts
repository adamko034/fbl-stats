import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { NewUpdatesService } from 'src/app/layout/header/components/new-updates/services/new-updates.service';
import { DataUpdatedService } from 'src/app/services/data-updater.service';

@Component({
  selector: 'app-new-updates',
  templateUrl: './new-updates.component.html',
  styleUrls: ['./new-updates.component.scss']
})
export class NewUpdatesComponent implements OnInit, OnDestroy {
  public newUpdates$: Observable<boolean>;

  constructor(private newUpdatesService: NewUpdatesService, private dataUpdaterService: DataUpdatedService) {}

  public ngOnInit(): void {
    this.newUpdates$ = this.newUpdatesService.select();
  }

  public ngOnDestroy(): void {
    this.newUpdatesService.close();
  }

  public updateData(): void {
    this.dataUpdaterService.update();
    this.newUpdatesService.markAsUpdated();
  }
}
