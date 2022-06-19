import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output
} from '@angular/core';
import { FromTo } from 'src/app/shared/models/from-to.model';
import { DropdownConfig } from '../../../ui/dropdown/models/dropdown-config.model';

@Component({
  selector: 'app-select-matchdays-panel',
  templateUrl: './select-matchdays-panel.component.html',
  styleUrls: ['./select-matchdays-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectMatchdaysPanelComponent implements OnChanges {
  @Input() lastMatchday: number;
  @Input() value: FromTo;

  @Output() change = new EventEmitter<FromTo>();

  private _lastMdsValue: number = 0;
  public get lastMdsValue(): number {
    return this._lastMdsValue;
  }

  private _dropdownConfig: DropdownConfig = { title: 'All matchdays', opened: false };
  public get dropdownConfig(): DropdownConfig {
    return this._dropdownConfig;
  }

  constructor(private changeDetection: ChangeDetectorRef) {}

  public ngOnChanges(): void {
    this._lastMdsValue = this.value.to === this.lastMatchday ? this.value.to - this.value.from + 1 : 0;
    this.setDropdownConfig();
    this.changeDetection.detectChanges();
  }

  public onLastMatchdaysChange(lastMds: number): void {
    this.change.emit({
      from: this.lastMatchday - lastMds + 1,
      to: this.lastMatchday
    });
    this.changeDetection.detectChanges();
  }

  public onMatchdaysBetweenChange(value: FromTo): void {
    this.change.emit(value);
  }

  private setDropdownConfig(): void {
    let title: string;
    if (this.value.to === this.lastMatchday) {
      title = this._lastMdsValue === this.lastMatchday ? 'All matchdays' : `Last ${this._lastMdsValue} matchdays`;
    } else {
      title = `Matchdays between ${this.value.from} and ${this.value.to}`;
    }

    this._dropdownConfig = { title, opened: false };
  }
}
