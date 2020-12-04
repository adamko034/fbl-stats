import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-input-number',
  templateUrl: './input-number.component.html',
  styleUrls: ['./input-number.component.scss']
})
export class InputNumberComponent {
  @Input() min: number;
  @Input() max: number;
  @Input() value: number;
  @Input() buttonsPosition: 'onSides' | 'right';
  @Input() label: string;

  @Output() valueChange = new EventEmitter<number>();

  constructor() {}

  public valueMinus(): void {
    if (this.value > this.min) {
      this.value -= 1;
      this.emitValue();
    }
  }

  public valueAdd(): void {
    if (this.value < this.max) {
      this.value += 1;
      this.emitValue();
    }
  }

  private emitValue(): void {
    this.valueChange.emit(this.value);
  }
}
