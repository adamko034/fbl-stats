import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Logger } from 'src/app/utils/logger';

@Component({
  selector: 'app-select-last-matchdays',
  templateUrl: './select-last-matchdays.component.html',
  styleUrls: ['./select-last-matchdays.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectLastMatchdaysComponent implements OnInit {
  @Input() lastMatchday: number;
  @Input() value: number;

  @Output() change = new EventEmitter<number>();

  private _values: number[] = [];
  public get values(): number[] {
    return this._values;
  }

  constructor() {}

  public ngOnInit(): void {
    Logger.logDev(`select last matchdays component, on init, value: ${this.value}`);
    for (let i = 1; i < this.lastMatchday; i++) {
      this._values.push(i);
    }
  }

  public onMatchdaysChange(newValue: number): void {
    this.change.emit(newValue);
  }
}
