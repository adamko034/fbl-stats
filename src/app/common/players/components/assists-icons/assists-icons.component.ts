import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-assists-icons',
  templateUrl: './assists-icons.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AssistsIconsComponent {
  @Input() count: number;
}
