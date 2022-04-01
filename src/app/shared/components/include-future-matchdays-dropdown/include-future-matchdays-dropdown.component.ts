import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { map, withLatestFrom } from 'rxjs/operators';
import { UnlimitedTransfersService } from 'src/app/modules/core/properties/unlimited-transfers/unlimited-transfers.service';
import { PropertiesStore } from 'src/app/store/properties/properties.store';
import { Logger } from 'src/app/utils/logger';

@Component({
  selector: 'app-include-future-matchdays-dropdown',
  templateUrl: './include-future-matchdays-dropdown.component.html',
  styleUrls: ['./include-future-matchdays-dropdown.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IncludeFutureMatchdaysDropdownComponent implements OnInit {
  @Input() set value(val: number) {
    Logger.logDev('include future matchdays dropdown, got new value: ' + val);
    this._valueInternal$.next(val);
  }
  @Input() title = 'Include next matchdays';
  @Output() change = new EventEmitter<number>();

  private _valueInternal$: ReplaySubject<number> = new ReplaySubject<number>(1);

  public valueInternal$: Observable<number>;
  public mdsUntilNextUnlimitedTransfers$: Observable<number>;
  public isNextUnlimitedTransfers$: Observable<boolean>;
  public possibleNextMatchdays$: Observable<number[]>;

  constructor(private unlimitedTranfsersService: UnlimitedTransfersService, private propertiesStore: PropertiesStore) {}

  public ngOnInit(): void {
    this.isNextUnlimitedTransfers$ = this.unlimitedTranfsersService.isNext;
    this.mdsUntilNextUnlimitedTransfers$ = this.unlimitedTranfsersService.matchdaysUntilNext;
    this.setPossibleNextMatchdays();

    this.valueInternal$ = this._valueInternal$.pipe(
      withLatestFrom(this.unlimitedTranfsersService.matchdaysUntilNext),
      map(([valueInternal, mdsUntilNextUnlimitedTransfers]) => {
        return valueInternal === 0 ? mdsUntilNextUnlimitedTransfers : valueInternal;
      })
    );
  }

  public onMatchdaysCountChange(value: number): void {
    this.change.emit(value);
  }

  private setPossibleNextMatchdays(): void {
    this.possibleNextMatchdays$ = this.propertiesStore.selectLastMatchday().pipe(
      map((lastMd) => lastMd + 1),
      map((nextMd) => {
        const matchdays: number[] = [];
        const max = 34 - nextMd + 1;
        for (let i = 1; i <= max; i++) {
          matchdays.push(i);
        }

        return matchdays;
      })
    );
  }
}
