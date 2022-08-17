import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PropertiesStore } from 'src/app/store/properties/properties.store';

@Component({
  selector: 'app-include-past-matchdays-dropdown',
  templateUrl: './include-past-matchdays-dropdown.component.html',
  styleUrls: ['./include-past-matchdays-dropdown.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IncludePastMatchdaysDropdownComponent implements OnInit {
  @Input() value: number;
  @Input() title = 'Include past matchdays';

  @Output() change = new EventEmitter<number>();

  private _possibleMatchdays$: Observable<number[]>;
  public get possibleMatchdays$(): Observable<number[]> {
    return this._possibleMatchdays$;
  }

  constructor(private propertiesStore: PropertiesStore) {}

  public ngOnInit(): void {
    this._possibleMatchdays$ = this.propertiesStore.selectLastMatchday().pipe(
      map((lastMatchday) => {
        const mds: number[] = [];
        for (let i = 1; i <= lastMatchday; i++) {
          mds.push(i);
        }

        return mds;
      })
    );
  }

  public onMatchdaysCountChange(value: number) {
    this.change.emit(value);
  }
}
