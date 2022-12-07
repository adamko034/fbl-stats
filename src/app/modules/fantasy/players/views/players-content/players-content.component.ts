import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-players-content',
  templateUrl: './players-content.component.html',
  styleUrls: ['./players-content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlayersContentComponent {}
