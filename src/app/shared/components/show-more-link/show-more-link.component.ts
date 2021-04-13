import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-show-more-link',
  templateUrl: './show-more-link.component.html',
  styleUrls: ['./show-more-link.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShowMoreLinkComponent {
  @Input() show: boolean = true;
  @Input() text: string = 'Show more';

  @Output() showMoreClick = new EventEmitter<void>();

  constructor() {}

  public onShowMoreClick(): void {
    this.showMoreClick.emit();
  }
}
