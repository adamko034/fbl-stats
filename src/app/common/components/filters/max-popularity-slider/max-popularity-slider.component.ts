import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-max-popularity-slider',
  templateUrl: './max-popularity-slider.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MaxPopularitySliderComponent {
  @Input() value: number;
  @Output() popularityChange = new EventEmitter<number>();

  constructor() {}

  public onPopularityChange(value: number): void {
    this.popularityChange.emit(value);
  }
}
