import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-team-logo',
  templateUrl: './team-logo.component.html',
  styleUrls: ['./team-logo.component.scss']
})
export class TeamLogoComponent {
  @Input() team: string;
  @Input() height: number = 25;
  @Input() scaleOnMobile = true;

  public get heightPx() {
    return `${this.height}px`;
  }

  constructor() {}
}
