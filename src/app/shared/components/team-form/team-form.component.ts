import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-team-form',
  templateUrl: './team-form.component.html',
  styleUrls: ['./team-form.component.scss']
})
export class TeamFormComponent {
  @Input() form: string;
  @Input() showLabels = false;
  @Input() mode: 'dot' | 'rectangle' = 'dot';
  @Input() size: 'supersmall' | 'small' | 'medium' = 'medium';

  constructor() {}

  public getGameResultClass(result: string): string {
    const prefix = 'game-result';
    let color = '';

    switch (result.toLowerCase()) {
      case 'w':
      case '3':
        color = 'green';
        break;
      case 'd':
      case '1':
        color = 'orange';
        break;
      default:
        color = 'red';
    }

    return `${prefix}-${color} ${this.getSizeClass()}`;
  }

  private getSizeClass(): string {
    return this.size !== 'medium' ? `game-result-dot-${this.size}` : '';
  }
}
