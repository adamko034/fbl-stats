import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subject, Subscription } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';
import { PropertiesService } from 'src/app/services/properties.service';

@Injectable({ providedIn: 'root' })
export class NewUpdatesService {
  private newUpdates$ = new Subject<boolean>();
  private lastUpdated$: Subscription;
  private currentDate: Date;

  constructor(private propertiesService: PropertiesService, private toastrService: ToastrService) {}

  public select(): Observable<boolean> {
    if (!this.lastUpdated$) {
      this.lastUpdated$ = this.propertiesService.selectLastUpdated().subscribe((newDate: Date) => {
        const isUpdate = !!this.currentDate && !!newDate && this.currentDate <= newDate;
        this.newUpdates$.next(isUpdate);
        this.currentDate = newDate;
      });
    }

    return this.newUpdates$.asObservable().pipe(distinctUntilChanged());
  }

  public markAsUpdated(): void {
    this.newUpdates$.next(false);
  }

  public close(): void {
    if (this.lastUpdated$) {
      this.lastUpdated$.unsubscribe();
    }
  }
}
