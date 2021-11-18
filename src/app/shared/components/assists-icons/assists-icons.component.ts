import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-assists-icons',
  templateUrl: './assists-icons.component.html',
  styleUrls: ['./assists-icons.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AssistsIconsComponent {
  @Input() count: number;
  constructor() {}
}
