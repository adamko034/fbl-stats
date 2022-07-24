import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FromTo } from 'src/app/shared/models/from-to.model';

@Component({
  selector: 'app-select-matchdays-between',
  templateUrl: './select-matchdays-between.component.html',
  styleUrls: ['./select-matchdays-between.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectMatchdaysBetweenComponent {
  @Input() set value(val: FromTo) {
    this._saveEnabled = false;
    this._internalValue = { ...val };
  }
  @Input() lastMatchday: number;

  @Output() matchdaysBetweenChange = new EventEmitter<FromTo>();

  private _saveEnabled = false;
  public get saveEnabled(): boolean {
    return this._saveEnabled;
  }

  private _internalValue: FromTo;
  public get from(): number {
    return this._internalValue.from;
  }
  public set from(val: number) {
    this._internalValue.from = val;
    this._saveEnabled = true;
  }
  public get to(): number {
    return this._internalValue.to;
  }
  public set to(val: number) {
    this._saveEnabled = true;
    this._internalValue.to = val;
  }

  constructor() {}

  public apply(): void {
    this.matchdaysBetweenChange.emit({ from: this.from, to: this.to });
  }
}
