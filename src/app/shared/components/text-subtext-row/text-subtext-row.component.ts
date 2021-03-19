import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { TextSubtextRow } from './models/text-subtext-row.model';

@Component({
  selector: 'app-text-subtext-row',
  templateUrl: './text-subtext-row.component.html',
  styleUrls: ['./text-subtext-row.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TextSubtextRowComponent {
  @Input() rows: TextSubtextRow[];

  constructor() {}
}
