import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-game-team-venue',
  templateUrl: './game-team-venue.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GameTeamVenueComponent {
  @Input() teamShort: string;
  @Input() logoHeight: number = 20;
  @Input() isHome: boolean;
  @Input() showRank = false;
  @Input() rank: number;
  @Input() showFirstGame = false;
  @Input() isFirstGame: boolean;
  @Input() showVenue = true;

  constructor() {}
}
