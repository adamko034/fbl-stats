import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { ArrayStream } from 'src/app/services/array-stream.service';
import { UnlimitedTransfersDate } from 'src/app/store/properties/properties.model';
import { PropertiesStore } from 'src/app/store/properties/properties.store';

@Injectable()
export class NextUnlimitedTransfersResover implements Resolve<UnlimitedTransfersDate> {
  constructor(private propertiesStore: PropertiesStore) {}

  public resolve(): Observable<UnlimitedTransfersDate> {
    return this.propertiesStore.selectProperties().pipe(
      map((properties) => {
        const { lastMatchday, unlimitedTransfers } = properties;

        if (!unlimitedTransfers || !unlimitedTransfers.dates) {
          return null;
        }

        return new ArrayStream(unlimitedTransfers.dates)
          .filterQuick((u) => lastMatchday + 1 < u.matchday)
          .orderBy('matchday', 'asc')
          .takeFirst();
      }),
      first()
    );
  }
}
