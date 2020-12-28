import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-player-suspension-risk',
  templateUrl: './player-suspension-risk.component.html',
  styleUrls: ['./player-suspension-risk.component.scss']
})
export class PlayerSuspensionRiskComponent {
  @Input() show: boolean;

  constructor() {}
}
