import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { MatSliderChange } from '@angular/material/slider';

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

  @Output() change = new EventEmitter<number>();

  private _valueInternal: number;
  public get valueInternal(): number {
    return this._valueInternal;
  }

  constructor() {}

  public onThumbMove(change: MatSliderChange): void {
    this._valueInternal = change.value;
  }

  public onChange(change: MatSliderChange): void {
    this.change.emit(change.value);
  }
}
