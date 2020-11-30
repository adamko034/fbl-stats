import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-team-form',
  templateUrl: './team-form.component.html',
  styleUrls: ['./team-form.component.scss']
})
export class TeamFormComponent {
  @Input() form: string;

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

    return `${prefix}-${color}`;
  }
}
