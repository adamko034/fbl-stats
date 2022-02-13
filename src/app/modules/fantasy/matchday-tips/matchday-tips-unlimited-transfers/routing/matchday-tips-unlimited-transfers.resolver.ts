import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { combineLatest, Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { UnlimitedTransfers, UnlimitedTransfersDate } from 'src/app/store/properties/properties.model';
import { PropertiesStore } from 'src/app/store/properties/properties.store';
import { Logger } from 'src/app/utils/logger';
import { MatchdayTipsUnlimitedTransfersDate } from '../models/matchday-tips-unlimited-transfers-date.model';
import { MatchdayTipsUnlimitedTransfersState } from '../models/matchday-tips-unlimited-transfers-state.model';
import { MatchdayTipsUnlimitedTransfers } from '../models/matchday-tips-unlimited-transfers.model';

@Injectable()
export class MatchdayTipsUnlimitedTransfersResolver
  implements Resolve<Observable<MatchdayTipsUnlimitedTransfersState>>
{
  constructor(private propertiesStore: PropertiesStore) {}

  public resolve(): Observable<MatchdayTipsUnlimitedTransfersState> {
    Logger.logDev('matchday tips unlimited transfers, resolving...');
    return combineLatest([
      this.propertiesStore.selectLastMatchday(),
      this.propertiesStore.selectUnlimitedTransfers()
    ]).pipe(
      map(([lastMatchday, unlimitedTransfers]) => {
        return { lastMatchday, unlimitedTransfers: this.convertUnlimitedTransfers(unlimitedTransfers) };
      }),
      first()
    );
  }

  private convertUnlimitedTransfers(unlimitedTransfers: UnlimitedTransfers): MatchdayTipsUnlimitedTransfers {
    return {
      source: unlimitedTransfers.source,
      dates: !unlimitedTransfers.dates ? [] : unlimitedTransfers.dates.map((d) => this.convertSingle(d))
    };
  }

  private convertSingle(unlimitedTransfersDate: UnlimitedTransfersDate): MatchdayTipsUnlimitedTransfersDate {
    return {
      matchday: unlimitedTransfersDate.matchday,
      start: unlimitedTransfersDate.startDate,
      end: unlimitedTransfersDate.endDate
    };
  }
}
