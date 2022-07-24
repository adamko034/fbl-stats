import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-max-price-slider',
  templateUrl: './max-price-slider.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MaxPriceSliderComponent {
  @Input() value: number;
  @Input() maxPrice: number;

  @Output() maxPriceChange = new EventEmitter<number>();

  constructor() {}

  public onMaxPriceChange(value: number): void {
    this.maxPriceChange.emit(value);
  }
}
