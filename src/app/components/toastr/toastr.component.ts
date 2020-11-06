import { Component, OnDestroy, OnInit } from '@angular/core';
import { IndividualConfig, ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { NewUpdatesService } from 'src/app/layout/header/components/new-updates/services/new-updates.service';
import { ErrorService } from 'src/app/services/error.service';

@Component({
  selector: 'app-toastr',
  templateUrl: './toastr.component.html',
  styleUrls: ['./toastr.component.scss']
})
export class ToastrComponent implements OnInit, OnDestroy {
  private destroyed$ = new Subject<void>();

  constructor(
    private toastrService: ToastrService,
    private errorService: ErrorService,
    private newUpdatesService: NewUpdatesService
  ) {}

  public ngOnInit(): void {
    this.errorService
      .selectError()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((error) => {
        if (!!error) {
          this.showErrorToastr(error);
        }
      });

    this.newUpdatesService
      .select()
      .pipe(
        filter((newUpdate) => newUpdate),
        takeUntil(this.destroyed$)
      )
      .subscribe(() => this.showNewUpdatesToastr());
  }

  public showErrorToastr(message: string) {
    this.toastrService.error(message, 'oops..', this.getDefaultToastrProperties());
  }

  public showNewUpdatesToastr(): void {
    this.toastrService.success(
      'Click on the refresh button at the right upper corner to get the latest players data',
      'New updates!',
      this.getDefaultToastrProperties()
    );
  }

  public ngOnDestroy(): void {
    this.destroyed$.next();
  }

  private getDefaultToastrProperties(): Partial<IndividualConfig> {
    return { disableTimeOut: true, positionClass: 'toast-top-center' };
  }
}
