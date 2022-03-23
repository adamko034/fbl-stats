import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { UnlimitedTransfersService } from 'src/app/modules/core/properties/unlimited-transfers/unlimited-transfers.service';
import { PropertiesStore } from 'src/app/store/properties/properties.store';

@Component({
  selector: 'app-include-future-matchdays-dropdown',
  templateUrl: './include-future-matchdays-dropdown.component.html',
  styleUrls: ['./include-future-matchdays-dropdown.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IncludeFutureMatchdaysDropdownComponent implements OnInit {
  @Input() value: number;
  @Input() title = 'Include next matchdays';
  @Output() change = new EventEmitter<number>();

  public valueInternal$: Subject<number> = new Subject<number>();
  public mdsUntilNextUnlimitedTransfers$: Observable<number>;
  public isNextUnlimitedTransfers$: Observable<boolean>;
  public possibleNextMatchdays$: Observable<number[]>;

  constructor(private unlimitedTranfsersService: UnlimitedTransfersService, private propertiesStore: PropertiesStore) {}

  public ngOnInit(): void {
    this.isNextUnlimitedTransfers$ = this.unlimitedTranfsersService.isNext;
    this.mdsUntilNextUnlimitedTransfers$ = this.unlimitedTranfsersService.matchdaysUntilNext;
    this.setPossibleNextMatchdays();
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
