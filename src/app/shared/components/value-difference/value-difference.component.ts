import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-value-difference',
  templateUrl: './value-difference.component.html',
  styleUrls: ['./value-difference.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ValueDifferenceComponent {
  @Input() value: number;

  constructor() {}
}
