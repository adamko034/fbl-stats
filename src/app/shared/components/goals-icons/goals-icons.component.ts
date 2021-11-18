import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-goals-icons',
  templateUrl: './goals-icons.component.html',
  styleUrls: ['./goals-icons.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GoalsIconsComponent {
  @Input() count: number;
  constructor() {}
}
