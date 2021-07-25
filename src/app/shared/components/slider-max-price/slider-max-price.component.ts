import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { MatSliderChange } from '@angular/material/slider';

@Component({
  selector: 'app-slider-max-price',
  templateUrl: './slider-max-price.component.html',
  styleUrls: ['./slider-max-price.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SliderMaxPriceComponent {
  @Input() max: number;
  @Input() set value(val: number) {
    this.valueInternal = !val && val != 0 ? this.max : val;
  }

  @Output() priceChange = new EventEmitter<number>();

  public valueInternal: number;

  constructor() {}

  public onThumbMove(change: MatSliderChange): void {
    this.valueInternal = change.value;
  }

  public onPriceChanged(change: MatSliderChange): void {
    this.priceChange.emit(change.value);
  }
}
