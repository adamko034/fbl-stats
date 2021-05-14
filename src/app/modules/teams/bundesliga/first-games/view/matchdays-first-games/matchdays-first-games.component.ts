import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-matchdays-first-games',
  templateUrl: './matchdays-first-games.component.html',
  styleUrls: ['./matchdays-first-games.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MatchdaysFirstGamesComponent {
  constructor() {}
}
