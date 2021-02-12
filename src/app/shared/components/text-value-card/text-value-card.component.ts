import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { TextValue } from './models/text-value.model';

@Component({
  selector: 'app-text-value-card',
  templateUrl: './text-value-card.component.html',
  styleUrls: ['./text-value-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TextValueCardComponent {
  @Input() title?: string;
  @Input() items: TextValue[];
  @Input() showBottomBorder = false;
  @Input() showMoreButton = false;
  @Input() showInMatCard = true;

  @Output() showMoreClick = new EventEmitter();

  constructor() {}

  public onShowMoreClick(): void {
    this.showMoreClick.emit();
  }
}
