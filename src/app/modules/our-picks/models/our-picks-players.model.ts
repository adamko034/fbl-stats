import { Player } from 'src/app/store/players/models/player.model';
import { OurPicksPlayer } from './our-picks-player.model';

export interface OurPicksPlayers {
  matchday: number;
  players: OurPicksPlayer[];
}
