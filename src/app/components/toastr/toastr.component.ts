import { Component, OnDestroy, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ErrorService } from 'src/app/services/error.service';

@Component({
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
          this.showToastr(error);
        }
      });
  }

  public showToastr(message: string) {
    this.toastrService.error(message);
  }

  public ngOnDestroy(): void {
    this.destroyed$.next();
  }
}
