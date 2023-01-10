import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SliderComponent {
  @Input() max: number = 100;
  @Input() min: number = 0;
  @Input() step: number = 1;
  @Input() label: string;
  @Input() valueSuffix;
  @Input() set value(val: number) {
    this._valueInternal = !val && val != this.min ? this.max : val;
  }

  @Output() valueChange = new EventEmitter<number>();

  private _valueInternal: number;
  public get valueInternal(): number {
    return this._valueInternal;
  }

  private _emit = true;

  public onChange(newValue: number) {
    newValue = newValue > this.max ? this.max : newValue;
    this._valueInternal = Math.round(newValue * 10) / 10;
    if (this._emit) {
      this.valueChange.emit(Math.round(newValue * 10) / 10);
    }
  }

  public onDragStart() {
    this._emit = false;
  }

  public onDragEnd(newValue: number): void {
    this._emit = true;
    this.onChange(newValue);
  }
}
