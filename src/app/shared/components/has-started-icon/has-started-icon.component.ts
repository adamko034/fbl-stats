import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-has-started-icon',
  templateUrl: './has-started-icon.component.html',
  styleUrls: ['./has-started-icon.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HasStartedIconComponent {
  constructor() {}
}
