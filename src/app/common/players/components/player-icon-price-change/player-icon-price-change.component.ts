import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-player-icon-price-change',
  templateUrl: './player-icon-price-change.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlayerIconPriceChangeComponent {
  @Input() price: number;
  @Input() priceOriginal: number;
}
