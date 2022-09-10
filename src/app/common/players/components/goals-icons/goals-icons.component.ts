import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-goals-icons',
  templateUrl: './goals-icons.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GoalsIconsComponent {
  @Input() count: number;
}
