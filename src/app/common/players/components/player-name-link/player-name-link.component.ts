import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-player-name-link',
  templateUrl: './player-name-link.component.html',
  styleUrls: ['./player-name-link.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlayerNameLinkComponent {
  @Input() name: string;
  @Input() lastName: string;
  @Input() id: string;

  constructor() {}
}
