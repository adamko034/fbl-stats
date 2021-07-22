import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { MatSliderChange } from '@angular/material/slider';

@Component({
  selector: 'app-slider-max-popularity',
  templateUrl: './slider-max-popularity.component.html',
  styleUrls: ['./slider-max-popularity.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SliderMaxPopularityComponent {
  @Input() set value(val: number) {
    this.valueInternal = !val ? 100 : val;
  }
  @Output() popularityChange = new EventEmitter<number>();

  public valueInternal: number;

  constructor() {}

  public onThumbMove(change: MatSliderChange): void {
    this.valueInternal = change.value;
  }

  public onPopularityChanged(change: MatSliderChange): void {
    this.popularityChange.emit(change.value);
  }
}
