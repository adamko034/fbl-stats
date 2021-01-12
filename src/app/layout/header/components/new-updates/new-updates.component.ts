import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { NewUpdatesService } from 'src/app/layout/header/components/new-updates/services/new-updates.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-new-updates',
  templateUrl: './new-updates.component.html',
  styleUrls: ['./new-updates.component.scss']
})
export class NewUpdatesComponent implements OnInit, OnDestroy {
  public newUpdates$: Observable<boolean>;

  constructor(private newUpdatesService: NewUpdatesService) {}

  public ngOnInit(): void {
    this.newUpdates$ = this.newUpdatesService.select();
  }

  public ngOnDestroy(): void {
    this.newUpdatesService.close();
  }
}
