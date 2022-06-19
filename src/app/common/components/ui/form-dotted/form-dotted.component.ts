import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-form-dotted',
  templateUrl: './form-dotted.component.html',
  styleUrls: ['./form-dotted.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormDottedComponent {
  @Input() form: string;
  @Input() separator: string = '';
  @Input() size: 'supersmall' | 'small' | 'medium' = 'supersmall';

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
