import { Injectable } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ArrayStream } from 'src/app/services/array-stream.service';
import { UnlimitedTransfersDate } from 'src/app/store/properties/properties.model';
import { PropertiesStore } from 'src/app/store/properties/properties.store';

@Injectable({ providedIn: 'root' })
export class UnlimitedTransfersService {
  private future$: Observable<UnlimitedTransfersDate[]>;
  private next$: Observable<UnlimitedTransfersDate>;
  private isNext$: Observable<boolean>;
  private matchdaysUntilNext$: Observable<number>;

  public get isNext(): Observable<boolean> {
    return this.isNext$;
  }

  public get matchdaysUntilNext(): Observable<number> {
    return this.matchdaysUntilNext$;
  }

  constructor(private propertiesStore: PropertiesStore) {
    this.future$ = this.getFuture();
    this.next$ = this.future$.pipe(map((future) => future[0]));
    this.isNext$ = this.next$.pipe(map((next) => next != null));

    this.matchdaysUntilNext$ = combineLatest([this.next$, this.propertiesStore.selectLastMatchday()]).pipe(
      map(([next, lastMatchday]) => {
        const max = next != null ? next.matchday : 35;

        return max - lastMatchday - 1;
      })
    );
  }

  private getFuture(): Observable<UnlimitedTransfersDate[]> {
    return combineLatest([
      this.propertiesStore.selectLastMatchday(),
      this.propertiesStore.selectUnlimitedTransfers()
    ]).pipe(
      map(([lastMatchday, unlimitedTransfers]) => {
        if (!unlimitedTransfers) {
          return [];
        }

        return new ArrayStream<UnlimitedTransfersDate>(unlimitedTransfers.dates)
          .filterQuick((ut) => ut.matchday > lastMatchday + 1)
          .orderBy('matchday', 'asc')
          .collect();
      })
    );
  }
}
