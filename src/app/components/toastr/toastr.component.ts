import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { IndividualConfig, ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ErrorService } from 'src/app/services/error.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-toastr',
  templateUrl: './toastr.component.html',
  styleUrls: ['./toastr.component.scss']
})
export class ToastrComponent implements OnInit, OnDestroy {
  private destroyed$ = new Subject<void>();

  constructor(private toastrService: ToastrService, private errorService: ErrorService) {}

  public ngOnInit(): void {
    this.errorService
      .selectError()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((error) => {
        if (!!error) {
          this.showErrorToastr(error);
        }
      });
  }

  public showErrorToastr(message: string) {
    this.toastrService.error(message, 'oops..', this.getDefaultToastrProperties());
  }

  public showNewUpdatesToastr(): void {
    this.toastrService.success(
      'Refresh the page to get the latest updates',
      'New updates!',
      this.getDefaultToastrProperties()
    );
  }

  public showSuccess(text: string, title?: string) {
    this.toastrService.success(text, title, this.getDefaultToastrProperties());
  }

  public ngOnDestroy(): void {
    this.destroyed$.next();
  }

  private getDefaultToastrProperties(): Partial<IndividualConfig> {
    return { disableTimeOut: true, positionClass: 'toast-top-center' };
  }
}
