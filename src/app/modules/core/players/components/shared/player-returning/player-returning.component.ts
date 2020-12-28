import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-player-returning',
  templateUrl: './player-returning.component.html',
  styleUrls: ['./player-returning.component.scss']
})
export class PlayerReturningComponent {
  @Input() show: boolean;

  constructor() {}
}
