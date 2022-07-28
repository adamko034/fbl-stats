import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable, of, ReplaySubject } from 'rxjs';
import { map, withLatestFrom } from 'rxjs/operators';
import { UnlimitedTransfersService } from 'src/app/modules/core/properties/unlimited-transfers/unlimited-transfers.service';
import { Logger } from 'src/app/utils/logger';

@Component({
  selector: 'app-select-future-matchdays',
  templateUrl: './select-future-matchdays.component.html',
  styleUrls: ['./select-future-matchdays.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectFutureMatchdaysComponent implements OnInit {
  @Input() set value(val: number) {
    Logger.logDev('select future matchdays, got new value: ' + val);
    this._valueInternal$.next(val);
  }
  @Input() title = 'Include next matchdays';
  @Input() lastMatchday: number;
  @Input() lastKnownMatchday: number;
  @Output() change = new EventEmitter<number>();

  private _valueInternal$: ReplaySubject<number> = new ReplaySubject<number>(1);

  public valueInternal$: Observable<number>;
  public mdsUntilNextUnlimitedTransfers$: Observable<number>;
  public isNextUnlimitedTransfers$: Observable<boolean>;
  public possibleNextMatchdays$: Observable<number[]>;

  constructor(private unlimitedTranfsersService: UnlimitedTransfersService) {}

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
    this.possibleNextMatchdays$ = of(this.lastMatchday).pipe(
      map((lastMd) => lastMd + 1),
      map((nextMd) => {
        const matchdays: number[] = [];
        const max = this.lastKnownMatchday - nextMd + 1;
        for (let i = 1; i <= max; i++) {
          matchdays.push(i);
        }

        return matchdays;
      })
    );
  }
}
