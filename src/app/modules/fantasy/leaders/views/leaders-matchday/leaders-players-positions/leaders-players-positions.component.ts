import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { shortLongMaps } from 'src/app/resources/short-long.static';
import { LeaderPlayer } from 'src/app/store/leaders/models/leader-player.model';
import { LeadersPlayers } from 'src/app/store/leaders/models/leaders-players.model';
import { LeadersPlayersByPosition } from '../../../models/leaders-players-by-position.model';

@Component({
  selector: 'app-leaders-players-positions',
  templateUrl: './leaders-players-positions.component.html',
  styleUrls: ['./leaders-players-positions.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LeadersPlayersPositionsComponent {
  @Input() players: LeadersPlayers;

  constructor() {}

  public getLeadersPlayersByPosition(position: string): LeadersPlayersByPosition {
    return {
      combinations: this.players.combinations[shortLongMaps.positions[position.toLowerCase()]],
      players: this.filterPlayersByPosition(position),
      stars: this.players.stars[shortLongMaps.positions[position.toLowerCase()]]
    };
  }

  private filterPlayersByPosition(position: string): LeaderPlayer[] {
    return this.players.all.filter((p) => p.position.toLowerCase() === position.toLowerCase());
  }
}
