import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-team-logo',
  templateUrl: './team-logo.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TeamLogoComponent {
  @Input() team: string;
  @Input() height: number = 20;

  public get heightPx() {
    return `${this.height}px`;
  }

  public getSrc() {
    return `/assets/logos/${this.team}.png`;
  }
}
