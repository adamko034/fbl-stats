import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-bundesliga-content',
  templateUrl: './bundesliga-content.component.html',
  styleUrls: ['./bundesliga-content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BundesligaContentComponent {
  constructor() {}
}
