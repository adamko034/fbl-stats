import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-follow-us',
  templateUrl: './follow-us.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FollowUsComponent {
  @Input() text: string;

  constructor() {}
}
